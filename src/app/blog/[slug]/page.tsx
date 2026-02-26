import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
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

function renderContent(content: string) {
  const blocks = content.split('\n\n').filter(Boolean);

  return blocks.map((block, i) => {
    const trimmed = block.trim();

    if (/^#{1,3}\s/.test(trimmed)) {
      const level = trimmed.match(/^(#{1,3})\s/)?.[1].length || 2;
      const text = trimmed.replace(/^#{1,3}\s/, '');
      if (level === 1) return <h1 key={i}>{text}</h1>;
      if (level === 2) return <h2 key={i}>{text}</h2>;
      return <h3 key={i}>{text}</h3>;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const items = trimmed.split('\n').map(line => line.replace(/^[-*]\s/, '').trim());
      return (
        <ul key={i}>
          {items.map((item, j) => (
            <li key={j}>{renderInlineFormatting(item)}</li>
          ))}
        </ul>
      );
    }

    if (trimmed.startsWith('> ')) {
      const text = trimmed.replace(/^>\s?/gm, '');
      return <blockquote key={i}><p>{text}</p></blockquote>;
    }

    if (trimmed.startsWith('---')) {
      return <hr key={i} />;
    }

    const lines = trimmed.split('\n');
    if (lines.length > 1 && lines.every(l => /^[A-Z]/.test(l.trim()) && l.trim().length < 100)) {
      return (
        <div key={i} className="my-4">
          {lines.map((line, j) => (
            <p key={j} className="mb-1">{renderInlineFormatting(line)}</p>
          ))}
        </div>
      );
    }

    return <p key={i}>{renderInlineFormatting(trimmed)}</p>;
  });
}

function renderInlineFormatting(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(<strong key={match.index} className="text-white">{match[1]}</strong>);
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
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
        <main className="min-h-screen bg-black pt-20 md:pt-32 pb-12 md:pb-20 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-12 h-12 border border-[#333] flex items-center justify-center mx-auto mb-4">
              <span className="font-mono text-lg text-[#555]">?</span>
            </div>
            <h1 className="font-mono text-sm md:text-xl text-white mb-2">Articolo non trovato</h1>
            <p className="font-mono text-[10px] md:text-xs text-[#555] mb-6">
              L&apos;articolo potrebbe non essere ancora pubblicato o il link non è corretto.
            </p>
            <Button variant="secondary" href="/blog">
              <ArrowLeft size={12} className="mr-1.5" /> Torna al Blog
            </Button>
          </div>
        </main>
        <Footer settings={settings} />
      </>
    );
  }

  const wordCount = (post.content ?? '').split(/\s+/).length;
  const readTime = post.read_time || Math.max(1, Math.round(wordCount / 200));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-20 md:pt-32 pb-12 md:pb-20">
        <article className="max-w-2xl mx-auto px-4 md:px-6">
          {/* Back link */}
          <a
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] md:text-xs text-[#999] hover:text-[#FF6600] transition-colors mb-6 md:mb-10"
          >
            <ArrowLeft size={12} /> Torna al Blog
          </a>

          {/* Tags above title */}
          {(post.tags ?? []).length > 0 && (
            <div className="flex gap-1.5 mb-3 md:mb-4 flex-wrap">
              {post.tags.map((tag) => (
                <span key={tag} className="font-mono text-[8px] md:text-[10px] uppercase tracking-wider text-[#FF6600] bg-[#FF6600]/10 px-1.5 py-0.5 md:px-2 md:py-1">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-mono text-base md:text-2xl lg:text-3xl font-semibold text-white mb-4 md:mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="font-mono text-[11px] md:text-sm text-[#999] leading-relaxed mb-4 md:mb-6 border-l-2 border-[#FF6600] pl-3 md:pl-4">
              {post.excerpt}
            </p>
          )}

          {/* Meta bar */}
          <div className="flex items-center gap-3 md:gap-5 mb-6 md:mb-10 py-3 md:py-4 border-y border-[#222]">
            <div className="flex items-center gap-1.5">
              <User size={12} className="text-[#555]" />
              <span className="font-mono text-[9px] md:text-xs text-[#777]">{post.author}</span>
            </div>
            {post.published_at && (
              <div className="flex items-center gap-1.5">
                <Calendar size={12} className="text-[#555]" />
                <span className="font-mono text-[9px] md:text-xs text-[#777]">{formatDate(post.published_at)}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-[#555]" />
              <span className="font-mono text-[9px] md:text-xs text-[#777]">{readTime} min lettura</span>
            </div>
          </div>

          {/* Cover image */}
          {post.cover_image && (
            <div className="aspect-[16/9] mb-8 md:mb-12 overflow-hidden border border-[#333]">
              <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Content */}
          <div className="prose-owltech prose-owltech-sm">
            {renderContent(post.content ?? '')}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-[#222]">
            <div className="bg-[#111] border border-[#333] p-4 md:p-8 text-center">
              <p className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-[#FF6600] mb-2">
                Ti interessa?
              </p>
              <p className="font-mono text-[10px] md:text-sm text-[#999] mb-4 md:mb-6">
                Hai un progetto in mente? Parliamone.
              </p>
              <Button variant="cta" href="/preventivo">
                Richiedi preventivo
              </Button>
            </div>
          </div>

          {/* Back to blog */}
          <div className="mt-6 md:mt-8 text-center">
            <a
              href="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] md:text-xs text-[#555] hover:text-[#FF6600] transition-colors"
            >
              <ArrowLeft size={12} /> Tutti gli articoli
            </a>
          </div>
        </article>
      </main>
      <Footer settings={settings} />
    </>
  );
}
