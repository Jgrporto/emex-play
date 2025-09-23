// A diretiva "use client" e os imports de 'useState' e 'useEffect' foram removidos.
import { Search, Bell, UserCircle } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  // A lógica de 'useState' e 'useEffect' foi completamente removida daqui.

  return (
    // A classe do header agora é fixa, sem a lógica de mudança de cor.
    <header className="fixed top-0 left-0 right-0 z-20 p-4 flex items-center bg-gradient-to-b from-black to-transparent transition-colors duration-300 h-24">
      
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        
        {/* ZONA ESQUERDA: Logo e Navegação Principal */}
        <div className="flex items-center space-x-8">
          <Image
            src="/emex-logo.png"
            alt="EMEX Play Logo"
            width={150}
            height={50}
            priority
            className="cursor-pointer"
          />
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-gray-300 text-lg">Início</a>
            <a href="#" className="font-semibold text-white text-lg border-b-2 border-emex-azul-claro pb-1">Treinamentos</a>
            <a href="#" className="hover:text-gray-300 text-lg">Minha Lista</a>
          </nav>
        </div>

        {/* ZONA DIREITA: Ícones */}
        <div className="flex items-center space-x-6">
          <Search className="h-7 w-7 cursor-pointer hover:text-gray-300" />
          <Bell className="h-7 w-7 cursor-pointer hover:text-gray-300" />
          <UserCircle className="h-7 w-7 cursor-pointer hover:text-gray-300" />
        </div>
      </div>
    </header>
  );
}