import React from 'react';
import { Home, Search, Bell, MessageSquare, Users, User, MoreHorizontal, Feather, Bookmark, Sparkles, Video } from 'lucide-react';
import Image from 'next/image';

const SidebarItem = ({ icon: Icon, text, active, customIcon }: { icon?: any, text: string, active?: boolean, customIcon?: React.ReactNode }) => (
    <div className={`flex items-center space-x-4 p-3 rounded-full hover:bg-black/10 w-fit cursor-pointer transition ${active ? 'font-bold' : ''}`}>
        {customIcon ? customIcon : <Icon className="w-7 h-7" strokeWidth={active ? 2.5 : 2} />}
        <span className="text-xl hidden xl:block pr-4">{text}</span>
    </div>
);

const XPremiumIcon = () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
);

const SuperGrokIcon = () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><g><path d="M2.205 7.423L11.745 21h4.241L6.446 7.423H2.204zm4.237 7.541L2.2 21h4.243l2.12-3.04-2.121-2.996zM16.957 0L9.624 10.518l2.086 2.953L21.2 0h-4.243zm.757 7.218V21H21.7V2.559l-3.986 4.66z"></path></g></svg>
);

const CreatorStudioIcon = () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><g><path d="M3.75 2C3.336 2 3 2.335 3 2.75v18.5c0 .415.336.75.75.75H6V2H3.75zM8 2v20h12.25c.414 0 .75-.335.75-.75V2.75c0-.415-.336-.75-.75-.75H8zm5 6.75c0-.414.336-.75.75-.75h4.5c.414 0 .75.336.75.75s-.336.75-.75.75h-4.5c-.414 0-.75-.336-.75-.75zm0 3.5c0-.414.336-.75.75-.75h4.5c.414 0 .75.336.75.75s-.336.75-.75.75h-4.5c-.414 0-.75-.336-.75-.75zM8.75 12c-.414 0-.75.336-.75.75v4.5c0 .414.336.75.75.75h2.5c.414 0 .75-.336.75-.75v-4.5c0-.414-.336-.75-.75-.75h-2.5z"></path></g></svg>
);

export const Sidebar = () => {
    return (
        <div className="hidden md:flex fixed flex-col items-center xl:items-start h-full p-2 xl:px-4 w-[68px] xl:w-[275px] border-r border-gray-200">
            <div className="p-3 mb-2 rounded-full hover:bg-black/10 w-fit cursor-pointer">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-8 h-8 fill-black"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
            </div>

            <nav className="flex flex-col space-y-0.5">
                <SidebarItem icon={Home} text="Home" active />
                <SidebarItem icon={Search} text="Explore" />
                <SidebarItem icon={Bell} text="Notifications" />
                <SidebarItem icon={MessageSquare} text="Chat" />
                <SidebarItem customIcon={<SuperGrokIcon />} text="SuperGrok" />
                <SidebarItem customIcon={<XPremiumIcon />} text="Premium" />
                <SidebarItem icon={Bookmark} text="Bookmarks" />
                <SidebarItem customIcon={<CreatorStudioIcon />} text="Creator Studio" />
                <SidebarItem icon={Users} text="Communities" />
                <SidebarItem icon={User} text="Profile" />
                <SidebarItem icon={MoreHorizontal} text="More" />
            </nav>

            <button className="bg-black text-white rounded-full p-4 xl:px-8 xl:py-3 font-bold mt-4 shadow-lg hover:bg-opacity-90 transition w-full max-w-[220px] flex justify-center items-center">
                <span className="hidden xl:block">Post</span>
                <Feather className="xl:hidden w-6 h-6" />
            </button>

            <div className="mt-auto mb-4 flex items-center space-x-3 p-3 rounded-full hover:bg-black/10 cursor-pointer w-full">
                <Image
                    src="/profile-x-picture.png"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                />
                <div className="hidden xl:block flex-grow">
                    <div className="flex items-center gap-1">
                        <span className="font-bold">Apple Lamps</span>
                        <svg viewBox="0 0 22 22" className="w-4 h-4 fill-blue-400"><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>
                    </div>
                    <div className="text-gray-500 text-sm">@lamps_apple</div>
                </div>
                <MoreHorizontal className="w-5 h-5 hidden xl:block" />
            </div>
        </div>
    );
};
