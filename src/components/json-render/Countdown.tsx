'use client';

import { useState, useEffect } from 'react';
import type { ComponentRenderProps } from '@json-render/react';

interface CountdownProps {
  targetDate: string;
  label?: string | null;
  showDays?: boolean | null;
  showHours?: boolean | null;
}

export function Countdown({ element }: ComponentRenderProps) {
  const { targetDate, label, showDays = true, showHours = true } = element.props as CountdownProps;
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBlock = ({ value, unit }: { value: number; unit: string }) => (
    <div className="text-center">
      <div className="text-4xl font-light text-white tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xs tracking-[0.2em] text-gray-500 uppercase mt-1">{unit}</div>
    </div>
  );

  return (
    <div className="py-6">
      {label && (
        <div className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-4 text-center">
          {label}
        </div>
      )}
      <div className="flex justify-center gap-6">
        {showDays && <TimeBlock value={timeLeft.days} unit="Days" />}
        {showHours && <TimeBlock value={timeLeft.hours} unit="Hours" />}
        <TimeBlock value={timeLeft.minutes} unit="Min" />
        <TimeBlock value={timeLeft.seconds} unit="Sec" />
      </div>
    </div>
  );
}
