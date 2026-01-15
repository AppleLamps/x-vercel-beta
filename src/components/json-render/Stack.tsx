'use client';

import type { ComponentRenderProps } from '@json-render/react';

interface StackProps {
  direction?: 'horizontal' | 'vertical' | null;
  gap?: 'sm' | 'md' | 'lg' | 'xl' | null;
  align?: 'start' | 'center' | 'end' | 'stretch' | null;
  justify?: 'start' | 'center' | 'end' | 'between' | null;
}

export function Stack({ element, children }: ComponentRenderProps) {
  const { direction = 'vertical', gap = 'md', align, justify } = element.props as StackProps;

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div
      className={`flex ${direction === 'horizontal' ? 'flex-row' : 'flex-col'} ${gapClasses[gap || 'md']} ${align ? alignClasses[align] : ''} ${justify ? justifyClasses[justify] : ''}`}
    >
      {children}
    </div>
  );
}
