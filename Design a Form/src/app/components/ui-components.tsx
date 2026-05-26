import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

// Button Component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[var(--brand-blue)] text-white hover:bg-[#1d4ed8]',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    danger: 'bg-[var(--brand-red)] text-white hover:bg-[#dc2626]',
    success: 'bg-[var(--brand-green)] text-white hover:bg-[#059669]',
    ghost: 'hover:bg-gray-100 text-gray-700',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

// Card Component
interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200 shadow-sm',
        onClick && 'cursor-pointer hover:shadow-md transition-shadow',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-6 pb-4', className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('px-6 pb-6', className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn('font-semibold', className)}>{children}</h3>;
}

// Badge Component
interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  );
}

// Alert Component
interface AlertProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export function Alert({ children, variant = 'info', className }: AlertProps) {
  const variants = {
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div className={cn('p-4 rounded-lg border', variants[variant], className)}>
      {children}
    </div>
  );
}

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <input
        className={cn(
          'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent outline-none transition-all',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Textarea Component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, ...props }: TextareaProps) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <textarea
        className={cn(
          'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent outline-none transition-all resize-none',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Checkbox Component
interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-[var(--brand-blue)] border-gray-300 rounded focus:ring-[var(--brand-blue)]"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

// Select Component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <select
        className={cn(
          'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent outline-none transition-all',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
