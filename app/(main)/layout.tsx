// app/(main)/layout.tsx

"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from 'next/navigation';
import { FavoritesProvider } from '@/context/FavoritesContext'; // 1. Importe o FavoritesProvider

export default function MainLayout({ children }: { children: React.ReactNode; }) {
  const pathname = usePathname();

  const isNavbarFixed = !pathname.startsWith('/watch/');
  // Lógica de padding restaurada

  return (
    // 2. Envolva o layout com o FavoritesProvider
    // Ele funcionará pois o SessionProvider está no layout raiz (Passo 1)
    <FavoritesProvider>
      <div className="flex flex-col min-h-screen bg-emex-preto">
        <Navbar isFixed={isNavbarFixed} />
        
        {/* 3. Classe do <main> corrigida com a lógica de padding */}
        <main>
          {children}
        </main>
        
        <Footer />
      </div>
    </FavoritesProvider>
  );
}