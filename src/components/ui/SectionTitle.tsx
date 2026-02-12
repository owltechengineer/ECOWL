'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({
  label,
  title,
  description,
  align = 'left',
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={`mb-6 md:mb-10 ${align === 'center' ? 'text-center' : ''}`}
    >
      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#FF6600] mb-2 block font-mono">
        [ {label} ]
      </span>
      <h2 className="text-sm md:text-xl lg:text-2xl font-mono font-semibold text-white mb-2">
        {title}
      </h2>
      {description && (
        <p className={`text-[#999] font-mono text-[11px] md:text-xs leading-relaxed ${align === 'center' ? 'max-w-xl mx-auto' : 'max-w-lg'}`}>
          {description}
        </p>
      )}
      <div className={`mt-3 h-px w-10 md:w-16 bg-[#FF6600] ${align === 'center' ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}
