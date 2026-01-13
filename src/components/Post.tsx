import React from 'react';
import { MessageCircle, Repeat, Heart, BarChart2, MoreHorizontal, Bookmark, Upload } from 'lucide-react';
import { WebsiteContainer } from './WebsiteContainer';
import Image from 'next/image';

const VerifiedBadge = ({ color = 'blue' }: { color?: 'blue' | 'yellow' | 'gold' }) => {
    const colorClass = color === 'yellow' || color === 'gold' ? 'fill-yellow-500' : 'fill-blue-400';
    return (
        <svg viewBox="0 0 22 22" className={`w-[18px] h-[18px] ${colorClass} flex-shrink-0`}><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>
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

// Stat button component for consistent touch targets and styling
const StatButton = ({
    icon: Icon,
    count,
    hoverColor,
    label,
    hideCountOnMobile = false
}: {
    icon: React.ComponentType<{ className?: string }>;
    count?: string | number;
    hoverColor: string;
    label: string;
    hideCountOnMobile?: boolean;
}) => {
    const hoverClasses: Record<string, string> = {
        blue: 'hover:text-blue-400 active:text-blue-400',
        green: 'hover:text-green-500 active:text-green-500',
        pink: 'hover:text-pink-600 active:text-pink-600',
    };
    const bgClasses: Record<string, string> = {
        blue: 'group-hover:bg-blue-400/10 group-active:bg-blue-400/10',
        green: 'group-hover:bg-green-500/10 group-active:bg-green-500/10',
        pink: 'group-hover:bg-pink-600/10 group-active:bg-pink-600/10',
    };

    return (
        <button
            className={`flex items-center group cursor-pointer touch-manipulation ${hoverClasses[hoverColor]}`}
            aria-label={`${count || 0} ${label}`}
        >
            <div className={`p-2 rounded-full transition ${bgClasses[hoverColor]}`}>
                <Icon className="w-[18px] h-[18px]" />
            </div>
            {count !== undefined && (
                <span className={`text-[13px] tabular-nums ${hideCountOnMobile ? 'hidden sm:inline' : ''}`}>
                    {typeof count === 'number' ? formatNumber(count) : count}
                </span>
            )}
        </button>
    );
};

export const Post = ({ displayName, username, avatar, avatarImage, squareAvatar = false, time, content, websiteUrl, verified = false, verifiedColor = 'blue', affiliateLabel, stats }: PostProps) => {
    return (
        <article className="border-b border-gray-200 px-4 py-3 active:bg-gray-50 transition cursor-pointer">
            <div className="flex gap-3">
                {avatarImage ? (
                    <Image
                        src={avatarImage}
                        alt=""
                        width={40}
                        height={40}
                        className={`w-10 h-10 flex-shrink-0 object-cover ${squareAvatar ? 'rounded-md' : 'rounded-full'}`}
                    />
                ) : (
                    <div className={`w-10 h-10 flex-shrink-0 ${squareAvatar ? 'rounded-md' : 'rounded-full'} ${avatar}`} aria-hidden="true"></div>
                )}
                <div className="flex-grow min-w-0">
                    {/* Author info row - improved mobile layout */}
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-x-1 min-w-0">
                            <span className="font-bold text-[15px] text-black hover:underline truncate max-w-[150px] sm:max-w-none">{displayName}</span>
                            {verified && <VerifiedBadge color={verifiedColor} />}
                            {affiliateLabel && <AffiliateBadge label={affiliateLabel} />}
                            <span className="text-gray-500 text-[15px] truncate">@{username}</span>
                            <span className="text-gray-500" aria-hidden="true">·</span>
                            <time className="text-gray-500 text-[15px] hover:underline whitespace-nowrap">{time}</time>
                        </div>
                        <button
                            className="text-gray-500 hover:text-blue-400 active:text-blue-400 rounded-full p-2 hover:bg-blue-400/10 active:bg-blue-400/10 transition flex-shrink-0 -mt-1 -mr-2"
                            aria-label="More options"
                        >
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Post content */}
                    <div className="text-[15px] leading-normal whitespace-pre-wrap mb-2 text-black break-words">
                        {content}
                    </div>

                    {websiteUrl && <WebsiteContainer url={websiteUrl} />}

                    {/* Stats row - responsive for narrow screens */}
                    <div className="flex items-center justify-between mt-3 text-gray-500 -ml-2 gap-1">
                        <StatButton icon={MessageCircle} count={stats.comments} hoverColor="blue" label="replies" />
                        <StatButton icon={Repeat} count={stats.reposts} hoverColor="green" label="reposts" />
                        <StatButton icon={Heart} count={stats.likes} hoverColor="pink" label="likes" />
                        <div className="max-xs:hidden">
                            <StatButton icon={BarChart2} count={stats.views} hoverColor="blue" label="views" />
                        </div>
                        <div className="flex items-center">
                            <StatButton icon={Bookmark} count={stats.bookmarks} hoverColor="blue" label="bookmarks" hideCountOnMobile />
                            <button
                                className="p-2 rounded-full hover:bg-blue-400/10 active:bg-blue-400/10 hover:text-blue-400 active:text-blue-400 transition touch-manipulation"
                                aria-label="Share"
                            >
                                <Upload className="w-[18px] h-[18px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};
