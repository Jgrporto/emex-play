"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

type Training = {
  id: string;
  title: string;
  thumbnailUrl: string;
  description?: string;
};

type HeroCarouselProps = {
  trainings: Training[];
};

export default function HeroCarousel({ trainings }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const isFirstSlide = prevIndex === 0;
      return isFirstSlide ? trainings.length - 1 : prevIndex - 1;
    });
  }, [trainings.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const isLastSlide = prevIndex === trainings.length - 1;
      return isLastSlide ? 0 : prevIndex + 1;
    });
  }, [trainings.length]);

  // A LÓGICA DE CORREÇÃO ESTÁ AQUI
  useEffect(() => {
    // O timer é limpo e recriado toda vez que o currentIndex muda
    const slideInterval = setInterval(nextSlide, 7000);
    return () => clearInterval(slideInterval);
  }, [currentIndex, nextSlide]); // Adicionamos 'currentIndex' à lista de dependências


  if (!trainings || trainings.length === 0) {
    return null;
  }

  const currentTraining = trainings[currentIndex];

  return (
    <div className="w-full h-[60vh] max-h-[500px] relative group/hero">
      
      {trainings.map((training, index) => (
        <div
          key={training.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={training.thumbnailUrl}
            alt={training.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        </div>
      ))}
      
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 max-w-7xl w-full px-4 md:px-8 text-left">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg transition-all duration-500" key={currentTraining.id}>
              {currentTraining.title}
            </h2>
            <p className="text-lg text-gray-200 mt-4 drop-shadow-lg max-w-lg">
              {currentTraining.description}
            </p>
            <Link href={`/watch/${currentTraining.id}`} passHref>
              <button className="flex items-center mt-8 bg-emex-verde text-white font-bold px-6 py-3 rounded transition-all duration-300 cursor-pointer btn-hover-container">
                <Play className="h-6 w-6 mr-2 text-white icon-hover-scale" />
                Assistir Agora
              </button>
            </Link>
          </div>
      </div>
      
      <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 left-4 z-10 bg-black/30 p-2 rounded-full text-white opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300 hover:bg-black" aria-label="Slide anterior">
        <ChevronLeft size={32} />
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-black/30 p-2 rounded-full text-white opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300 hover:bg-black" aria-label="Próximo slide">
        <ChevronRight size={32} />
      </button>
    </div>
  );
}