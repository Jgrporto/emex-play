"use client";

import { Search, Bell, UserCircle } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full p-4 flex items-center bg-gradient-to-b from-black via-black/80 to-transparent h-24">
      
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center space-x-8">
          <Link href="/" passHref>
            <Image
              src="/emex-logo.png"
              alt="EMEX Play Logo"
              width={150}
              height={50}
              priority
              className="cursor-pointer"
            />
          </Link>
          <nav className="hidden md:flex space-x-8">
            {/* Link para Início */}
            <Link
              href="/"
              className={`text-lg pb-1 transition-colors duration-200 ${
                pathname === '/'
                  ? 'font-semibold text-white border-b-2 border-emex-azul-claro' // ESTADO ATIVO (com azul)
                  : 'text-gray-400 hover:text-white border-b-2 border-transparent' // ESTADO INATIVO
              }`}
            >
              Início
            </Link>

            {/* Link para Treinamentos */}
            <Link
              href="/treinamentos"
              className={`text-lg pb-1 transition-colors duration-200 ${
                pathname === '/treinamentos'
                  ? 'font-semibold text-white border-b-2 border-emex-azul-claro' // ESTADO ATIVO (com azul)
                  : 'text-gray-400 hover:text-white border-b-2 border-transparent' // ESTADO INATIVO
              }`}
            >
              Treinamentos
            </Link>

            
          </nav>
        </div>

        <div className="flex items-center space-x-6">
          <Search className="h-7 w-7 cursor-pointer hover:text-gray-300" />
          <Bell className="h-7 w-7 cursor-pointer hover:text-gray-300" />
          <UserCircle className="h-7 w-7 cursor-pointer hover:text-gray-300" />
        </div>
      </div>
    </header>
  );
}