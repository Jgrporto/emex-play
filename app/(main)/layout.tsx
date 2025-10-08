// app/(main)/layout.tsx

"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from 'next/navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Lista de páginas que têm um banner full-bleed e NÃO devem ter padding no topo.
  const fullBleedPages = ['/', '/treinamentos'];

  // A página de vídeo não tem navbar fixa, então também não precisa de padding.
  const isWatchPage = pathname.startsWith('/watch/');

  // A condição agora é: só adiciona padding se a página NÃO for full-bleed E NÃO for a de vídeo.
  const needsTopPadding = !fullBleedPages.includes(pathname) && !isWatchPage;

  return (
    <div className="flex flex-col min-h-screen bg-emex-preto">
      <Navbar />
      {/* A classe 'pt-24' agora é aplicada condicionalmente */}
      <main className={`flex-grow ${needsTopPadding ? 'pt-24' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}