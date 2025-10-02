// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SearchProvider } from '@/context/SearchContext';
import SearchModal from '@/components/SearchModal';
import AuthProvider from '@/components/AuthProvider';
import { ProfileSidebarProvider } from '@/context/ProfileSidebarContext'; // Importe o provedor
import ProfileSidebar from '@/components/ProfileSidebar'; // Importe a barra lateral

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EMEX Play',
  description: 'Plataforma de treinamentos da EMEX',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <SearchProvider>
            {/* Envolvemos com o novo provedor */}
            <ProfileSidebarProvider>
              <main>
                {children}
              </main>
              <SearchModal />
              <ProfileSidebar /> {/* Renderizamos a barra lateral aqui */}
            </ProfileSidebarProvider>
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
}