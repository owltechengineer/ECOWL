'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import type { HeroContent } from '@/types';

// Fallback quando il DB è vuoto o non raggiungibile
const FALLBACK: HeroContent = {
  id: '',
  headline: 'Siamo diversi, ma seri.',
  subtitle:
    'Progettiamo soluzioni digitali su misura. Dalla strategia al codice, ogni dettaglio è pensato per funzionare — e per distinguersi.',
  cta_text: 'Scopri i servizi',
  cta_link: '/#servizi',
  cta_secondary_text: 'Vedi i progetti',
  cta_secondary_link: '/#progetti',
  background_type: '3d',
  background_url: null,
  is_active: true,
  created_at: '',
  updated_at: '',
};

interface HeroProps {
  data?: HeroContent | null;
}

export default function Hero({ data }: HeroProps) {
  const hero = data ?? FALLBACK;

  // Divide l'headline sulla virgola per lo stile bicolore
  const parts = hero.headline.split(',');
  const firstLine = parts[0] + (parts.length > 1 ? ',' : '');
  const secondLine = parts.length > 1 ? parts.slice(1).join(',').trim() : null;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Content Overlay — 3D background now lives in BackgroundScene at page level */}
      <div className="relative z-10 h-full flex flex-col justify-center px-5 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Tag */}
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#FF6600] mb-4 md:mb-6 block">
            [ Tecnologia &amp; Design ]
          </span>

          {/* Headline */}
          <h1 className="font-mono text-xl md:text-3xl lg:text-5xl font-semibold text-white leading-tight mb-3 md:mb-5">
            {firstLine}
            {secondLine && (
              <>
                <br />
                <span className="text-[#FF6600]">{secondLine}</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="font-mono text-[11px] md:text-xs text-[#999] max-w-sm mb-6 md:mb-8 leading-relaxed">
            {hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="cta" size="lg" href={hero.cta_link}>
              {hero.cta_text}
            </Button>
            {hero.cta_secondary_text && hero.cta_secondary_link && (
              <Button variant="secondary" size="lg" href={hero.cta_secondary_link}>
                {hero.cta_secondary_text}
              </Button>
            )}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#555]">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 bg-gradient-to-b from-[#FF6600] to-transparent"
            />
          </div>
        </motion.div>
      </div>

      {/* Subtle bottom gradient for text readability */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent z-10" />
    </section>
  );
}
