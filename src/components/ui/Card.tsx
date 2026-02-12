'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function Card({ children, className, hover = true, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        'bg-[#111]/70 border border-[#333] p-2.5 md:p-5 relative group',
        hover && 'hover:border-[#FF6600] transition-colors duration-300',
        className
      )}
    >
      {/* Technical corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#FF6600] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#FF6600] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {children}
    </motion.div>
  );
}
