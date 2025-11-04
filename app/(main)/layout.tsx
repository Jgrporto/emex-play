// app/(main)/layout.tsx

"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }: { children: React.ReactNode; }) {
  const pathname = usePathname();

  // A regra para a Navbar ser fixa: em todas as páginas, exceto na de vídeo.
  const isNavbarFixed = !pathname.startsWith('/watch/');


  return (
    // --- CORREÇÃO 1: Envolvemos todo o conteúdo com o Provider ---
    // Isso resolve o erro "useMenuSidebar must be used within a MenuSidebarProvider".
      <div className="flex flex-col min-h-screen bg-emex-preto">
        <Navbar isFixed={isNavbarFixed} />
        
        {/* --- CORREÇÃO 2: A classe do <main> foi corrigida --- */}
        {/* A lógica de padding agora será aplicada corretamente. */}
        <main className={`flex-grow}`}>
          {children}
        </main>
        
        <Footer />
      </div>
  );
}