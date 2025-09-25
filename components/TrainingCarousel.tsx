"use client";

import { useRef } from 'react';
import TrainingCard from './TrainingCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Definimos o tipo Training aqui para que o componente saiba o formato dos dados
type Training = {
  id: string;
  title: string;
  thumbnailUrl: string;
  description?: string;
};

// As propriedades que o nosso carrossel espera receber
type TrainingCarouselProps = {
  title: string;
  slug: string; // Adicionamos o slug para criar o link dinâmico
  trainings: Training[];
  onInfoClick: (training: Training) => void;
};

export default function TrainingCarousel({ title, slug, trainings, onInfoClick }: TrainingCarouselProps) {
  // useRef nos dá acesso direto ao elemento de scroll para podermos controlá-lo
  const scrollRef = useRef<HTMLDivElement>(null);

  // Função que faz a rolagem suave ao clicar nas setas
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.75 
        : scrollLeft + clientWidth * 0.75;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mb-8">
      {/* Header do Carrossel com Título e Link "Explorar" */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-emex-azul-claro">{title}</h2>
        {/* O link agora é dinâmico, usando o slug da categoria */}
        <Link href={`/categoria/${slug}`} className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
          Explorar
        </Link>
      </div>

      {/* Container Relativo que usa um grupo nomeado "carousel" para as setas */}
      <div className="relative group/carousel">
        
        {/* Seta da Esquerda */}
        <button 
          onClick={() => handleScroll('left')}
          className="absolute top-1/2 -left-12 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-black hidden md:block"
          aria-label="Rolar para a esquerda"
        >
          <ChevronLeft size={28} />
        </button>

        {/* O Carrossel de Cards que rola horizontalmente */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 pb-4 px-4 scrollbar-hide"
        >
          {trainings.map((training) => (
            // Passamos a função onInfoClick para cada card
            <TrainingCard 
              key={training.id} 
              training={training} 
              onInfoClick={onInfoClick}
            />
          ))}
        </div>

        {/* Seta da Direita */}
        <button 
          onClick={() => handleScroll('right')}
          className="absolute top-1/2 -right-12 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-black hidden md:block"
          aria-label="Rolar para a direita"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}