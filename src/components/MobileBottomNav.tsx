'use client';

import React from 'react';
import { Home, Search, Bell, Mail, Feather } from 'lucide-react';
import { useHaptics } from '@/hooks/useHaptics';

const GrokIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 landscape:w-5 landscape:h-5 fill-current"><g><path d="M2.205 7.423L11.745 21h4.241L6.446 7.423H2.204zm4.237 7.541L2.2 21h4.243l2.12-3.04-2.121-2.996zM16.957 0L9.624 10.518l2.086 2.953L21.2 0h-4.243zm.757 7.218V21H21.7V2.559l-3.986 4.66z"></path></g></svg>
);

const NavButton = ({
    children,
    active = false,
    badge,
    label,
    onPress
}: {
    children: React.ReactNode;
    active?: boolean;
    badge?: number;
    label: string;
    onPress?: () => void;
}) => (
    <button
        className="touch-target flex items-center justify-center active:bg-gray-200 rounded-full transition-colors relative touch-manipulation no-context-menu"
        aria-label={label}
        onClick={onPress}
    >
        <span className={active ? 'text-black' : 'text-gray-700'}>
            {children}
        </span>
        {badge !== undefined && badge > 0 && (
            <span
                className="absolute -top-1 -right-1 bg-blue-500 text-white text-[11px] font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1"
                aria-label={`${badge} notifications`}
            >
                {badge > 99 ? '99+' : badge}
            </span>
        )}
    </button>
);

export const MobileBottomNav = () => {
    const { impactOccurred } = useHaptics();

    const handleNavPress = () => {
        impactOccurred('light');
    };

    const handleFabPress = () => {
        impactOccurred('medium');
    };

    return (
        <>
            {/* Floating Action Button - thumb zone optimized with landscape support */}
            <button
                className="md:hidden fixed right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg z-30
                    active:bg-blue-600 active:scale-95 transition-all duration-150
                    touch-target touch-manipulation no-context-menu
                    landscape:p-3 landscape:right-3"
                style={{ bottom: 'calc(70px + env(safe-area-inset-bottom, 0px) + 8px)' }}
                aria-label="Create new post"
                onClick={handleFabPress}
            >
                <Feather className="w-6 h-6 landscape:w-5 landscape:h-5" />
            </button>

            {/* Bottom Navigation - compact in landscape */}
            <nav
                className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 z-20 landscape-safe"
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="flex justify-around items-center py-2 px-2 landscape:py-1">
                    <NavButton active label="Home" onPress={handleNavPress}>
                        <Home className="w-[26px] h-[26px] landscape:w-[22px] landscape:h-[22px]" strokeWidth={2.5} />
                    </NavButton>
                    <NavButton label="Search" onPress={handleNavPress}>
                        <Search className="w-[26px] h-[26px] landscape:w-[22px] landscape:h-[22px]" />
                    </NavButton>
                    <NavButton label="Grok AI" onPress={handleNavPress}>
                        <GrokIcon />
                    </NavButton>
                    <NavButton badge={8} label="Notifications" onPress={handleNavPress}>
                        <Bell className="w-[26px] h-[26px] landscape:w-[22px] landscape:h-[22px]" />
                    </NavButton>
                    <NavButton badge={9} label="Messages" onPress={handleNavPress}>
                        <Mail className="w-[26px] h-[26px] landscape:w-[22px] landscape:h-[22px]" />
                    </NavButton>
                </div>
                {/* Safe area spacer for home indicator */}
                <div className="safe-bottom landscape:pb-0" />
            </nav>
        </>
    );
};
