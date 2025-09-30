"use client";

import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle, ChevronDown } from 'lucide-react';
import React from 'react';
import type { Training } from '@/types';

type TrainingCardProps = {
  training: Training;
  onInfoClick: (training: Training) => void;
};

export default function TrainingCard({ training, onInfoClick }: TrainingCardProps) {
  
  // ADIÇÃO CRÍTICA: Trava de segurança
  // Se o treinamento não tiver um slug, não renderizamos nada para evitar erros.
  if (!training.slug) {
    return null;
  }

  const handleIconClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  return (
    // O clique no card todo abre o modal de informações
    <div 
      onClick={() => onInfoClick(training)}
      className="group relative flex-shrink-0 w-60 rounded-lg overflow-hidden
                 bg-emex-cinza-escuro shadow-lg
                 transform transition-all duration-300 ease-in-out
                 hover:scale-110 hover:z-20 hover:shadow-2xl cursor-pointer">
      
      <div className="relative w-full aspect-video">
        <Image
          src={training.thumbnailUrl}
          alt={training.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
      </div>

      <div className="absolute -bottom-full w-full p-3 bg-emex-cinza-escuro
                       opacity-0 group-hover:opacity-100 group-hover:bottom-0
                       transition-all duration-300 ease-in-out">
        <h3 className="text-white font-bold truncate mb-2">{training.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            
              {/* Esta linha já estava correta, usando a string 'slug' diretamente */}
              <Link href={`/watch/${training.slug}`} passHref onClick={(e) => e.stopPropagation()}>
                <div className="icon-hover-container-verde transition-colors duration-300">
                  <PlayCircle className="h-8 w-8 text-white" />
                </div>
              </Link>

          </div>
          
          {/* O ícone de detalhes continua abrindo o modal */}
          <button onClick={(e) => handleIconClick(e, () => onInfoClick(training))} className="focus:outline-none cursor-pointer">
            <ChevronDown className="h-8 w-8 text-white hover:text-emex-azul-claro transition-colors" />
          </button>
        </div>
      </div>

    </div>
  );
}