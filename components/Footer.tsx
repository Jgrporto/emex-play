"use client"; // Necessário para a interatividade do botão "Voltar ao Topo"

import { useState, useEffect } from 'react';
import { Youtube, Facebook, Instagram, ArrowUp } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  // Função para rolar a página suavemente para o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Efeito para mostrar/esconder o botão baseado na posição do scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) { // O botão aparece após rolar 300px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Limpa o "ouvinte" de scroll quando o componente é desmontado
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <footer className="bg-emex-preto border-t border-gray-800 py-12 text-gray-400 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Layout em Grid com 4 colunas em telas grandes, e 1 em telas pequenas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Coluna 1: Logo e Copyright */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-white">EMEX Play</Link>
            <p className="text-sm">&copy; {new Date().getFullYear()} João Gabriel Rodrigues Porto.<br/>Todos os direitos reservados.</p>
          </div>

          {/* Coluna 2: Navegue */}
          <div>
            <h3 className="font-bold text-white mb-4">Navegue</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link href="/treinamentos" className="hover:text-white transition-colors">Treinamentos</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Termos e Ajuda */}
          <div>
            <h3 className="font-bold text-white mb-4">Termos e ajuda</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Termos de uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Políticas de privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Suporte</a></li>
            </ul>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div>
            <h3 className="font-bold text-white mb-4">Redes sociais</h3>
            <ul className="space-y-3">
              <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Youtube size={20} /> YouTube</a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Facebook size={20} /> Facebook</a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Instagram size={20} /> Instagram</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Botão "Voltar ao Topo" */}
      {isVisible && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gray-700 hover:bg-emex-azul-claro text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-30"
          aria-label="Voltar ao topo"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </footer>
  );
}