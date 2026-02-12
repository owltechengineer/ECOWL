'use client';

import { cn } from '@/lib/utils';
import { forwardRef, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'cta' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, href, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-mono uppercase tracking-wider transition-all duration-300 border cursor-pointer';

    const variants = {
      primary: 'bg-white text-black border-white hover:bg-[#FF6600] hover:border-[#FF6600] hover:text-black',
      secondary: 'bg-transparent text-white border-[#333] hover:border-[#FF6600] hover:text-[#FF6600]',
      ghost: 'bg-transparent text-[#999] border-transparent hover:text-white',
      cta: 'bg-[#FF6600] text-black border-[#FF6600] hover:bg-[#FF3300] hover:border-[#FF3300] font-bold',
      danger: 'bg-transparent text-[#FF3300] border-[#FF3300] hover:bg-[#FF3300] hover:text-black',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-[10px] md:px-4 md:py-2',
      md: 'px-4 py-2.5 text-[11px] md:px-6 md:py-3 md:text-xs',
      lg: 'px-5 py-3 text-xs md:px-8 md:py-4 md:text-sm',
    };

    if (href) {
      return (
        <a
          href={href}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
