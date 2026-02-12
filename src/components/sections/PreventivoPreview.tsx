'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';

const FEATURES = [
  'Selezione servizi e settore specifico',
  'Caricamento foto, video, documenti e file CAD',
  'Dati protetti con validazione di cybersicurezza',
  'Risposta entro 24 ore lavorative',
];

export default function PreventivoPreview() {
  return (
    <section id="preventivo" className="section-padding bg-black/40 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Info */}
          <div>
            <SectionTitle
              label="Preventivo"
              title="Iniziamo qualcosa insieme"
              description="Raccontaci il tuo progetto. Ti rispondiamo con una proposta chiara, senza sorprese."
            />

            <div className="space-y-3 md:space-y-4 mb-6 md:mb-10">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle size={12} className="text-[#FF6600] shrink-0" />
                  <span className="font-mono text-[10px] md:text-[11px] text-[#999]">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Button variant="cta" size="lg" href="/preventivo">
              Richiedi preventivo <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>

          {/* Right: Decorative mock form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="relative border border-[#333] bg-black/30 p-8">
              <div className="space-y-6">
                {['Nome', 'Email', 'Tipo', 'Settore', 'Servizi', 'Allegati'].map((field) => (
                  <div key={field} className="flex items-center gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#555] w-16 shrink-0">
                      {field}
                    </span>
                    <div className="h-px flex-1 bg-[#1A1A1A]" />
                  </div>
                ))}
              </div>
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#FF6600]" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-[#FF6600]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
