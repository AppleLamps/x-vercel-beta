'use client';

import type { ComponentRenderProps } from '@json-render/react';

interface MoonProps {
  size?: 'sm' | 'md' | 'lg' | null;
  position?: 'top-right' | 'center' | 'background' | null;
  glow?: boolean | null;
}

export function Moon({ element }: ComponentRenderProps) {
  const { size = 'md', position = 'top-right', glow = true } = element.props as MoonProps;

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-64 h-64',
  };

  const positionClasses = {
    'top-right': 'absolute top-8 right-8',
    center: 'mx-auto',
    background: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20',
  };

  return (
    <div
      className={`${sizeClasses[size || 'md']} ${positionClasses[position || 'top-right']} rounded-full`}
      style={{
        background: 'radial-gradient(circle at 30% 30%, #e8e8e8 0%, #c0c0c0 50%, #888 100%)',
        boxShadow: glow
          ? '0 0 60px 20px rgba(255, 255, 255, 0.1), 0 0 100px 40px rgba(255, 255, 255, 0.05)'
          : 'none',
      }}
    />
  );
}
