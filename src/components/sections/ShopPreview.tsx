'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { formatPrice } from '@/lib/utils';
import type { Prodotto } from '@/types';

// Fallback quando il DB è vuoto
const FALLBACK_PRODOTTI: Partial<Prodotto>[] = [
  {
    id: '1',
    title: 'Starter Kit Web',
    slug: 'starter-kit-web',
    description: 'Template professionale Next.js con design system completo.',
    price: 299,
    cover_image: null,
    tags: [],
  },
  {
    id: '2',
    title: 'Dashboard Pro',
    slug: 'dashboard-pro',
    description: "Dashboard admin React pronta all'uso con grafici e analytics.",
    price: 499,
    cover_image: null,
    tags: [],
  },
  {
    id: '3',
    title: 'E-Commerce Engine',
    slug: 'ecommerce-engine',
    description: 'Piattaforma e-commerce completa con checkout e gestione ordini.',
    price: 899,
    cover_image: null,
    tags: [],
  },
];

interface ShopPreviewProps {
  prodotti?: Prodotto[];
}

export default function ShopPreview({ prodotti }: ShopPreviewProps) {
  const items = prodotti && prodotti.length > 0 ? prodotti : FALLBACK_PRODOTTI;
  const [selected, setSelected] = useState<Partial<Prodotto> | null>(null);

  return (
    <>
      <section id="shop" className="section-padding bg-black/40 relative grid-overlay">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            label="Shop"
            title="Prodotti digitali"
            description="Soluzioni pronte all'uso, sviluppate con i nostri standard."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
            {items.map((prodotto, i) => (
              <Card key={prodotto.id} delay={i * 0.05}>
                <div
                  className="block cursor-pointer group"
                  onClick={() => setSelected(prodotto)}
                >
                  {/* Image */}
                  <div className="aspect-square md:aspect-[4/3] bg-[#0a0a0a]/50 mb-2 md:mb-3 border border-[#1A1A1A] flex items-center justify-center overflow-hidden">
                    {prodotto.cover_image ? (
                      <img
                        src={prodotto.cover_image}
                        alt={prodotto.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ShoppingBag className="text-[#333]" size={20} />
                    )}
                  </div>

                  <h3 className="font-mono text-[9px] md:text-xs uppercase tracking-wider text-white mb-0.5 md:mb-1.5 leading-snug group-hover:text-[#FF6600] transition-colors">
                    {prodotto.title}
                  </h3>
                  {/* Description — desktop only */}
                  <p className="font-mono text-[11px] text-[#999] leading-relaxed mb-2 hidden md:block">
                    {prodotto.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] md:text-base text-[#FF6600] font-bold">
                      {formatPrice(prodotto.price ?? 0)}
                    </span>
                    <span className="font-mono text-[8px] md:text-xs uppercase tracking-wider text-[#555] group-hover:text-[#FF6600] transition-colors hidden md:inline">
                      Dettagli →
                    </span>
                  </div>
                </div>
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
            <Button variant="secondary" href="/shop">
              Vedi tutto lo Shop →
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Modal dettaglio prodotto ──────────────────── */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            {/* Image */}
            <div className="aspect-[4/3] bg-[#111] flex items-center justify-center overflow-hidden">
              {selected.cover_image ? (
                <img
                  src={selected.cover_image}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ShoppingBag className="text-[#333]" size={40} />
              )}
            </div>

            {/* Content */}
            <div className="p-5 md:p-6">
              <h3 className="font-mono text-xs md:text-sm uppercase tracking-wider text-white mb-2 leading-snug">
                {selected.title}
              </h3>

              <span className="font-mono text-lg md:text-xl text-[#FF6600] font-bold block mb-3">
                {formatPrice(selected.price ?? 0)}
              </span>

              <p className="font-mono text-[11px] md:text-xs text-[#999] leading-relaxed mb-4">
                {selected.description}
              </p>

              {/* Tags */}
              {selected.tags && selected.tags.length > 0 && (
                <div className="flex gap-1.5 flex-wrap mb-5">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] uppercase tracking-wider text-[#FF6600] bg-[#FF6600]/10 px-1.5 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="cta"
                  size="md"
                  href={`/preventivo?from=shop&prodotto=${encodeURIComponent(selected.title || '')}&slug=${selected.slug}`}
                >
                  Richiedi preventivo <ArrowRight size={12} className="ml-1.5" />
                </Button>
                {selected.slug && (
                  <Button variant="secondary" size="md" href={`/shop/${selected.slug}`}>
                    Vedi dettagli
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
