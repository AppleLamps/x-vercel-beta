'use client';

import type { ComponentRenderProps } from '@json-render/react';

interface MissionStatProps {
  value: string;
  label: string;
  unit?: string | null;
  size?: 'sm' | 'md' | 'lg' | null;
}

export function MissionStat({ element }: ComponentRenderProps) {
  const { value, label, unit, size = 'md' } = element.props as MissionStatProps;

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  };

  return (
    <div className="py-6 px-4 text-center">
      <div className={`${sizeClasses[size || 'md']} font-light mb-2 text-white`}>
        {value}
        {unit && <span className="text-lg ml-1 text-gray-400">{unit}</span>}
      </div>
      <div className="text-xs tracking-[0.2em] text-gray-500 uppercase">{label}</div>
    </div>
  );
}
