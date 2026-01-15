'use client';

import type { ComponentRenderProps } from '@json-render/react';

interface VehicleSpecProps {
  name: string;
  specs: Array<{ label: string; value: string }>;
}

export function VehicleSpec({ element }: ComponentRenderProps) {
  const { name, specs } = element.props as VehicleSpecProps;

  return (
    <div className="py-4">
      <h4 className="text-white text-lg font-light mb-4">{name}</h4>
      <div className="space-y-3">
        {specs.map((spec, index) => (
          <div key={index} className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-gray-400 text-sm">{spec.label}</span>
            <span className="text-white font-light">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
