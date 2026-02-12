import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getProgettoBySlug, getSiteSettings } from '@/lib/supabase/queries';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const progetto = await getProgettoBySlug(slug);
  return {
    title: progetto?.title || 'Progetto non trovato',
    description: progetto?.description || '',
  };
}

export default async function ProgettoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [progetto, settings] = await Promise.all([
    getProgettoBySlug(slug),
    getSiteSettings(),
  ]);

  if (!progetto) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black pt-32 pb-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-mono text-2xl text-white mb-4">404 — Progetto non trovato</h1>
            <Button variant="secondary" href="/#progetti">
              <ArrowLeft size={14} className="mr-2" /> Torna ai Progetti
            </Button>
          </div>
        </main>
        <Footer settings={settings} />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-20 md:pt-32 pb-12 md:pb-20">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <a
            href="/#progetti"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] md:text-xs text-[#999] hover:text-[#FF6600] transition-colors mb-4 md:mb-8"
          >
            <ArrowLeft size={12} /> Torna ai Progetti
          </a>

          {/* Tags */}
          <div className="flex gap-1.5 mb-2 md:mb-4 flex-wrap">
            {(progetto.tags ?? []).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[8px] md:text-[10px] uppercase tracking-wider text-[#FF6600] bg-[#FF6600]/10 px-1.5 py-0.5 md:px-2 md:py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-mono text-base md:text-2xl lg:text-3xl font-semibold text-white mb-2 md:mb-4 leading-tight">
            {progetto.title}
          </h1>

          {/* Meta */}
          <div className="flex gap-4 mb-4 md:mb-6 pb-3 md:pb-6 border-b border-[#333]">
            {progetto.client_name && (
              <div className="font-mono text-[10px] md:text-xs text-[#555]">
                Cliente: <span className="text-white">{progetto.client_name}</span>
              </div>
            )}
            {progetto.year && (
              <div className="font-mono text-[10px] md:text-xs text-[#555]">
                Anno: <span className="text-white">{progetto.year}</span>
              </div>
            )}
          </div>

          {/* Cover image */}
          {progetto.cover_image ? (
            <div className="aspect-[16/9] mb-4 md:mb-8 overflow-hidden border border-[#333]">
              <img src={progetto.cover_image} alt={progetto.title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="aspect-[16/9] bg-[#111] border border-[#333] mb-4 md:mb-8 flex items-center justify-center">
              <div className="grid grid-cols-4 md:grid-cols-6 gap-1.5 opacity-20">
                {Array.from({ length: 12 }).map((_, j) => (
                  <div key={j} className="w-4 h-4 md:w-6 md:h-6 border border-[#333]" />
                ))}
              </div>
            </div>
          )}

          {/* Gallery images */}
          {progetto.images && progetto.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-8">
              {progetto.images.map((img, i) => (
                <div key={i} className="aspect-[16/9] overflow-hidden border border-[#333]">
                  <img src={img} alt={`${progetto.title} - ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Description / Content */}
          <div className="prose-owltech prose-owltech-sm mb-6 md:mb-12">
            {(progetto.content || progetto.description || '').split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* External links */}
          {(progetto.link_live || progetto.link_repo) && (
            <div className="flex gap-2 md:gap-4 mb-6 md:mb-12 pb-4 md:pb-8 border-b border-[#333]">
              {progetto.link_live && (
                <a href={progetto.link_live} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] md:text-xs uppercase tracking-wider text-[#FF6600] border border-[#FF6600] px-3 py-1.5 md:px-4 md:py-2 hover:bg-[#FF6600] hover:text-black transition-all">
                  <ExternalLink size={12} /> Vedi live
                </a>
              )}
              {progetto.link_repo && (
                <a href={progetto.link_repo} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] md:text-xs uppercase tracking-wider text-[#999] border border-[#333] px-3 py-1.5 md:px-4 md:py-2 hover:border-[#FF6600] hover:text-[#FF6600] transition-all">
                  <ExternalLink size={12} /> Repository
                </a>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-4 pt-4 md:pt-8 border-t border-[#333]">
            <Button variant="cta" href="/preventivo">
              Progetto simile? Contattaci
            </Button>
            <Button variant="secondary" href="/#shop">
              Vedi lo Shop →
            </Button>
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
