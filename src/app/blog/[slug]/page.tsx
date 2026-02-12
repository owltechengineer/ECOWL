import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { getBlogPostBySlug, getSiteSettings } from '@/lib/supabase/queries';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  return {
    title: post?.title || 'Articolo non trovato',
    description: post?.excerpt || post?.content?.slice(0, 160) || '',
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getBlogPostBySlug(slug),
    getSiteSettings(),
  ]);

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black pt-32 pb-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-mono text-2xl text-white mb-4">404 — Articolo non trovato</h1>
            <Button variant="secondary" href="/blog">
              <ArrowLeft size={14} className="mr-2" /> Torna al Blog
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
        <article className="max-w-2xl mx-auto px-4 md:px-6">
          {/* Back link */}
          <a
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] md:text-xs text-[#999] hover:text-[#FF6600] transition-colors mb-4 md:mb-8"
          >
            <ArrowLeft size={12} /> Torna al Blog
          </a>

          {/* Cover image */}
          {post.cover_image && (
            <div className="aspect-[16/9] mb-4 md:mb-8 overflow-hidden border border-[#333]">
              <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Tags */}
          <div className="flex gap-1.5 mb-2 md:mb-4 flex-wrap">
            {(post.tags ?? []).map((tag) => (
              <span key={tag} className="font-mono text-[8px] md:text-[10px] uppercase tracking-wider text-[#FF6600] bg-[#FF6600]/10 px-1.5 py-0.5 md:px-2 md:py-1">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-mono text-sm md:text-2xl lg:text-3xl font-semibold text-white mb-2 md:mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 md:gap-6 mb-6 md:mb-10 border-b border-[#333] pb-3 md:pb-6">
            <div className="flex items-center gap-1.5">
              <Calendar size={11} className="text-[#555]" />
              <span className="font-mono text-[9px] md:text-xs text-[#555]">{formatDate(post.published_at)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User size={11} className="text-[#555]" />
              <span className="font-mono text-[9px] md:text-xs text-[#555]">{post.author}</span>
            </div>
            {post.read_time && (
              <span className="font-mono text-[9px] md:text-xs text-[#555]">{post.read_time} min</span>
            )}
          </div>

          {/* Content */}
          <div className="prose-owltech prose-owltech-sm">
            {(post.content ?? '').split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 md:mt-16 pt-4 md:pt-8 border-t border-[#333] text-center">
            <p className="font-mono text-[9px] md:text-sm text-[#999] mb-3 md:mb-6">
              Hai un progetto in mente? Parliamone.
            </p>
            <Button variant="cta" href="/preventivo">
              Richiedi preventivo
            </Button>
          </div>
        </article>
      </main>
      <Footer settings={settings} />
    </>
  );
}
