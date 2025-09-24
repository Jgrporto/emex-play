"use client";

import { useRef } from 'react';
import TrainingCard from './TrainingCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Training = {
  id: string; 
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-emex-azul-claro">{title}</h2>
        <a href="#" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
          Explorar
        </a>
      </div>

      {/* MUDANÇA 1: Nomeamos o grupo do carrossel */}
      <div className="relative group/carousel"> 
        
        {/* MUDANÇA 2: A seta da esquerda agora responde ao grupo nomeado */}
        <button 
          onClick={() => handleScroll('left')}
          className="absolute top-1/2 -left-12 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-black hidden md:block"
          aria-label="Rolar para a esquerda"
        >
          <ChevronLeft size={28} />
        </button>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 pb-4 px-4 scrollbar-hide"
        >
          {trainings.map((training) => (
            <TrainingCard key={training.id} training={training} />
          ))}
        </div>

        {/* MUDANÇA 3: A seta da direita também responde ao grupo nomeado */}
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
