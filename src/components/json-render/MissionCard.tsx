'use client';

import type { ComponentRenderProps } from '@json-render/react';

interface MissionCardProps {
  title?: string | null;
  subtitle?: string | null;
  variant?: 'default' | 'dark' | 'highlight' | null;
}

export function MissionCard({ element, children }: ComponentRenderProps) {
  const { title, subtitle, variant = 'default' } = element.props as MissionCardProps;

  const variantClasses = {
    default: 'bg-zinc-900 border-white/10',
    dark: 'bg-black border-white/5',
    highlight: 'bg-zinc-800 border-white/20',
  };

  return (
    <div className={`rounded-xl border p-6 ${variantClasses[variant || 'default']}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-white text-xl font-light">{title}</h3>}
          {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
