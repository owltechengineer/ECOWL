'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types';

interface BlogPreviewProps {
  posts?: BlogPost[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const items = posts && posts.length > 0 ? posts : [];

  return (
    <section id="blog" className="section-padding bg-black/40 relative">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Blog"
          title="Approfondimenti"
          description="Articoli, guide e riflessioni dal nostro team."
        />

        {items.length === 0 ? (
          <div className="text-center py-10 md:py-16">
            <p className="font-mono text-[10px] md:text-sm text-[#555]">
              Prossimamente nuovi articoli.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
            {items.map((post, i) => (
              <Card key={post.id} delay={i * 0.05}>
                <a href={`/blog/${post.slug}`} className="block group">
                  {post.cover_image && (
                    <div className="aspect-[16/10] mb-2 md:mb-3 overflow-hidden border border-[#333]">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 mb-2 md:mb-3">
                    <Calendar size={10} className="text-[#555] md:w-3 md:h-3" />
                    <span className="font-mono text-[8px] md:text-[10px] text-[#555]">
                      {formatDate(post.published_at ?? null)}
                    </span>
                  </div>
                  <h3 className="font-mono text-[9px] md:text-xs uppercase tracking-wider text-white mb-1 md:mb-2 group-hover:text-[#FF6600] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="font-mono text-[8px] md:text-[11px] text-[#999] leading-relaxed mb-2 md:mb-3 line-clamp-2 md:line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex gap-1 md:gap-2 flex-wrap">
                    {(post.tags ?? []).slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[7px] md:text-[10px] uppercase tracking-wider text-[#FF6600] bg-[#FF6600]/10 px-1 py-0.5 md:px-2 md:py-1"
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 md:mt-12 text-center"
        >
          <Button variant="secondary" href="/blog">
            Tutti gli articoli →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
