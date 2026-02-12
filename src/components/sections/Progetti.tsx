'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import type { Progetto } from '@/types';

// Fallback quando il DB è vuoto
const FALLBACK_PROGETTI: Partial<Progetto>[] = [
  {
    id: '1',
    title: 'NeoBank Dashboard',
    slug: 'neobank-dashboard',
    description: 'Dashboard completa per una piattaforma fintech di nuova generazione.',
    cover_image: null,
    tags: ['React', 'TypeScript', 'Fintech'],
    client_name: 'NeoBank S.r.l.',
    year: 2025,
  },
  {
    id: '2',
    title: 'EcoTrack Platform',
    slug: 'ecotrack-platform',
    description: 'Piattaforma di monitoraggio ambientale con dati in tempo reale.',
    cover_image: null,
    tags: ['Next.js', 'IoT', 'Data Viz'],
    client_name: 'EcoTrack',
    year: 2025,
  },
];

interface ProgettiProps {
  progetti?: Progetto[];
}

export default function Progetti({ progetti }: ProgettiProps) {
  const items = progetti && progetti.length > 0 ? progetti : FALLBACK_PROGETTI;

  return (
    <section id="progetti" className="section-padding bg-black/40 relative">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Progetti"
          title="Il nostro lavoro"
          description="Progetti reali per clienti reali. Ogni soluzione è un passo avanti."
        />

        <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-6">
          {items.map((progetto, i) => (
            <motion.a
              key={progetto.id}
              href={`/progetti/${progetto.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group block relative overflow-hidden border border-[#333] bg-black/30 hover:border-[#FF6600] transition-colors duration-300"
            >
              {/* Image */}
              <div className="aspect-[4/3] md:aspect-[16/10] bg-[#111]/60 relative overflow-hidden">
                {progetto.cover_image ? (
                  <img
                    src={progetto.cover_image}
                    alt={progetto.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-2 opacity-20">
                      {Array.from({ length: 9 }).map((_, j) => (
                        <div key={j} className="w-3 h-3 md:w-4 md:h-4 border border-[#333]" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ArrowUpRight className="text-[#FF6600]" size={20} />
                </div>
              </div>

              {/* Info */}
              <div className="p-2.5 md:p-5">
                {/* Tags — hidden on mobile */}
                <div className="hidden md:flex items-center gap-2 mb-2 flex-wrap">
                  {(progetto.tags ?? []).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-wider text-[#FF6600] bg-[#FF6600]/10 px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-mono text-[9px] md:text-sm uppercase tracking-wider text-white mb-0.5 md:mb-1.5 group-hover:text-[#FF6600] transition-colors leading-snug">
                  {progetto.title}
                </h3>
                {/* Description — hidden on mobile */}
                <p className="font-mono text-[11px] text-[#999] leading-relaxed mb-2 hidden md:block">
                  {progetto.description}
                </p>
                {/* Mobile: year only */}
                <p className="font-mono text-[8px] text-[#555] md:hidden">
                  {progetto.year || ''}
                </p>
                {(progetto.client_name || progetto.year) && (
                  <div className="hidden md:flex gap-4 font-mono text-[10px] text-[#555]">
                    {progetto.client_name && <span>{progetto.client_name}</span>}
                    {progetto.year && <span>{progetto.year}</span>}
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 md:mt-12 text-center"
        >
          <Button variant="secondary" href="/shop">
            Vai allo Shop →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
