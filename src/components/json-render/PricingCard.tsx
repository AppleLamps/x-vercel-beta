'use client';

import type { ComponentRenderProps } from '@json-render/react';
import { useActions } from '@json-render/react';

interface PricingCardProps {
  price: string;
  currency?: string | null;
  period?: string | null;
  features: string[];
  ctaLabel?: string | null;
  ctaAction?: string | null;
}

export function PricingCard({ element }: ComponentRenderProps) {
  const { price, currency = 'USD', period, features, ctaLabel, ctaAction } = element.props as PricingCardProps;
  const { execute } = useActions();

  const handleClick = () => {
    if (ctaAction) {
      execute({ name: ctaAction });
    }
  };

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
      <div className="mb-6">
        <div className="text-gray-500 text-sm">{currency}</div>
        <div className="text-4xl font-light text-white">{price}</div>
        {period && <div className="text-gray-500 text-sm">{period}</div>}
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-300">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {ctaLabel && (
        <button
          onClick={handleClick}
          className="w-full bg-white text-black py-3 rounded-md font-medium tracking-wider uppercase hover:bg-gray-100 transition"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
