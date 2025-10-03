// app/(main)/HomePageClient.tsx

"use client";

import { useState } from 'react';
import HeroBanner from '@/components/HeroBanner';
import TrainingModal from '@/components/TrainingModal';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Training } from '@/types';

export default function HomePageClient({ featuredTraining }: { featuredTraining: Training }) {
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  const handleInfoClick = (training: Training) => {
    setSelectedTraining(training);
  };

  return (
    // Usamos um Fragment <> pois a tag <main> já está no layout principal
    <>
      {/* Seção 1: O fundo ocupa 100% da largura */}
      <section className="bg-secao-apresentacao pt-12">
        {/* Container interno para centralizar o HeroBanner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {featuredTraining && (
            <HeroBanner 
              featuredTraining={featuredTraining} 
              onInfoClick={handleInfoClick} 
            />
          )}
        </div>
      </section>

      {/* Seção 2: O fundo ocupa 100% da largura */}
      <section className="bg-secao-conteudo py-16">
        {/* Container interno para centralizar o conteúdo desta seção */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Explore Nosso Catálogo</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Tudo o que você precisa para acelerar seu desenvolvimento profissional está a um clique de distância.
          </p>
          <Link href="/treinamentos" passHref>
              <button className="flex items-center justify-center mx-auto bg-emex-verde text-white font-bold px-8 py-4 rounded hover:bg-opacity-80 transition-colors duration-200 cursor-pointer">
                Ver todos os treinamentos
                <ArrowRight className="h-6 w-6 ml-2" />
              </button>
          </Link>
        </div>
      </section>

      {/* A lógica do Modal continua aqui */}
      {selectedTraining && (
        <TrainingModal 
          training={selectedTraining} 
          onClose={() => setSelectedTraining(null)}
        />
      )}
    </>
  );
}