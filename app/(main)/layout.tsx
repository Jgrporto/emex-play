// app/(main)/layout.tsx

"use client"; // 1. Marcamos o layout como um Componente de Cliente

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from 'next/navigation'; // 2. Importamos o usePathname

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isWatchPage = pathname.startsWith('/watch/');

  return (
    <div className="flex flex-col min-h-screen bg-emex-preto">
      <Navbar />
      {/* 3. Adicionamos o padding-top condicionalmente */}
      <main className={`flex-grow ${!isWatchPage ? 'pt-24' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}