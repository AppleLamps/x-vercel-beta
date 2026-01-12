import { Sidebar } from '@/components/Sidebar';
import { Feed } from '@/components/Feed';
import { RightSidebar } from '@/components/RightSidebar';

export default function Home() {
  return (
    <div className="flex justify-center min-h-screen bg-white text-black">
      <div className="flex w-full max-w-[1265px]">
        <header className="flex-shrink-0">
          <Sidebar />
        </header>
        <main className="flex-grow flex justify-center ml-[68px] xl:ml-[275px]">
          <Feed />
          <RightSidebar />
        </main>
      </div>
    </div>
  );
}
