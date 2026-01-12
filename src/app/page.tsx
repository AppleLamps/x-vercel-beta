import { Sidebar } from '@/components/Sidebar';
import { Feed } from '@/components/Feed';
import { RightSidebar } from '@/components/RightSidebar';
import { MobileHeader } from '@/components/MobileHeader';
import { MobileBottomNav } from '@/components/MobileBottomNav';

export default function Home() {
  return (
    <div className="flex justify-center min-h-screen bg-white text-black">
      <MobileHeader />
      <div className="flex w-full max-w-[1265px]">
        <header className="flex-shrink-0">
          <Sidebar />
        </header>
        <main className="flex-grow flex justify-center ml-0 md:ml-[68px] xl:ml-[275px] pt-12 md:pt-0 pb-16 md:pb-0">
          <Feed />
          <RightSidebar />
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
