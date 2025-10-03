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
    <div className="mb-12">
      {/* O cabeçalho continua separado, para alinhamento */}
      <div className="flex justify-between items-center mb-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {slug && (
          <Link href={`/categoria/${slug}`} className="text-sm text-gray-400 hover:text-white transition-colors font-semibold">
            Explorar tudo
          </Link>
        )}
      </div>

      {/* Container relativo AGORA envolve apenas a área de rolagem e as setas */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth py-4 
                     -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {trainings.map((training) => (
            <TrainingCard 
              key={training._id} 
              training={training} 
              onInfoClick={onInfoClick}
            />
          ))}
        </div>
        
        {/* As setas agora estão centralizadas em relação a este container */}
        <button 
          onClick={() => scroll('left')}
          className={`absolute top-1/2 -translate-y-1/2 left-0 h-full w-16 z-20
                      bg-gradient-to-r from-emex-preto to-transparent
                      text-white transition-opacity duration-300
                      flex items-center justify-center cursor-pointer
                      ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Rolar para a esquerda"
        >
          <ChevronLeft size={36} className="text-gray-400 hover:text-white" />
        </button>

        <button 
          onClick={() => scroll('right')}
          className={`absolute top-1/2 -translate-y-1/2 right-0 h-full w-16 z-20
                      bg-gradient-to-l from-emex-preto to-transparent
                      text-white transition-opacity duration-300
                      flex items-center justify-center cursor-pointer
                      ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Rolar para a direita"
        >
          <ChevronRight size={36} className="text-gray-400 hover:text-white" />
        </button>
      </div>
    </div>
  );
}