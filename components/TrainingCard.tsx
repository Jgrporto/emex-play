"use client"; // Necessário pois usa hooks (useMyList)

import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle, PlusCircle, CheckCircle, ChevronDown } from 'lucide-react';
import React from 'react';
import { useMyList } from '@/hooks/useMyList'; // Importamos o nosso hook corrigido

// Definimos o tipo 'Training' aqui
type Training = {
  id: string;
  title: string;
  thumbnailUrl: string;
  description?: string;
};

type TrainingCardProps = {
  training: Training;
  onInfoClick: (training: Training) => void;
};

export default function TrainingCard({ training, onInfoClick }: TrainingCardProps) {
  // Usamos nosso hook para ter acesso às ferramentas da "Minha Lista"
  // Agora com a função simplificada 'toggleMyList'
  const { toggleMyList, isInMyList } = useMyList();
  
  // Verificamos se este card específico já está na lista
  const isSaved = isInMyList(training.id);

  // Função para lidar com o clique nos ícones que não devem navegar
  const handleIconClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  return (
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
            
              <Link href={`/watch/${training.id}`} passHref onClick={(e) => e.stopPropagation()}>
                <div className="icon-hover-container-verde transition-colors duration-300">
                  <PlayCircle className="h-8 w-8 text-white" />
                </div>
              </Link>

              {/* Botão de Adicionar/Remover que agora usa 'toggleMyList' */}
              <button onClick={(e) => handleIconClick(e, () => toggleMyList(training.id))} className="focus:outline-none">
                <div className="icon-hover-container-laranja transition-colors duration-300">
                  {isSaved ? (
                    // Se estiver salvo, mostra o ícone de 'check'
                    <CheckCircle className="h-8 w-8 text-emex-laranja" />
                  ) : (
                    // Se não estiver salvo, mostra o ícone de '+'
                    <PlusCircle className="h-8 w-8 text-white" />
                  )}
                </div>
              </button>

          </div>
          
          <button onClick={(e) => handleIconClick(e, () => onInfoClick(training))} className="focus:outline-none cursor-pointer">
            <ChevronDown className="h-8 w-8 text-white hover:text-emex-azul-claro transition-colors" />
          </button>
        </div>
      </div>

    </div>
  );
}