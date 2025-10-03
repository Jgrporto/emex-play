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
    // O header agora controla o padding lateral diretamente (px-4, etc.)
    <header className="w-full fixed top-0 left-0 right-0 z-50 bg-emex-preto/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
      {/* A div interna com 'max-w-7xl' foi REMOVIDA. */}
      {/* O conteúdo agora se expande naturalmente. */}
      <div className="flex items-center justify-between h-24">
        
        {/* Lado Esquerdo: Logo e Navegação */}
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

        {/* Lado Direito: Ícones e Usuário */}
        <div className="flex items-center space-x-6 text-white">
          <button onClick={openSearchModal} aria-label="Abrir busca" className="hover:text-gray-300">
            <Search className="h-7 w-7 cursor-pointer" />
          </button>
          <Bell className="h-7 w-7 cursor-pointer hover:text-gray-300" />
          
          <div className="text-white">
            {status === 'loading' && <div className="h-8 w-8 bg-gray-700 rounded-full animate-pulse"></div>}
            {status === 'unauthenticated' && (
              <button onClick={() => signIn()} className="flex items-center hover:text-gray-300">
                <LogIn className="h-7 w-7 mr-2" />
                <span className="hidden sm:inline">Entrar</span>
              </button>
            )}
            {status === 'authenticated' && session.user && (
              <button onClick={toggleSidebar} className="flex items-center group cursor-pointer" title="Abrir perfil">
                {session.user.image ? (
                  <Image src={session.user.image} alt={session.user.name || "Avatar"} width={32} height={32} className="rounded-full group-hover:opacity-80 transition-opacity" />
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