import React from 'react';
import { Home, Search, Bell, Mail, Feather } from 'lucide-react';

const GrokIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><g><path d="M2.205 7.423L11.745 21h4.241L6.446 7.423H2.204zm4.237 7.541L2.2 21h4.243l2.12-3.04-2.121-2.996zM16.957 0L9.624 10.518l2.086 2.953L21.2 0h-4.243zm.757 7.218V21H21.7V2.559l-3.986 4.66z"></path></g></svg>
);

export const MobileBottomNav = () => {
    return (
        <>
            {/* Floating Action Button */}
            <button className="md:hidden fixed bottom-20 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg z-30 hover:bg-blue-600 transition">
                <Feather className="w-6 h-6" />
            </button>

            {/* Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
                <div className="flex justify-around items-center py-3">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition">
                        <Home className="w-6 h-6" strokeWidth={2.5} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition">
                        <Search className="w-6 h-6" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition">
                        <GrokIcon />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition relative">
                        <Bell className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">8</span>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition relative">
                        <Mail className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">9</span>
                    </button>
                </div>
            </nav>
        </>
    );
};
