'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import {
  Globe, Smartphone, Palette, Cloud, Brain, Shield, MessageSquare, ShoppingCart,
  Box, Database, Code, Cpu, Layers, Zap, Sparkles, FlaskConical, Cog, ScanLine,
  Wrench, Microscope, Factory, Settings, RefreshCcw, ArrowRight,
} from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import type { Servizio } from '@/types';

const ICON_MAP: Record<string, LucideIcon> = {
  Globe, Smartphone, Palette, Cloud, Brain, Shield, MessageSquare, ShoppingCart,
  Box, Database, Code, Cpu, Layers, Zap, Sparkles, FlaskConical, Cog, ScanLine,
  Wrench, Microscope, Factory, Settings, RefreshCcw,
};

// Fallback quando il DB è vuoto
const FALLBACK_SERVIZI: Pick<Servizio, 'id' | 'title' | 'description' | 'icon' | 'cover_image'>[] = [
  { id: '1', title: 'Post-Production & Quality Finishing', description: 'Finiture, perfezionamento e validazione tecnica per prodotti tecnici ed estetici.', icon: 'Sparkles', cover_image: '/images/servizi/post-production.jpg' },
  { id: '2', title: 'Product Development & R&D', description: 'Dall\'idea al prodotto funzionante: analisi, progettazione, simulazioni e validazione.', icon: 'FlaskConical', cover_image: '/images/servizi/product-development.jpg' },
  { id: '3', title: 'Prototyping, Manufacturing & Soft-Automation', description: 'Prototipi funzionali, piccole serie e automazioni digitali integrate.', icon: 'Cog', cover_image: '/images/servizi/prototyping-manufacturing.jpg' },
  { id: '4', title: 'Reverse Engineering & Digitalization', description: 'Digitalizzazione e ricostruzione di componenti con precisione e replicabilità.', icon: 'ScanLine', cover_image: '/images/servizi/reverse-engineering.jpg' },
];

interface ServiziProps {
  servizi?: Servizio[];
}

type ServiziItem = Pick<Servizio, 'id' | 'title' | 'description' | 'icon' | 'cover_image'>;

export default function Servizi({ servizi }: ServiziProps) {
  const items: ServiziItem[] = servizi && servizi.length > 0 ? servizi : FALLBACK_SERVIZI;
  const [selected, setSelected] = useState<ServiziItem | null>(null);

  return (
    <>
      <section id="servizi" className="section-padding bg-black/40 relative grid-overlay">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            label="Servizi"
            title="Cosa facciamo"
            description="Ogni progetto è unico. Ecco le competenze che mettiamo in campo."
          />

          <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-6">
            {items.map((servizio, i) => {
              const IconComponent = ICON_MAP[servizio.icon] || Globe;
              const hasImage = servizio.cover_image;

              return (
                <motion.div
                  key={servizio.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => { if (window.innerWidth < 768) setSelected(servizio); }}
                  className="bg-[#111]/70 border border-[#333] relative group hover:border-[#FF6600] transition-colors duration-300 overflow-hidden cursor-pointer md:cursor-default"
                >
                  {/* Corner accents — desktop only */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#FF6600] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden md:block" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#FF6600] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden md:block" />

                  {/* Image — hidden on mobile */}
                  {hasImage && (
                    <div className="relative w-full h-44 overflow-hidden hidden md:block">
                      <Image
                        src={servizio.cover_image!}
                        alt={servizio.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/30 to-transparent" />
                      <div className="absolute bottom-3 left-4 bg-black/60 border border-[#FF6600]/50 p-2 backdrop-blur-sm">
                        <IconComponent size={18} className="text-[#FF6600]" />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-3 md:p-5">
                    <div className={`mb-2 ${hasImage ? 'md:hidden' : ''}`}>
                      <IconComponent size={18} className="text-[#FF6600] md:w-6 md:h-6" />
                    </div>
                    {!hasImage && (
                      <div className="mb-3 hidden md:block">
                        <IconComponent size={24} className="text-[#FF6600]" />
                      </div>
                    )}
                    <h3 className="font-mono text-[9px] md:text-xs uppercase tracking-wider text-white mb-1 md:mb-2 leading-snug">
                      {servizio.title}
                    </h3>
                    <p className="font-mono text-[8px] md:text-[11px] text-[#999] leading-relaxed hidden md:block">
                      {servizio.description}
                    </p>
                    <p className="font-mono text-[8px] text-[#666] leading-snug line-clamp-2 md:hidden">
                      {servizio.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-6 md:mt-12 text-center"
          >
            <Button variant="secondary" href="/#progetti">
              Vedi i progetti →
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Modal dettaglio servizio ──────────────────── */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (() => {
          const Icon = ICON_MAP[selected.icon] || Globe;
          return (
            <div>
              {/* Image header */}
              {selected.cover_image && (
                <div className="relative w-full h-40 md:h-52 overflow-hidden">
                  <Image
                    src={selected.cover_image}
                    alt={selected.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 512px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                  <div className="absolute bottom-3 left-4 bg-black/60 border border-[#FF6600]/50 p-2 backdrop-blur-sm">
                    <Icon size={18} className="text-[#FF6600]" />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-5 md:p-6">
                {!selected.cover_image && (
                  <div className="mb-3">
                    <Icon size={24} className="text-[#FF6600]" />
                  </div>
                )}
                <h3 className="font-mono text-xs md:text-sm uppercase tracking-wider text-white mb-3 leading-snug">
                  {selected.title}
                </h3>
                <p className="font-mono text-[11px] md:text-xs text-[#999] leading-relaxed mb-6">
                  {selected.description}
                </p>

                <Button
                  variant="cta"
                  size="md"
                  href={`/preventivo?from=servizi&servizio=${encodeURIComponent(selected.title)}`}
                >
                  Richiedi preventivo <ArrowRight size={12} className="ml-1.5" />
                </Button>
              </div>
            </div>
          );
        })()}
      </Modal>
    </>
  );
}
