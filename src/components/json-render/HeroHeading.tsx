'use client';

import type { ComponentRenderProps } from '@json-render/react';

interface HeroHeadingProps {
  line1: string;
  line2?: string | null;
  emphasis?: 'line1' | 'line2' | null;
}

export function HeroHeading({ element }: ComponentRenderProps) {
  const { line1, line2, emphasis = 'line2' } = element.props as HeroHeadingProps;

  const emphasisLine = emphasis || 'line2';

  return (
    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight">
      <span className={emphasisLine === 'line1' ? 'text-white' : 'text-gray-500'}>
        {line1}
      </span>
      {line2 && (
        <>
          <br />
          <span className={emphasisLine === 'line2' ? 'text-white' : 'text-gray-500'}>
            {line2}
          </span>
        </>
      )}
    </h1>
  );
}
