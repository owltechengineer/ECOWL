'use client';

import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

/* ---- Text Input ---- */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-1 md:space-y-2">
        <label className="text-[9px] md:text-xs uppercase tracking-wider text-[#999] font-mono block">
          {label}
        </label>
        <input
          ref={ref}
          className={cn(
            'w-full bg-[#111] border border-[#333] text-white font-mono text-[11px] md:text-sm px-2.5 py-2 md:px-4 md:py-3',
            'focus:outline-none focus:border-[#FF6600] transition-colors duration-300',
            'placeholder:text-[#555]',
            error && 'border-[#FF3300]',
            className
          )}
          {...props}
        />
        {error && <p className="text-[10px] md:text-xs text-[#FF3300] font-mono">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

/* ---- Textarea ---- */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-1 md:space-y-2">
        <label className="text-[9px] md:text-xs uppercase tracking-wider text-[#999] font-mono block">
          {label}
        </label>
        <textarea
          ref={ref}
          className={cn(
            'w-full bg-[#111] border border-[#333] text-white font-mono text-[11px] md:text-sm px-2.5 py-2 md:px-4 md:py-3 min-h-[80px] md:min-h-[120px] resize-y',
            'focus:outline-none focus:border-[#FF6600] transition-colors duration-300',
            'placeholder:text-[#555]',
            error && 'border-[#FF3300]',
            className
          )}
          {...props}
        />
        {error && <p className="text-[10px] md:text-xs text-[#FF3300] font-mono">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

/* ---- Select ---- */
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="space-y-1 md:space-y-2">
        <label className="text-[9px] md:text-xs uppercase tracking-wider text-[#999] font-mono block">
          {label}
        </label>
        <select
          ref={ref}
          className={cn(
            'w-full bg-[#111] border border-[#333] text-white font-mono text-[11px] md:text-sm px-2.5 py-2 md:px-4 md:py-3',
            'focus:outline-none focus:border-[#FF6600] transition-colors duration-300',
            error && 'border-[#FF3300]',
            className
          )}
          {...props}
        >
          <option value="">Seleziona...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-[10px] md:text-xs text-[#FF3300] font-mono">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
