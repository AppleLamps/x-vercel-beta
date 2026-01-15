'use client';

import type { ComponentRenderProps } from '@json-render/react';

interface SectionLabelProps {
  text: string;
}

export function SectionLabel({ element }: ComponentRenderProps) {
  const { text } = element.props as SectionLabelProps;

  return (
    <span className="text-xs tracking-[0.3em] text-gray-500 uppercase">
      {text}
    </span>
  );
}
