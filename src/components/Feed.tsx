import React from 'react';
import { Post } from './Post';
import { Image as ImageIcon, Smile, Calendar, MapPin, List, Link2, Circle } from 'lucide-react';
import Image from 'next/image';

export const Feed = () => {
    return (
        <div className="flex-grow border-r border-gray-200 max-w-[680px] min-h-screen">
            <div className="sticky top-12 md:top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-200">
                <h1 className="hidden md:block px-4 py-3 font-bold text-xl">Home</h1>
                <div className="flex w-full cursor-pointer overflow-x-auto scrollbar-hide">
                    <div className="flex-1 min-w-fit text-center py-4 font-bold border-b-4 border-blue-500 hover:bg-gray-100 transition px-4 whitespace-nowrap">For you</div>
                    <div className="flex-1 min-w-fit text-center py-4 text-gray-500 hover:bg-gray-100 transition px-4 whitespace-nowrap">Following</div>
                    <div className="flex-1 min-w-fit text-center py-4 text-gray-500 hover:bg-gray-100 transition px-4 whitespace-nowrap md:hidden">Subscribed</div>
                    <div className="flex-1 min-w-fit text-center py-4 text-gray-500 hover:bg-gray-100 transition px-4 whitespace-nowrap md:hidden">X Premium</div>
                </div>
            </div>

            <div className="p-4 border-b border-gray-200 flex space-x-3 pb-2">
                <Image
                    src="/profile-x-picture.png"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                />
                <div className="flex-grow pt-2">
                    <input
                        type="text"
                        placeholder="What's happening?"
                        className="bg-transparent text-xl placeholder-gray-500 text-black outline-none w-full mb-3"
                    />
                    <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                        <div className="flex space-x-0.5 text-blue-500">
                            <div className="p-2 rounded-full hover:bg-blue-500/10 cursor-pointer transition">
                                <ImageIcon className="w-5 h-5" />
                            </div>
                            <div className="p-2 rounded-full hover:bg-blue-500/10 cursor-pointer transition">
                                <div className="w-5 h-5 font-bold text-[11px] border border-blue-500 rounded flex items-center justify-center">GIF</div>
                            </div>
                            <div className="p-2 rounded-full hover:bg-blue-500/10 cursor-pointer transition">
                                <Link2 className="w-5 h-5" />
                            </div>
                            <div className="p-2 rounded-full hover:bg-blue-500/10 cursor-pointer transition">
                                <List className="w-5 h-5" />
                            </div>
                            <div className="p-2 rounded-full hover:bg-blue-500/10 cursor-pointer transition">
                                <Smile className="w-5 h-5" />
                            </div>
                            <div className="p-2 rounded-full hover:bg-blue-500/10 cursor-pointer transition">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><g><path d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.12 20 5.5v13c0 1.38-1.12 2.5-2.5 2.5h-11C5.12 21 4 19.88 4 18.5v-13C4 4.12 5.12 3 6.5 3H6zm0 2h-.5c-.27 0-.5.22-.5.5v13c0 .28.23.5.5.5h11c.28 0 .5-.22.5-.5v-13c0-.28-.22-.5-.5-.5H18v1h-2V5H8v1H6V5zm10 7H8v2h8v-2z"></path></g></svg>
                            </div>
                            <div className="p-2 rounded-full hover:bg-blue-500/10 cursor-pointer transition opacity-50">
                                <MapPin className="w-5 h-5" />
                            </div>
                        </div>
                        <button className="bg-blue-400 text-white font-bold py-1.5 px-4 rounded-full transition opacity-50 cursor-not-allowed">Post</button>
                    </div>
                </div>
            </div>

            <Post
                displayName="Apple Lamps"
                username="lamps_apple"
                avatar=""
                avatarImage="/profile-x-picture.png"
                time="4h"
                content="X now lets you host entire websites inside your posts. This changes everything. Check out SpaceX's new lunar mission announcement 👇"
                websiteUrl="/embedded-site"
                verified={true}
                stats={{ comments: 8420, reposts: 24500, likes: 142000, views: "12.8M", bookmarks: 18700 }}
            />

            <Post
                displayName="Elon Musk"
                username="elonmusk"
                avatarImage="/elon-x-pic.png"
                avatar=""
                time="1h"
                content="This new feature is going to change how we consume content on the internet. Static sites right in your feed."
                verified={true}
                stats={{ comments: 5400, reposts: 12000, likes: 85000, views: "4.2M" }}
            />

            <Post
                displayName="Vercel"
                username="vercel"
                avatarImage="/vercel-profile-pic.png"
                avatar=""
                squareAvatar={true}
                time="Jan 9"
                content="Stop over-engineering your context."
                verified={true}
                verifiedColor="yellow"
                stats={{ comments: 120, reposts: 450, likes: 2100, views: "105K" }}
            />

            <Post
                displayName="Guillermo Rauch"
                username="rauchg"
                avatarImage="/ceo-profile-pic.png"
                avatar=""
                time="2h"
                content="LLMs have been extensively trained in how to use filesystems. Even if you're not making a coding agent, it turns out that's the most effective and natural way to manage your context."
                verified={true}
                stats={{ comments: 89, reposts: 312, likes: 1847, views: "82K" }}
            />

        </div>
    );
};
