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
  // Verificação de segurança mais limpa para o slug
  const hasSlug = featuredTraining?.slug?.current;

  return (
    // Container principal com duas colunas
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4 py-12">

      {/* --- COLUNA ESQUERDA: IMAGEM --- */}
      <div className="w-full md:w-1/2">
        {/* CORREÇÃO PRINCIPAL: Uso do operador ternário para renderização condicional */}
        {featuredTraining.thumbnailUrl ? (
          <Image
            src={featuredTraining.thumbnailUrl} 
            alt={featuredTraining.title}
            width={600}
            height={400}
            className="rounded-lg object-cover shadow-lg w-full h-auto" // Adicionado w-full e h-auto para responsividade
            priority
          />
        ) : (
          // Placeholder: Mostra uma caixa cinza se não houver imagem
          <div className="w-full aspect-video bg-emex-cinza-escuro rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Imagem de Destaque Indisponível</span>
          </div>
        )}
      </div>

      {/* --- COLUNA DIREITA: CONTEÚDO DE TEXTO E BOTÕES --- */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-4xl lg:text-5xl font-bold text-white">
          {/* Lógica para destacar a primeira palavra, com segurança para undefined */}
          <span className="text-emex-laranja">{featuredTraining.fullTitle?.split(' ')[0] || ''}</span> {featuredTraining.fullTitle?.substring(featuredTraining.fullTitle?.indexOf(' ') + 1) || featuredTraining.title}
        </h2>

        <p className="mt-4 text-lg text-gray-300">
          {featuredTraining.description}
        </p>

        <div className="flex items-center justify-center md:justify-start mt-8 space-x-4">
          
          {/* Botão "Assistir" com link corrigido */}
          {hasSlug && (
            <Link href={`/watch/${featuredTraining.slug.current}`} passHref>
              <button className="flex items-center justify-center bg-white text-black font-bold px-6 py-3 rounded hover:bg-gray-300 transition-colors duration-300 cursor-pointer">
                <Play className="h-6 w-6 mr-2" fill="currentColor" /> Assistir
              </button>
            </Link>
          )}

          {/* Botão "Mais Informações" */}
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