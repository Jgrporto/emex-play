"use client";

import { Search, Bell, LogIn, UserCircle } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSearch } from '@/context/SearchContext';
import { useSession, signIn } from "next-auth/react";
import { useProfileSidebar } from '@/context/ProfileSidebarContext';

export default function Navbar() {
  const pathname = usePathname();
  const { openModal: openSearchModal } = useSearch();
  const { data: session, status } = useSession();
  const { toggleSidebar } = useProfileSidebar();

  return (
    <header className="w-full p-4 flex items-center bg-emex-preto h-24">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" passHref>
            <Image src="/emex-logo.png" alt="EMEX Play Logo" width={150} height={50} priority className="cursor-pointer" />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className={`text-lg pb-1 transition-colors duration-200 ${pathname === '/' ? 'font-semibold text-white border-b-2 border-emex-azul-claro' : 'text-gray-400 hover:text-white border-b-2 border-transparent'}`}>Início</Link>
            <Link href="/treinamentos" className={`text-lg pb-1 transition-colors duration-200 ${pathname === '/treinamentos' ? 'font-semibold text-white border-b-2 border-emex-azul-claro' : 'text-gray-400 hover:text-white border-b-2 border-transparent'}`}>Treinamentos</Link>
            
            {status === 'authenticated' && (
              <Link href="/minha-lista" className={`text-lg pb-1 transition-colors duration-200 ${pathname === '/minha-lista' ? 'font-semibold text-white border-b-2 border-emex-azul-claro' : 'text-gray-400 hover:text-white border-b-2 border-transparent'}`}>Minha Lista</Link>
            )}
          </nav>
        </div>
        <div className="flex items-center space-x-6 text-white">
          <button onClick={openSearchModal} aria-label="Abrir busca" className="hover:text-gray-300">
            <Search className="h-7 w-7 cursor-pointer" />
          </button>
          <Bell className="h-7 w-7 cursor-pointer hover:text-gray-300" />
          
          <div className="text-white">
            {status === 'loading' && (
              <div className="h-8 w-8 bg-gray-700 rounded-full animate-pulse"></div>
            )}

            {status === 'unauthenticated' && (
              <button onClick={() => signIn()} className="flex items-center hover:text-gray-300">
                <LogIn className="h-7 w-7 mr-2" />
                <span className="hidden sm:inline">Entrar</span>
              </button>
            )}

            {status === 'authenticated' && session.user && (
              // ALTERAÇÃO AQUI: Adicionado 'cursor-pointer'
              <button onClick={toggleSidebar} className="flex items-center group cursor-pointer" title="Abrir perfil">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "Avatar"}
                    width={32}
                    height={32}
                    className="rounded-full group-hover:opacity-80 transition-opacity"
                  />
                ) : (
                  <UserCircle className="h-8 w-8 group-hover:opacity-80 transition-opacity" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}