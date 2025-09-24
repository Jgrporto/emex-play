"use client";

import { useRef } from 'react';
import TrainingCard from './TrainingCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Training = {
  id: string; // <-- A correção é aqui
  title: string;
  thumbnailUrl: string;
};

type TrainingCarouselProps = {
  title: string;
  trainings: Training[];
};

export default function TrainingCarousel({ title, trainings }: TrainingCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

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
      {/* Header do Carrossel com Título e Link */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-emex-azul-claro">{title}</h2>
        <a href="#" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
          Explorar
        </a>
      </div>

      {/* NOVO CONTAINER: Agora este div 'relative' envolve TUDO (setas e carrossel) */}
      <div className="relative group"> 
        {/* Seta da Esquerda (agora mais à esquerda) */}
        <button 
          onClick={() => handleScroll('left')}
          // Alteramos a posição para -left-12 (era -left-4) para afastar da borda
          // E adicionamos 'block' para que o botão ocupe sua própria linha, facilitando o posicionamento
          className="absolute top-1/2 -left-12 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black hidden md:block"
          aria-label="Rolar para a esquerda"
        >
          <ChevronLeft size={28} />
        </button>

        {/* O Carrossel de Cards (o que de fato rola) */}
        {/* Adicionamos padding horizontal para que os cards não encostem nas setas ou bordas */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 pb-4 px-4 scrollbar-hide"
        >
          {trainings.map((training) => (
            <TrainingCard key={training.id} training={training} />
          ))}
        </div>

        {/* Seta da Direita (agora mais à direita) */}
        <button 
          onClick={() => handleScroll('right')}
          // Alteramos a posição para -right-12 (era -right-4)
          // E adicionamos 'block'
          className="absolute top-1/2 -right-12 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black hidden md:block"
          aria-label="Rolar para a direita"
        >
          <ChevronRight size={28} />
        </button>
      </div> {/* Fim do NOVO CONTAINER relativo */}
    </div>
  );
}