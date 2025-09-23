import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // <--- ESSA LINHA É ESSENCIAL!

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Emex Play', // Você pode customizar o título aqui
  description: 'Plataforma de treinamentos da EMEX', // E a descrição
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}