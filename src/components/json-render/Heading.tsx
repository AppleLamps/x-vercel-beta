'use client';

import type { ComponentRenderProps } from '@json-render/react';

interface HeadingProps {
  text: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | null;
  light?: boolean | null;
}

export function Heading({ element }: ComponentRenderProps) {
  const { text, level = 'h2', light = false } = element.props as HeadingProps;

  const levelClasses = {
    h1: 'text-4xl sm:text-5xl',
    h2: 'text-3xl sm:text-4xl',
    h3: 'text-2xl sm:text-3xl',
    h4: 'text-xl sm:text-2xl',
  };

  const Tag = level || 'h2';

  return (
    <Tag className={`${levelClasses[level || 'h2']} font-light ${light ? 'text-gray-400' : 'text-white'}`}>
      {text}
    </Tag>
  );
}
