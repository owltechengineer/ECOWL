'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types';

// Fallback quando il DB è vuoto
const FALLBACK_POSTS: Partial<BlogPost>[] = [
  {
    id: '1',
    title: 'Come scegliere il framework giusto nel 2026',
    slug: 'framework-giusto-2026',
    excerpt: 'Guida pratica alla scelta tra Next.js, Nuxt, SvelteKit e Remix per il tuo prossimo progetto.',
    published_at: '2026-01-15',
    tags: ['Tech', 'Frontend'],
  },
  {
    id: '2',
    title: 'Design System: perché investirci subito',
    slug: 'design-system-investimento',
    excerpt: 'Un design system non è un lusso: è un moltiplicatore di velocità e coerenza.',
    published_at: '2026-01-28',
    tags: ['Design', 'UX'],
  },
  {
    id: '3',
    title: "Three.js nel 2026: stato dell'arte",
    slug: 'threejs-stato-arte-2026',
    excerpt: 'Le novità di Three.js e React Three Fiber che stanno ridefinendo il 3D sul web.',
    published_at: '2026-02-05',
    tags: ['3D', 'WebGL'],
  },
];

interface BlogPreviewProps {
  posts?: BlogPost[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const items = posts && posts.length > 0 ? posts : FALLBACK_POSTS;

  return (
    <section id="blog" className="section-padding bg-black/40 relative">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Blog"
          title="Approfondimenti"
          description="Articoli, guide e riflessioni dal nostro team."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
          {items.map((post, i) => (
            <Card key={post.id} delay={i * 0.05}>
              <a href={`/blog/${post.slug}`} className="block group">
                <div className="flex items-center gap-1.5 mb-2 md:mb-3">
                  <Calendar size={10} className="text-[#555] md:w-3 md:h-3" />
                  <span className="font-mono text-[8px] md:text-[10px] text-[#555]">
                    {formatDate(post.published_at ?? null)}
                  </span>
                </div>
                <h3 className="font-mono text-[9px] md:text-xs uppercase tracking-wider text-white mb-1 md:mb-2 group-hover:text-[#FF6600] transition-colors leading-snug">
                  {post.title}
                </h3>
                {/* Excerpt — desktop only */}
                <p className="font-mono text-[11px] text-[#999] leading-relaxed mb-3 hidden md:block">
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
