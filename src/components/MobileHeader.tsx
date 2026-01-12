import React from 'react';
import Image from 'next/image';

export const MobileHeader = () => {
    return (
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-20 border-b border-gray-200">
            <div className="flex items-center justify-between px-4 py-2">
                <Image
                    src="/profile-x-picture.png"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover cursor-pointer"
                />
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-7 h-7 fill-black">
                    <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
                </svg>
                <div className="w-8 h-8" /> {/* Spacer for centering */}
            </div>
        </div>
    );
};
