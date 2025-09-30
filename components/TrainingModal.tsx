"use client";

import Image from 'next/image';
import Link from 'next/link';
import { X, Play } from 'lucide-react';
import type { Training } from '@/types';
import React from 'react'; // Importamos o React para usar o MouseEvent

type TrainingModalProps = {
  training: Training | null;
  onClose: () => void;
};

export default function TrainingModal({ training, onClose }: TrainingModalProps) {
  if (!training) {
    return null;
  }

  const hasSlug = training && training.slug;

  // Função para impedir que o clique dentro do modal o feche
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    // MELHORIA DE UX: Adicionado onClick={onClose} para fechar ao clicar no fundo
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-modal-conteudo rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide"
        onClick={handleModalContentClick} // Impede o clique de "borbulhar" para o fundo
      >
        <div className="relative">
          <div className="relative w-full aspect-video">
            <Image
              src={training.thumbnailUrl}
              alt={training.title}
              fill
              className="object-cover rounded-t-lg"
            />
            <button
              onClick={onClose}
              // MELHORIA DE UX: Adicionado cursor-pointer
              className="absolute top-4 right-4 bg-black/60 rounded-full p-2 hover:bg-black/80 transition-colors cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="p-8 text-center"> {/* Adicionado text-center para alinhar tudo */}
            <h2 className="text-3xl font-bold mb-4">{training.title}</h2>
            
            {/* MELHORIA DE UX: Descrição agora vem antes do botão */}
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {training.description}
            </p>
            
            {/* BOTÃO COM MUDANÇAS DE UX */}
            {hasSlug && (
              <Link href={`/watch/${training.slug}`} passHref>
                {/* O botão agora é centralizado por padrão */}
                <button className="flex items-center justify-center mx-auto bg-white text-black font-bold px-8 py-4 rounded hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
                  <Play className="h-6 w-6 mr-2" />
                  {/* Texto do botão alterado */}
                  Iniciar Treinamento
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}