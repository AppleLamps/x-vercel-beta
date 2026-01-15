'use client';

import type { ComponentRenderProps } from '@json-render/react';

interface DividerProps {
  variant?: 'line' | 'glow' | 'fade' | null;
}

export function Divider({ element }: ComponentRenderProps) {
  const { variant = 'line' } = element.props as DividerProps;

  const variantStyles = {
    line: 'border-t border-white/10',
    glow: 'h-px bg-gradient-to-r from-transparent via-white/30 to-transparent',
    fade: 'h-px bg-gradient-to-r from-white/20 to-transparent',
  };

  return <div className={`my-6 ${variantStyles[variant || 'line']}`} />;
}
