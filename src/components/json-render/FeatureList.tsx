'use client';

import type { ComponentRenderProps } from '@json-render/react';

interface FeatureListProps {
  items: Array<{ text: string; included?: boolean | null }>;
}

export function FeatureList({ element }: ComponentRenderProps) {
  const { items } = element.props as FeatureListProps;

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-3">
          {item.included !== false ? (
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
          <span className={item.included !== false ? 'text-gray-300' : 'text-gray-600 line-through'}>
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
