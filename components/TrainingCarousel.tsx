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
    <div className="mb-20"> {/* Aumentamos a margem inferior para dar mais espaço para a expansão */}
      <div className="flex justify-between items-center mb-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {slug && (
          <Link href={`/categoria/${slug}`} className="text-sm text-gray-400 hover:text-white transition-colors font-semibold">
            Explorar tudo
          </Link>
        )}
      </div>

      <div
        className="relative -mx-4 sm:-mx-6 lg:-mx-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-4 sm:px-6 lg:px-8"
        >
          {/* --- A ALTERAÇÃO ESTÁ AQUI: ENVOLVEMOS O CARD COM O PLACEHOLDER --- */}
          {trainings.map((training) => (
            // Esta div é o "placeholder" que segura o espaço na fileira
            <div key={training._id} className="relative aspect-video w-72 flex-shrink-0">
              <TrainingCard 
                training={training} 
                onInfoClick={onInfoClick}
              />
            </div>
          ))}
        </div>
        
        {/* As setas de navegação continuam as mesmas */}
        <button 
          onClick={() => scroll('left')}
          className={`absolute top-1/2 -translate-y-1/2 left-0 h-40 z-30 
                     w-16 sm:w-20 lg:w-24 
                     transition-opacity duration-300
                     flex items-center justify-start
                     cursor-pointer focus:outline-none
                     ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emex-preto to-transparent"></div>
          <ChevronLeft size={40} className="relative text-white" />
        </button>

        <button 
          onClick={() => scroll('right')}
          className={`absolute top-1/2 -translate-y-1/2 right-0 h-40 z-30
                     w-16 sm:w-20 lg:w-24
                     transition-opacity duration-300
                     flex items-center justify-end
                     cursor-pointer focus:outline-none
                     ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-emex-preto to-transparent"></div>
          <ChevronRight size={40} className="relative text-white" />
        </button>
      </div>
    </div>
  );
}