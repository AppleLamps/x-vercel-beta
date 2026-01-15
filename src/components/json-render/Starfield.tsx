'use client';

import type { ComponentRenderProps } from '@json-render/react';

interface StarfieldProps {
  density?: 'sparse' | 'medium' | 'dense' | null;
  height?: 'sm' | 'md' | 'lg' | 'full' | null;
}

export function Starfield({ element, children }: ComponentRenderProps) {
  const { density = 'medium', height = 'md' } = element.props as StarfieldProps;

  const heightClasses = {
    sm: 'min-h-[200px]',
    md: 'min-h-[400px]',
    lg: 'min-h-[600px]',
    full: 'min-h-screen',
  };

  const starPatterns = {
    sparse: `radial-gradient(1px 1px at 20px 30px, white, transparent),
             radial-gradient(1px 1px at 90px 40px, white, transparent),
             radial-gradient(1px 1px at 160px 120px, white, transparent),
             radial-gradient(1px 1px at 200px 80px, rgba(255,255,255,0.6), transparent)`,
    medium: `radial-gradient(1px 1px at 20px 30px, white, transparent),
             radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
             radial-gradient(1px 1px at 90px 40px, white, transparent),
             radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent),
             radial-gradient(1.5px 1.5px at 200px 50px, white, transparent),
             radial-gradient(1px 1px at 250px 100px, rgba(255,255,255,0.5), transparent)`,
    dense: `radial-gradient(1px 1px at 20px 30px, white, transparent),
            radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 90px 40px, white, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 160px 120px, white, transparent),
            radial-gradient(1.5px 1.5px at 200px 50px, white, transparent),
            radial-gradient(1px 1px at 220px 130px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 280px 90px, rgba(255,255,255,0.8), transparent)`,
  };

  return (
    <div className={`relative ${heightClasses[height || 'md']} bg-black overflow-hidden`}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: starPatterns[density || 'medium'],
          backgroundSize: '300px 200px',
        }}
      />
      <div className="relative z-10 p-8">{children}</div>
    </div>
  );
}
