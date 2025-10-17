"use client";

import { useState, useEffect } from 'react';
import { Youtube, Facebook, Instagram, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <footer className="w-full .bg-emex-preto-footer border-t border-gray-800 py-12 text-gray-400 relative">
      {/* MUDANÇA 1: Adicionado um container para gerenciar as margens laterais */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start text-left">
          
          <div className="space-y-4 md:col-span-1">
            <Link href="/">
              <Image src="/footer-logo.png" alt="EMEX Play Logo" width={150} height={50} />
            </Link>
            {/* MUDANÇA 2: Fonte do copyright aumentada para text-base */}
            <p className="text-base">&copy; {new Date().getFullYear()} João Gabriel Rodrigues Porto.<br/>Todos os direitos reservados.</p>
          </div>

          <div className="md:justify-self-center">
            <h3 className="font-bold text-white mb-4 text-lg">Navegue</h3>
            <ul className="space-y-2">
              {/* MUDANÇA 2: Fonte dos links aumentada para text-base */}
              <li><Link href="/" className="text-base hover:text-white transition-colors">Início</Link></li>
              <li><Link href="/treinamentos" className="text-base hover:text-white transition-colors">Treinamentos</Link></li>
              <li><Link href="/minha-lista" className="text-base hover:text-white transition-colors">Favoritos</Link></li>
            </ul>
          </div>

          <div className="md:justify-self-center">
            <h3 className="font-bold text-white mb-4 text-lg">Termos e ajuda</h3>
            <ul className="space-y-2">
              {/* MUDANÇA 2: Fonte dos links aumentada para text-base */}
              <li><a href="#" className="text-base hover:text-white transition-colors">Termos de uso</a></li>
              <li><a href="#" className="text-base hover:text-white transition-colors">Políticas de privacidade</a></li>
              <li><a href="#" className="text-base hover:text-white transition-colors">Suporte</a></li>
            </ul>
          </div>

          <div className="md:justify-self-end">
            <h3 className="font-bold text-white mb-4 text-lg">Redes sociais</h3>
            <ul className="space-y-3">
              {/* MUDANÇA 2: Fonte dos links aumentada para text-base */}
              <li><a href="#" className="text-base flex items-center gap-2 hover:text-white transition-colors"><Youtube size={20} /> YouTube</a></li>
              <li><a href="#" className="text-base flex items-center gap-2 hover:text-white transition-colors"><Facebook size={20} /> Facebook</a></li>
              <li><a href="#" className="text-base flex items-center gap-2 hover:text-white transition-colors"><Instagram size={20} /> Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>

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