'use client';

import type { ComponentRenderProps } from '@json-render/react';

interface GridProps {
  columns?: number | null;
  gap?: 'sm' | 'md' | 'lg' | null;
}

export function Grid({ element, children }: ComponentRenderProps) {
  const { columns = 2, gap = 'md' } = element.props as GridProps;

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
  };

  return (
    <div className={`grid ${colClasses[columns as 1 | 2 | 3 | 4] || colClasses[2]} ${gapClasses[gap || 'md']}`}>
      {children}
    </div>
  );
}
