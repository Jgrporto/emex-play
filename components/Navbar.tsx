// components/Navbar.tsx

"use client";

import { Search, Bell, LogIn, UserCircle } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSearch } from '@/context/SearchContext';
import { useSession, signIn } from "next-auth/react";
import { useProfileSidebar } from '@/context/ProfileSidebarContext';

interface NavbarProps {
  isFixed: boolean;
}

export default function Navbar({ isFixed }: NavbarProps) {
  const pathname = usePathname();
  const { openModal: openSearchModal } = useSearch();
  const { data: session, status } = useSession();
  const { toggleSidebar } = useProfileSidebar();

  const isWatchPage = pathname.startsWith('/watch/');
  const vinhetaGradient = "bg-gradient-to-b from-black/80 to-transparent";
  let headerClasses: string;

  if (isFixed) {
    headerClasses = `w-full fixed top-0 left-0 right-0 z-50 ${vinhetaGradient}`;
  } else {
    headerClasses = `w-full relative ${vinhetaGradient}`;
  }

  const linkBaseClasses = "text-lg pb-1 transition-colors duration-200";

  return (
    <header className={headerClasses}>
      <div className="flex items-center justify-between h-24 px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center space-x-8">
          <Link href="/" passHref>
            <Image src="/emex-logo.png" alt="EMEX Play Logo" width={150} height={50} priority className="cursor-pointer" />
          </Link>

          <nav className="hidden md:flex space-x-8">
            {isWatchPage ? (
              // Menu para a página de VÍDEO
              <>
                <Link href="/" className={`${linkBaseClasses} link-underline text-gray-400 hover:text-white`}>Início</Link>
                <Link href="/favoritos" className={`${linkBaseClasses} ${pathname === '/favoritos' ? 'link-underline-active font-semibold text-white' : 'link-underline text-gray-400 hover:text-white'}`}>Favoritos</Link>
              </>
            ) : (
              // Menu para o site GERAL
              <>
                <Link href="/" className={`${linkBaseClasses} ${pathname === '/' ? 'link-underline-active font-semibold text-white' : 'link-underline text-gray-400 hover:text-white'}`}>Início</Link>
                <Link href="/treinamentos" className={`${linkBaseClasses} ${pathname === '/treinamentos' ? 'link-underline-active font-semibold text-white' : 'link-underline text-gray-400 hover:text-white'}`}>Treinamentos</Link>
                {status === 'authenticated' && (
                  <Link href="/favoritos" className={`${linkBaseClasses} ${pathname === '/favoritos' ? 'link-underline-active font-semibold text-white' : 'link-underline text-gray-400 hover:text-white'}`}>Favoritos</Link>
                )}
              </>
            )}
          </nav>
        </div>

        {/* Lado Direito: Ícones e Usuário */}
        <div className="flex items-center space-x-6 text-white">
          {/* ...seu código para os ícones e usuário... */}
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