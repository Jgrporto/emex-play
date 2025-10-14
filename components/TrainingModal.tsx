"use client";

import Image from 'next/image';
import Link from 'next/link';
import { X, Play, Plus, ThumbsUp } from 'lucide-react';
import type { Training } from '@/types';
import EpisodeListItem from './EpisodeListItem';
import { useEffect } from 'react';

type TrainingModalProps = {
  training: Training | null;
  onClose: () => void;
};

export default function TrainingModal({ training, onClose }: TrainingModalProps) {
  
  // Lógica para travar a rolagem da página principal
  useEffect(() => {
    // Quando o modal abre, adiciona uma classe ao body que desativa o scroll
    document.body.classList.add('overflow-hidden');

    // Função de limpeza: será executada quando o modal fechar
    return () => {
      // Remove a classe para reativar o scroll
      document.body.classList.remove('overflow-hidden');
    };
  }, []); // O array vazio garante que isso rode apenas uma vez (ao abrir e fechar)

  if (!training) return null;

  const firstEpisode = training.episodes?.[0];

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 p-4 sm:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl mx-auto bg-emex-cinza-escuro rounded-lg shadow-2xl modal-backdrop-solid"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- Seção Hero (Apenas a Imagem) --- */}
        <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
          <Image
            src={training.thumbnailUrl}
            alt={training.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emex-cinza-escuro/50 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 rounded-full p-2 hover:bg-black/80 transition-colors cursor-pointer z-20"
            aria-label="Fechar modal"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* --- Nova Seção de Informações (Abaixo da Imagem) --- */}
        <div className="p-8">
          <h2 className="text-4xl font-bold text-white">{training.title}</h2>
          
          <div className="flex items-center space-x-4 my-4">
            {firstEpisode && (
              <Link href={`/watch/${training.slug}?episode=${firstEpisode.episodeNumber}`}>
                <button className="flex items-center gap-2 bg-white text-black font-bold px-6 py-2 rounded hover:bg-gray-200 transition">
                  <Play size={24} className="fill-current" />
                  Assistir
                </button>
              </Link>
            )}
            <button className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-gray-400 hover:border-white transition">
              <Plus size={28} />
            </button>
            <button className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-gray-400 hover:border-white transition">
              <ThumbsUp size={20} />
            </button>
          </div>
          
          <p className="max-w-3xl text-gray-300">
            {training.description}
          </p>
        </div>

        {/* --- Seção de Episódios --- */}
        {training.episodes && training.episodes.length > 0 && (
          <div className="px-8 pb-8">
            <h3 className="text-2xl font-bold text-white mb-4 border-t border-gray-700 pt-8">Episódios</h3>
            <div className="border-t border-gray-700">
              {training.episodes.map((episode) => (
                <div key={episode._id} className="border-b border-gray-700">
                  <EpisodeListItem episode={episode} trainingSlug={training.slug || ''} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}