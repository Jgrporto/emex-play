"use client";

import { Search, Bell, LogOut, LogIn } from 'lucide-react'; // Trocamos UserCircle por LogOut e LogIn
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSearch } from '@/context/SearchContext';
import { useSession, signIn, signOut } from "next-auth/react"; // <-- NOVAS IMPORTAÇÕES

export default function Navbar() {
  const pathname = usePathname();
  const { openModal } = useSearch();
  const { data: session, status } = useSession(); // <-- NOVO HOOK PARA PEGAR A SESSÃO

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
            
            {/* Link 'Minha Lista' que só aparece quando o usuário está logado */}
            {status === 'authenticated' && (
              <Link href="/minha-lista" className={`text-lg pb-1 transition-colors duration-200 ${pathname === '/minha-lista' ? 'font-semibold text-white border-b-2 border-emex-azul-claro' : 'text-gray-400 hover:text-white border-b-2 border-transparent'}`}>Minha Lista</Link>
            )}
          </nav>
        </div>
        <div className="flex items-center space-x-6 text-white">
          <button onClick={openModal} aria-label="Abrir busca" className="hover:text-gray-300">
            <Search className="h-7 w-7 cursor-pointer" />
          </button>
          <Bell className="h-7 w-7 cursor-pointer hover:text-gray-300" />
          
          {/* --- NOVO BLOCO DE AUTENTICAÇÃO DINÂMICA --- */}
          <div className="text-white">
            {status === 'loading' && (
              // Mostra um placeholder enquanto verifica a sessão
              <div className="h-7 w-24 bg-gray-700 rounded animate-pulse"></div>
            )}

            {status === 'unauthenticated' && (
              // Mostra o botão 'Entrar' se deslogado
              <button onClick={() => signIn()} className="flex items-center hover:text-gray-300">
                <LogIn className="h-7 w-7 mr-2" />
                <span className="hidden sm:inline">Entrar</span>
              </button>
            )}

            {status === 'authenticated' && (
              // Mostra o nome do usuário e o botão 'Sair' se logado
              <div className="flex items-center space-x-4">
                <span className="hidden sm:inline font-semibold">Olá, {session.user?.name || 'Admin'}</span>
                <button onClick={() => signOut()} className="hover:text-gray-300" title="Sair">
                  <LogOut className="h-7 w-7" />
                </button>
              </div>
            )}
          </div>
          {/* --- FIM DO BLOCO DE AUTENTICAÇÃO --- */}

        </div>
      </div>
    </header>
  );
}