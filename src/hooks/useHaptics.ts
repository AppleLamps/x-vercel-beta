'use client';

type HapticStyle = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error';

const vibrationPatterns: Record<HapticStyle, number | number[]> = {
    light: 10,
    medium: 20,
    heavy: 30,
    selection: 10,
    success: [10, 50, 20],
    warning: [20, 50, 20],
    error: [30, 50, 30, 50, 30],
};

export const useHaptics = () => {
    const triggerHaptic = (style: HapticStyle = 'light') => {
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            try {
                navigator.vibrate(vibrationPatterns[style]);
            } catch {
                // Silently fail if vibration not supported
            }
        }
    };

    const selectionChanged = () => triggerHaptic('selection');
    const impactOccurred = (style: 'light' | 'medium' | 'heavy' = 'medium') => triggerHaptic(style);
    const notificationOccurred = (type: 'success' | 'warning' | 'error') => triggerHaptic(type);

    return {
        triggerHaptic,
        selectionChanged,
        impactOccurred,
        notificationOccurred,
    };
};
