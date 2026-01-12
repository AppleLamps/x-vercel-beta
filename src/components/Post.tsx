import React from 'react';
import { MessageCircle, Repeat, Heart, BarChart2, Share, MoreHorizontal, Bookmark, Upload } from 'lucide-react';
import { WebsiteContainer } from './WebsiteContainer';
import Image from 'next/image';

const VerifiedBadge = ({ color = 'blue' }: { color?: 'blue' | 'yellow' | 'gold' }) => {
    const colorClass = color === 'yellow' || color === 'gold' ? 'fill-yellow-500' : 'fill-blue-400';
    return (
        <svg viewBox="0 0 22 22" className={`w-4 h-4 ${colorClass} flex-shrink-0`}><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>
    );
};

const AffiliateBadge = ({ label }: { label: string }) => (
    <span className="bg-gray-100 text-gray-500 text-xs px-1.5 py-0.5 rounded ml-1">{label}</span>
);

const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
};

interface PostProps {
    displayName: string;
    username: string;
    avatar: string;
    avatarImage?: string;
    squareAvatar?: boolean;
    time: string;
    content: string;
    websiteUrl?: string;
    verified?: boolean;
    verifiedColor?: 'blue' | 'yellow' | 'gold';
    affiliateLabel?: string;
    stats: {
        comments: number;
        reposts: number;
        likes: number;
        views: string;
        bookmarks?: number;
    };
}

export const Post = ({ displayName, username, avatar, avatarImage, squareAvatar = false, time, content, websiteUrl, verified = false, verifiedColor = 'blue', affiliateLabel, stats }: PostProps) => {
    return (
        <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition cursor-pointer">
            <div className="flex space-x-3">
                {avatarImage ? (
                    <Image
                        src={avatarImage}
                        alt={displayName}
                        width={40}
                        height={40}
                        className={`w-10 h-10 flex-shrink-0 object-cover ${squareAvatar ? 'rounded-md' : 'rounded-full'}`}
                    />
                ) : (
                    <div className={`w-10 h-10 flex-shrink-0 ${squareAvatar ? 'rounded-md' : 'rounded-full'} ${avatar}`}></div>
                )}
                <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 truncate">
                            <span className="font-bold text-black hover:underline">{displayName}</span>
                            {verified && <VerifiedBadge color={verifiedColor} />}
                            {affiliateLabel && <AffiliateBadge label={affiliateLabel} />}
                            <span className="text-gray-500">@{username}</span>
                            <span className="text-gray-500">·</span>
                            <span className="text-gray-500 hover:underline">{time}</span>
                        </div>
                        <div className="text-gray-500 hover:text-blue-400 rounded-full p-2 hover:bg-blue-400/10 transition">
                            <MoreHorizontal className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="text-[15px] whitespace-pre-wrap mb-2 text-black">
                        {content}
                    </div>

                    {websiteUrl && <WebsiteContainer url={websiteUrl} />}

                    <div className="flex justify-between mt-3 max-w-md text-gray-500">
                        <div className="flex items-center group cursor-pointer hover:text-blue-400">
                            <div className="p-2 rounded-full group-hover:bg-blue-400/10 transition">
                                <MessageCircle className="w-[18px] h-[18px]" />
                            </div>
                            <span className="text-[13px]">{formatNumber(stats.comments)}</span>
                        </div>
                        <div className="flex items-center group cursor-pointer hover:text-green-500">
                            <div className="p-2 rounded-full group-hover:bg-green-500/10 transition">
                                <Repeat className="w-[18px] h-[18px]" />
                            </div>
                            <span className="text-[13px]">{formatNumber(stats.reposts)}</span>
                        </div>
                        <div className="flex items-center group cursor-pointer hover:text-pink-600">
                            <div className="p-2 rounded-full group-hover:bg-pink-600/10 transition">
                                <Heart className="w-[18px] h-[18px]" />
                            </div>
                            <span className="text-[13px]">{formatNumber(stats.likes)}</span>
                        </div>
                        <div className="flex items-center group cursor-pointer hover:text-blue-400">
                            <div className="p-2 rounded-full group-hover:bg-blue-400/10 transition">
                                <BarChart2 className="w-[18px] h-[18px]" />
                            </div>
                            <span className="text-[13px]">{stats.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="flex items-center group cursor-pointer hover:text-blue-400">
                                <div className="p-2 rounded-full group-hover:bg-blue-400/10 transition">
                                    <Bookmark className="w-[18px] h-[18px]" />
                                </div>
                                {stats.bookmarks && <span className="text-[13px]">{formatNumber(stats.bookmarks)}</span>}
                            </div>
                            <div className="flex items-center group cursor-pointer hover:text-blue-400">
                                <div className="p-2 rounded-full group-hover:bg-blue-400/10 transition">
                                    <Upload className="w-[18px] h-[18px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
