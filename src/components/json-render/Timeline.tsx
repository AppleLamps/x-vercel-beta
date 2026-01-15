'use client';

import type { ComponentRenderProps } from '@json-render/react';

interface TimelineProps {
  items: Array<{ day: string; title: string; description?: string | null }>;
}

export function Timeline({ element }: ComponentRenderProps) {
  const { items } = element.props as TimelineProps;

  return (
    <div className="py-4">
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0 w-16">
              <div className="text-xs tracking-[0.2em] text-gray-500 uppercase">{item.day}</div>
            </div>
            <div className="flex-grow border-l border-white/20 pl-4">
              <h5 className="text-white font-light">{item.title}</h5>
              {item.description && (
                <p className="text-gray-400 text-sm mt-1">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
