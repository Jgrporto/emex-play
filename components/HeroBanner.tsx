// components/HeroBanner.tsx

import { Play, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Training } from '@/types';

// Define as propriedades que o componente espera receber
type HeroBannerProps = {
  featuredTraining: Training;
  onInfoClick: (training: Training) => void;
};

export default function HeroBanner({ featuredTraining, onInfoClick }: HeroBannerProps) {
  // Verificação de segurança para garantir que o slug existe antes de criar o link
  const hasSlug = featuredTraining && featuredTraining.slug;

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 py-12">

      <div className="w-full md:w-1/2">
        <Image
          src={featuredTraining.thumbnailUrl} 
          alt={featuredTraining.title}
          width={600}
          height={400}
          className="rounded-lg object-cover shadow-lg"
          priority
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-start text-left">
        <span className="text-emex-verde font-bold text-sm mb-2">POR ONDE COMEÇAR</span>

        <h2 className="text-4xl lg:text-5xl font-bold">
          <span className="text-emex-laranja">{featuredTraining.fullTitle?.split(' ')[0] || ''}</span> {featuredTraining.fullTitle?.substring(featuredTraining.fullTitle?.indexOf(' ') + 1) || featuredTraining.title}
        </h2>

        <p className="mt-4 text-lg text-gray-300">
          {featuredTraining.description}
        </p>

        <div className="flex items-center mt-8 space-x-4">
          
          {/* Botão "Assistir" com o link e estilo corretos */}
          {hasSlug && (
            <Link href={`/watch/${featuredTraining.slug}`} passHref>
              <button className="flex items-center justify-center bg-white text-black font-bold px-6 py-3 rounded hover:bg-gray-300 transition-colors duration-300 cursor-pointer">
                <Play className="h-6 w-6 mr-2" /> Assistir
              </button>
            </Link>
          )}

          {/* Botão "Mais Informações" com o estilo correto */}
          <button 
            onClick={() => onInfoClick(featuredTraining)}
            className="flex items-center justify-center bg-gray-600/70 text-white font-bold px-6 py-3 rounded hover:bg-gray-700/80 transition-colors duration-300 cursor-pointer"
          >
            <Info className="h-6 w-6 mr-2" /> Mais Informações
          </button>
        </div>
      </div>

    </div>
  );
}