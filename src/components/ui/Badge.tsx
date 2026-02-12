'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'danger';
  className?: string;
}

const variantStyles = {
  default: 'text-[#999] bg-[#999]/10',
  accent: 'text-[#FF6600] bg-[#FF6600]/10',
  success: 'text-emerald-400 bg-emerald-400/10',
  warning: 'text-amber-400 bg-amber-400/10',
  danger: 'text-[#FF3300] bg-[#FF3300]/10',
};

export default function Badge({ children, variant = 'accent', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'font-mono text-[10px] uppercase tracking-wider px-2 py-1 inline-block',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
