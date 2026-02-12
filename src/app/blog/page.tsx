import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import { Calendar, ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { getBlogPosts, getSiteSettings } from '@/lib/supabase/queries';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articoli, guide e riflessioni dal team OWLTECH su tecnologia, design e innovazione.',
};

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([
    getBlogPosts(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-20 md:pt-32 pb-12 md:pb-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] md:text-xs text-[#999] hover:text-[#FF6600] transition-colors mb-4 md:mb-6"
          >
            <ArrowLeft size={12} /> Torna alla Home
          </a>

          <SectionTitle
            label="Blog"
            title="Approfondimenti"
            description="Articoli, guide e riflessioni dal nostro team su tecnologia, design e innovazione."
          />

          {posts.length === 0 ? (
            <p className="font-mono text-[10px] md:text-sm text-[#999] text-center py-12 md:py-20">
              Nessun articolo pubblicato ancora.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-6">
              {posts.map((post, i) => (
                <Card key={post.id} delay={i * 0.1}>
                  <a href={`/blog/${post.slug}`} className="block group">
                    <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
                      <div className="flex items-center gap-1 md:gap-2">
                        <Calendar size={10} className="text-[#555] md:w-3 md:h-3" />
                        <span className="font-mono text-[7px] md:text-[10px] text-[#555]">
                          {formatDate(post.published_at)}
                        </span>
                      </div>
                      <span className="font-mono text-[7px] md:text-[10px] text-[#555] hidden md:inline">
                        {post.author}
                      </span>
                    </div>
                    <h3 className="font-mono text-[10px] md:text-sm uppercase tracking-wider text-white mb-1.5 md:mb-3 group-hover:text-[#FF6600] transition-colors line-clamp-2 md:line-clamp-none">
                      {post.title}
                    </h3>
                    <p className="font-mono text-[8px] md:text-xs text-[#999] leading-relaxed mb-2 md:mb-4 line-clamp-2 md:line-clamp-none">
                      {post.excerpt}
                    </p>
                    <div className="flex gap-1 md:gap-2 flex-wrap">
                      {(post.tags ?? []).slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[7px] md:text-[10px] uppercase tracking-wider text-[#FF6600] bg-[#FF6600]/10 px-1.5 py-0.5 md:px-2 md:py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
