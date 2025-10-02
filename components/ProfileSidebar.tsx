"use client";

import { useProfileSidebar } from "@/context/ProfileSidebarContext";
import { X, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function ProfileSidebar() {
  const { isOpen, toggleSidebar } = useProfileSidebar();
  const { data: session } = useSession();

  if (!isOpen) {
    return null;
  }

  return (
    // O fundo escuro que cobre a tela (backdrop)
    <div 
      className="fixed inset-0 bg-black/60 z-50 transition-opacity duration-300"
      onClick={toggleSidebar}
    >
      {/* O painel da barra lateral */}
      <div
        // ALTERAÇÃO 1: Adicionado fundo com 80% de opacidade e efeito de desfoque
        className="fixed top-0 right-0 h-full w-80 bg-emex-cinza-escuro/80 backdrop-blur-sm shadow-lg p-6 flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Seu Perfil</h2>
          {/* ALTERAÇÃO 2: Adicionado cursor-pointer ao botão 'X' */}
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white cursor-pointer">
            <X size={24} />
          </button>
        </div>
        
        {session?.user && (
          <div className="flex flex-col items-center text-center">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || "Avatar"}
                width={80}
                height={80}
                className="rounded-full mb-4 border-2 border-gray-600"
              />
            )}
            <h3 className="text-lg font-semibold">{session.user.name}</h3>
            <p className="text-sm text-gray-400">{session.user.email}</p>
          </div>
        )}
        
        <hr className="border-gray-700 my-8" />
        
        <nav className="flex-grow">
          {/* Espaço para futuros links */}
        </nav>
        
        <div className="mt-auto">
          {/* ALTERAÇÃO 3: Adicionado cursor-pointer ao botão 'Sair' */}
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })} 
            className="w-full flex items-center justify-center gap-2 p-3 rounded-md text-gray-300 hover:bg-red-800/50 hover:text-white transition-colors cursor-pointer"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
}