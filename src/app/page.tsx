import { Sidebar } from '@/components/Sidebar';
import { Feed } from '@/components/Feed';
import { RightSidebar } from '@/components/RightSidebar';
import { MobileHeader } from '@/components/MobileHeader';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { Feather, Mail } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex justify-center min-h-screen min-h-dvh bg-white text-black">
      <MobileHeader />
      <div className="flex w-full max-w-[1265px]">
        <header className="flex-shrink-0">
          <Sidebar />
        </header>
        {/* Main content area - uses mobile-content-area class for safe area padding on mobile only */}
        <main className="flex-grow flex justify-center ml-0 md:ml-[68px] xl:ml-[275px] mobile-content-area md:pt-0 md:pb-0">
          <Feed />
          <RightSidebar />
        </main>
      </div>
      <MobileBottomNav />

      {/* Floating action buttons - desktop only */}
      <div className="hidden lg:flex fixed bottom-6 right-6 flex-col gap-3 z-50">
        <button
          className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition"
          aria-label="Compose"
        >
          <Feather className="w-6 h-6 text-white" />
        </button>
        <button
          className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition"
          aria-label="Messages"
        >
          <Mail className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
