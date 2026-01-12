import React from 'react';

interface WebsiteContainerProps {
    url: string;
}

export const WebsiteContainer = ({ url }: WebsiteContainerProps) => {
    return (
        <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            {/* Simulation of a website preview card which becomes interactive */}
            <div className="w-full relative group">
                <iframe
                    src={url}
                    className="w-full h-[620px] border-none"
                    title="Embedded Website"
                    style={{ display: 'block' }}
                />
                {/* Optional: Add an overlay if you wanted click-to-activate, but user asked for scrolling while scrolling, 
             so direct interaction is implied. We might need pointer-events handling if it captures scroll too aggressively.
             For now, native iframe behavior is what's requested. 
         */}
            </div>
            <div className="bg-gray-50 p-3 text-sm hover:bg-gray-100 transition cursor-pointer border-t border-gray-200">
                <div className="text-gray-500 text-xs">spacex.com/lunar</div>
                <div className="text-black font-normal">SpaceX Lunar Voyager — Civilian Flights Around the Moon</div>
                <div className="text-gray-500 text-xs line-clamp-2">The first civilian mission around the Moon. Reserve your seat aboard Starship.</div>
            </div>
        </div>
    );
};
