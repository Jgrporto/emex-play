// components/Navbar.tsx

'use client';

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
  const { toggleSidebar: toggleProfileSidebar } = useProfileSidebar();
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
      <div className="mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-24">
          
          {/* --- GRUPO DA ESQUERDA --- */}
          <div className="flex items-center gap-6">
            {/* 1. Menu Hamburger (SEMPRE VISÍVEL) */}
            {/* MUDANÇA: Removida a classe 'md:hidden' */}
            {/* 2. Logo */}
            <Link href="/" passHref>
              <Image src="/emex-logo.png" alt="EMEX Play Logo" width={150} height={50} priority className="cursor-pointer" />
            </Link>

            {/* 3. Links de Navegação (SEMPRE VISÍVEIS) */}
            {/* MUDANÇA: Removidas as classes 'hidden' e 'md:flex' */}
            <nav className="flex items-center gap-8">
              <Link href="/treinamentos" className={`${linkBaseClasses} ${pathname === '/treinamentos' ? 'link-underline-active font-semibold text-white' : 'link-underline text-gray-400 hover:text-white'}`}>
                Treinamentos
              </Link>
              <Link href="/categorias" className={`${linkBaseClasses} ${pathname.startsWith('/categorias') || pathname.startsWith('/categoria/') ? 'link-underline-active font-semibold text-white' : 'link-underline text-gray-400 hover:text-white'}`}>
                Categorias
              </Link>
              <Link href="/favoritos" className={`${linkBaseClasses} ${pathname === '/favoritos' ? 'link-underline-active font-semibold text-white' : 'link-underline text-gray-400 hover:text-white'}`}>
                Favoritos
              </Link>
            </nav>
          </div>
          {/* --- GRUPO DA DIREITA --- */}
          <div className="flex items-center gap-8 text-white">
            
            {/* 4. Botão de Pesquisa */}
            <button onClick={openSearchModal} aria-label="Abrir busca" className="navbar-icon-hover">
              {/* MUDANÇA: Tamanho levemente aumentado para harmonia */}
              <Search className="h-9 w-9 cursor-pointer" />
            </button>
            
            {/* 5. Botão de Notificações */}
            <button aria-label="Notificações" className="navbar-icon-hover">
              {/* MUDANÇA: Tamanho levemente aumentado para harmonia */}
              <Bell className="h-9 w-9 cursor-pointer" />
            </button>
            
            {/* 6. Ícone de Usuário */}
            {/* MUDANÇA: A lógica do usuário agora é um filho direto do flex container */}
            
            {/* Estado de Carregamento */}
            {status === 'loading' && <div className="h-12 w-12 bg-gray-700 rounded-full animate-pulse"></div>}
            
            {/* Estado Deslogado */}
            {status === 'unauthenticated' && (
              <button onClick={() => signIn()} className="navbar-icon-hover flex items-center">
                <LogIn className="h-9 w-9" />
              </button>
            )}

            {/* Estado Logado */}
            {status === 'authenticated' && session.user && (
              <button onClick={toggleProfileSidebar} className="navbar-avatar-hover flex items-center group cursor-pointer" title="Abrir perfil">
                {session.user.image ? (
                  // MUDANÇA: Tamanho da imagem aumentado para 48x48
                  <Image src={session.user.image} alt={session.user.name || "Avatar"} width={48} height={48} className="rounded-full" />
                ) : (
                  // MUDANÇA: Tamanho do ícone aumentado para h-12 w-12
                  <UserCircle className="h-12 w-12" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}