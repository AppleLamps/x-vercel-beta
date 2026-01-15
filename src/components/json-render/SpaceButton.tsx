'use client';

import type { ComponentRenderProps } from '@json-render/react';
import { useActions } from '@json-render/react';

interface SpaceButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | null;
  size?: 'sm' | 'md' | 'lg' | null;
  action?: string | null;
}

export function SpaceButton({ element }: ComponentRenderProps) {
  const { label, variant = 'primary', size = 'md', action } = element.props as SpaceButtonProps;
  const { execute } = useActions();

  const variantClasses = {
    primary: 'bg-white text-black hover:bg-gray-100',
    secondary: 'bg-zinc-800 text-white hover:bg-zinc-700 border border-white/10',
    outline: 'bg-transparent text-white border border-white/30 hover:border-white/50',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const handleClick = () => {
    if (action) {
      execute({ name: action });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${variantClasses[variant || 'primary']} ${sizeClasses[size || 'md']} rounded-md font-medium tracking-wider uppercase transition-all`}
    >
      {label}
    </button>
  );
}
