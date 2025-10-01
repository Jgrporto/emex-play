// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SearchProvider } from '@/context/SearchContext';
import SearchModal from '@/components/SearchModal';
import AuthProvider from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EMEX Play',
  description: 'Plataforma de treinamentos da EMEX',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <SearchProvider>
            {/* Navbar e Footer foram removidos daqui */}
            {children}
            <SearchModal />
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
}