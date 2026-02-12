import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { ArrowLeft, ShoppingBag, CheckCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { getProdottoBySlug, getSiteSettings } from '@/lib/supabase/queries';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProdottoBySlug(slug);
  return {
    title: product?.title || 'Prodotto non trovato',
    description: product?.description || '',
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([
    getProdottoBySlug(slug),
    getSiteSettings(),
  ]);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black pt-32 pb-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-mono text-2xl text-white mb-4">404 — Prodotto non trovato</h1>
            <Button variant="secondary" href="/#shop">
              <ArrowLeft size={14} className="mr-2" /> Torna allo Shop
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
            href="/#shop"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] md:text-xs text-[#999] hover:text-[#FF6600] transition-colors mb-4 md:mb-8"
          >
            <ArrowLeft size={12} /> Torna allo Shop
          </a>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
            {/* Image */}
            <div className="aspect-[4/3] md:aspect-square bg-[#111] border border-[#333] flex items-center justify-center overflow-hidden">
              {product.cover_image ? (
                <img src={product.cover_image} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <ShoppingBag className="text-[#333]" size={48} />
              )}
            </div>

            {/* Details */}
            <div>
              <h1 className="font-mono text-sm md:text-xl lg:text-2xl font-semibold text-white mb-2 md:mb-3 uppercase tracking-wider leading-snug">
                {product.title}
              </h1>
              <p className="font-mono text-[11px] md:text-xs text-[#999] leading-relaxed mb-3 md:mb-5">
                {product.description}
              </p>

              <div className="flex items-baseline gap-3 mb-4 md:mb-6 pb-3 md:pb-5 border-b border-[#333]">
                <span className="font-mono text-lg md:text-2xl text-[#FF6600] font-bold">
                  {formatPrice(product.price)}
                </span>
                <span className="font-mono text-[9px] md:text-xs text-[#555]">
                  {product.currency || 'EUR'} · IVA inclusa
                </span>
              </div>

              {/* Tags as features */}
              {product.tags && product.tags.length > 0 && (
                <div className="space-y-2 mb-4 md:mb-6">
                  {product.tags.map((tag) => (
                    <div key={tag} className="flex items-center gap-2">
                      <CheckCircle size={11} className="text-[#FF6600] shrink-0" />
                      <span className="font-mono text-[10px] md:text-xs text-[#999]">{tag}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Long content */}
              {product.content && (
                <div className="prose-owltech prose-owltech-sm mb-4 md:mb-6 pb-3 md:pb-5 border-b border-[#333]">
                  {product.content.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}

              {/* Gallery */}
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4 md:mb-6">
                  {product.images.map((img, i) => (
                    <div key={i} className="aspect-[4/3] overflow-hidden border border-[#333]">
                      <img src={img} alt={`${product.title} - ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <Button
                  variant="cta"
                  href={`/preventivo?from=shop&prodotto=${encodeURIComponent(product.title)}&slug=${product.slug}`}
                  className="flex-1"
                >
                  Richiedi preventivo
                </Button>
                <Button
                  variant="secondary"
                  href={`/preventivo?from=shop&prodotto=${encodeURIComponent(product.title)}&slug=${product.slug}&personalizzazione=true`}
                  className="flex-1"
                >
                  Personalizzazione
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
