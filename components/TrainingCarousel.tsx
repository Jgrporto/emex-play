"use client";

import { useRef, useState } from 'react';
import TrainingCard from './TrainingCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Training } from '@/types';

type TrainingCarouselProps = {
  title: string;
  slug: string; 
  trainings: Training[];
  onInfoClick: (training: Training) => void;
};

export default function TrainingCarousel({ title, slug, trainings, onInfoClick }: TrainingCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Este estado controla o hover GERAL (para as setas grandes e a seta pequena)
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };
  
  if (!trainings || trainings.length === 0) {
    return null;
  }

  return (
    // O container principal agora controla o hover GERAL
    <div 
      className="mb-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-4 px-4 sm:px-6 lg:px-8">
        {/* O 'group' aqui controla o hover ESPECÍFICO do título */}
        <Link href={`/categoria/${slug}`} className="group flex items-center gap-2">
          <h2 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">{title}</h2>
          
          <div 
            // A SETA PEQUENA aparece com o hover GERAL
            className={`flex items-center text-sm text-link-azul font-semibold transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* O TEXTO 'Ver tudo' aparece com o hover ESPECÍFICO do título */}
            <span className="max-w-0 group-hover:max-w-xs transition-all duration-300 overflow-hidden whitespace-nowrap">
              Ver tudo
            </span>
            <ChevronRight size={24} className="transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </Link>
      </div>

      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <div 
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-4 sm:px-6 lg:px-8"
        >
          {trainings.map((training) => (
            <TrainingCard 
              key={training._id} 
              training={training} 
              onInfoClick={onInfoClick}
            />
          ))}
        </div>
        
        {/* As SETAS GRANDES também usam o hover GERAL */}
        <button 
          onClick={() => scroll('left')}
          className={`absolute top-1/2 -translate-y-1/2 left-0 h-40 z-20 
                     w-16 sm:w-20 lg:w-24 
                     transition-opacity duration-300 flex items-center justify-start
                     cursor-pointer focus:outline-none
                     ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r to-transparent"></div>
          <ChevronLeft size={40} className="relative text-white" />
        </button>

        <button 
          onClick={() => scroll('right')}
          className={`absolute top-1/2 -translate-y-1/2 right-0 h-40 z-20
                     w-16 sm:w-20 lg:w-24
                     transition-opacity duration-300 flex items-center justify-end
                     cursor-pointer focus:outline-none
                     ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-l to-transparent"></div>
          <ChevronRight size={40} className="relative text-white" />
        </button>
      </div>
    </div>
  );
}