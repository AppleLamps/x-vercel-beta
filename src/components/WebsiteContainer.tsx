import React from 'react';

interface WebsiteContainerProps {
    url: string;
}

export const WebsiteContainer = ({ url }: WebsiteContainerProps) => {
    return (
        <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            <div className="w-full relative group">
                <iframe
                    src={url}
                    className="w-full border-none h-[350px] sm:h-[420px] md:h-[520px] landscape:h-[250px]"
                    title="Embedded Website"
                    style={{ display: 'block' }}
                    loading="lazy"
                />
            </div>
            <div className="bg-gray-50 p-3 text-sm hover:bg-gray-100 active:bg-gray-100 transition cursor-pointer border-t border-gray-200 touch-manipulation">
                <div className="text-gray-500 text-xs truncate">spacex.com/lunar</div>
                <div className="text-black font-normal line-clamp-1">SpaceX Lunar Voyager — Civilian Flights Around the Moon</div>
                <div className="text-gray-500 text-xs line-clamp-2">The first civilian mission around the Moon. Reserve your seat aboard Starship.</div>
            </div>
        </div>
    );
};
