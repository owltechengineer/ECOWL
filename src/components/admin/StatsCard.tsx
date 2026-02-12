'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  delay?: number;
}

export default function StatsCard({ title, value, icon: Icon, trend, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="admin-card p-3 md:p-5"
    >
      <div className="flex items-start justify-between mb-2 md:mb-4">
        <Icon size={16} className="text-[#FF6600] md:w-5 md:h-5" />
        {trend && (
          <span className="font-mono text-[8px] md:text-[10px] text-emerald-400">{trend}</span>
        )}
      </div>
      <p className="font-mono text-lg md:text-2xl font-bold text-white mb-0.5">{value}</p>
      <p className="font-mono text-[8px] md:text-[10px] uppercase tracking-wider text-[#555]">{title}</p>
    </motion.div>
  );
}
