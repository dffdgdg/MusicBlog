import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles = "w-full bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300";
    
    const variants = {
      default: "px-4 py-3",
      search: "pl-10 pr-4 py-3"
    };

    return (
      <input
        className={cn(baseStyles, variants[variant], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';