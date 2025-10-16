// app/(main)/layout.tsx

"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }: { children: React.ReactNode; }) {
  const pathname = usePathname();

  // A regra para a Navbar ser fixa continua a mesma: em todas as páginas, exceto na de vídeo.
  const isNavbarFixed = !pathname.startsWith('/watch/');

  // NOVA REGRA PARA O PADDING:
  // O padding só é necessário se a Navbar for fixa E a página NÃO for a inicial.

  return (
    <div className="flex flex-col min-h-screen bg-emex-preto">
      <Navbar isFixed={isNavbarFixed} />
      
      {/* O padding 'pt-24' agora respeita a nova regra, deixando a home page sem padding */}
      <main className={`flex-grow: ''}`}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
}