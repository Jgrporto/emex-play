"use client";

import { useRef, useState } from 'react';
import TrainingCard from './TrainingCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Training } from '@/types';
import { useEffect } from 'react';

type TrainingCarouselProps = {
  title: string;
  slug: string; 
  trainings: Training[];
  onInfoClick: (training: Training) => void;
};

export default function TrainingCarousel({ title, slug, trainings, onInfoClick }: TrainingCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsAtStart(scrollLeft < 5); // Adicionamos uma tolerância de 5px
      // Adicionamos uma tolerância de 5px para o fim também
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
    }
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      // Adiciona o "ouvinte" de scroll
      element.addEventListener('scroll', checkScrollPosition);
      // Roda uma vez no início para definir o estado correto
      checkScrollPosition();
      
      // Limpa o "ouvinte" quando o componente é desmontado
      return () => element.removeEventListener('scroll', checkScrollPosition);
    }
  }, [trainings]); // Re-executa se a lista de treinamentos mudar
  // -------------------------------------------

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
    <div 
      className="mb-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-4">
        <Link href={`/categoria/${slug}`} className="group flex items-center gap-2">
          <h2 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">{title}</h2>
          
          <div 
            className={`flex items-center text-sm text-link-azul font-semibold transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <span className="max-w-0 group-hover:max-w-xs transition-all duration-300 overflow-hidden whitespace-nowrap">
              Ver tudo
            </span>
            <ChevronRight size={24} className="transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
      <div
        className="relative -mx-4 sm:-mx-6 lg:-mx-8"
      >
        <div 
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-4 sm:px-6 lg:px-8"
        >
          {trainings.map((training) => (
            <div key={training._id} className="relative aspect-video w-72 flex-shrink-0">
              <TrainingCard 
                training={training} 
                onInfoClick={onInfoClick}
              />
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => scroll('left')}
          className={`absolute top-1/2 -translate-y-1/2 left-0 h-50 z-30 
                     w-16 sm:w-20 lg:w-24 
                     bg-gradient-to-r from-emex-preto to-transparent
                     transition-opacity duration-300
                     flex items-center justify-start
                     cursor-pointer focus:outline-none
                     ${isHovered && !isAtStart ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 carousel-arrow-gradient-left"></div>
          <ChevronLeft size={40} className="relative text-link-azul"/>
        </button>

        <button 
          onClick={() => scroll('right')}
          className={`absolute top-1/2 -translate-y-1/2 right-0 h-50 z-30
                     w-16 sm:w-20 lg:w-24
                     bg-gradient-to-l from-emex-preto to-transparent
                     transition-opacity duration-300
                     flex items-center justify-end
                     cursor-pointer focus:outline-none
                     ${isHovered && !isAtEnd ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 carousel-arrow-gradient-right"></div>
          <ChevronRight size={40} className="relative text-link-azul"/>
        </button>
      </div>
    </div>
  );
}