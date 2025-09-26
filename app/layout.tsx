import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SearchProvider } from '@/context/SearchContext'; // 1. Importe o Provedor
import SearchModal from '@/components/SearchModal';     // 2. Importe o Modal

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
        {/* 3. Envolva tudo com o SearchProvider */}
        <SearchProvider>
          {children}
          <SearchModal /> {/* 4. Renderize o Modal aqui */}
        </SearchProvider>
      </body>
    </html>
  );
}