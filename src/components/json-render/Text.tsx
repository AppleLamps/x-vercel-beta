'use client';

import type { ComponentRenderProps } from '@json-render/react';

interface TextProps {
  content: string;
  variant?: 'body' | 'lead' | 'caption' | 'muted' | null;
  maxWidth?: 'sm' | 'md' | 'lg' | 'full' | null;
}

export function Text({ element }: ComponentRenderProps) {
  const { content, variant = 'body', maxWidth } = element.props as TextProps;

  const variantClasses = {
    body: 'text-gray-300 text-base',
    lead: 'text-gray-300 text-lg sm:text-xl leading-relaxed',
    caption: 'text-gray-500 text-sm',
    muted: 'text-gray-600 text-base',
  };

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    full: 'max-w-full',
  };

  return (
    <p className={`${variantClasses[variant || 'body']} ${maxWidth ? maxWidthClasses[maxWidth] : ''}`}>
      {content}
    </p>
  );
}
