import React from 'react';
import { Search, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

const VerifiedBadge = ({ color = 'blue' }: { color?: 'blue' | 'yellow' }) => {
    const colorClass = color === 'yellow' ? 'fill-yellow-500' : 'fill-blue-400';
    return (
        <svg viewBox="0 0 22 22" className={`w-4 h-4 ${colorClass} flex-shrink-0`}><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>
    );
};

export const RightSidebar = () => {
    return (
        <div className="hidden lg:block w-[350px] pl-8 py-2 sticky top-0 h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white pb-3 z-10">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-gray-100 rounded-full py-2.5 pl-10 pr-4 outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 text-black placeholder-gray-500"
                    />
                </div>
            </div>

            {/* Live on X */}
            <div className="border border-gray-200 rounded-2xl mt-3">
                <h2 className="font-bold text-xl px-4 py-3">Live on X</h2>
                {[
                    { name: "SpaceX", handle: "SpaceX", desc: "Starship Flight Test 8 Pre-Launch Briefing", viewers: "+48.2K", color: "bg-black" },
                    { name: "Lex Fridman", handle: "lexfridman", desc: "Interview with Elon Musk on Mars Colony Plans", viewers: "+22.1K", color: "bg-purple-600" },
                    { name: "NASA", handle: "NASA", desc: "Artemis III Mission Update Live", viewers: "+15.8K", color: "bg-blue-600" },
                ].map((item, i) => (
                    <div key={i} className="hover:bg-gray-50 px-4 py-3 cursor-pointer transition">
                        <div className="flex items-center gap-1 text-[15px]">
                            <span className="font-bold">{item.name}</span>
                            <VerifiedBadge />
                            <span className="text-gray-500">is hosting</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <div className="text-[15px] text-black pr-3">{item.desc}</div>
                            <div className="relative flex-shrink-0">
                                <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white font-bold text-sm`}>
                                    {item.name.charAt(0)}
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-pink-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                    {item.viewers}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="px-4 py-3 text-blue-500 text-[15px] cursor-pointer hover:bg-gray-50 rounded-b-2xl">Show more</div>
            </div>

            {/* You might like */}
            <div className="border border-gray-200 rounded-2xl mt-4">
                <h2 className="font-bold text-xl px-4 py-3">You might like</h2>
                {[
                    { name: "SpaceX", handle: "SpaceX", avatar: "bg-black", letter: "S", verified: true },
                    { name: "Tailwind CSS", handle: "tailwindcss", avatar: "bg-sky-500", letter: "T", verified: true },
                    { name: "Vercel", handle: "vercel", avatar: "bg-black", letter: "▲", verified: true, verifiedColor: "yellow" as const },
                ].map((item, i) => (
                    <div key={i} className="hover:bg-gray-50 px-4 py-3 cursor-pointer transition">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 ${item.avatar} rounded-full flex items-center justify-center text-white font-bold`}>
                                    {item.letter}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-[15px] hover:underline">{item.name}</span>
                                        {item.verified && <VerifiedBadge color={item.verifiedColor || 'blue'} />}
                                    </div>
                                    <div className="text-gray-500 text-[13px]">@{item.handle}</div>
                                </div>
                            </div>
                            <button className="bg-black text-white font-bold text-sm py-1.5 px-4 rounded-full hover:bg-gray-800 transition">Follow</button>
                        </div>
                    </div>
                ))}
                <div className="px-4 py-3 text-blue-500 text-[15px] cursor-pointer hover:bg-gray-50 rounded-b-2xl">Show more</div>
            </div>

            {/* What's happening */}
            <div className="border border-gray-200 rounded-2xl mt-4">
                <h2 className="font-bold text-xl px-4 py-3">What's happening</h2>
                {[
                    { category: "Space · Trending", topic: "Lunar Voyager", posts: "124K posts" },
                    { category: "Technology · Trending", topic: "X Sites", posts: "89.2K posts" },
                    { category: "Science · Trending", topic: "Starship", posts: "67.4K posts" },
                ].map((item, i) => (
                    <div key={i} className="hover:bg-gray-50 px-4 py-3 cursor-pointer transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-[13px] text-gray-500">{item.category}</div>
                                <div className="font-bold text-[15px]">{item.topic}</div>
                                <div className="text-[13px] text-gray-500">{item.posts}</div>
                            </div>
                            <MoreHorizontal className="w-[18px] h-[18px] text-gray-400 hover:text-blue-500" />
                        </div>
                    </div>
                ))}
                <div className="px-4 py-3 text-blue-500 text-[15px] cursor-pointer hover:bg-gray-50 rounded-b-2xl">Show more</div>
            </div>
        </div>
    );
};
