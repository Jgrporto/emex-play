"use client";

import { useState } from 'react';
import HeroBanner from '@/components/HeroBanner';
import TrainingModal from '@/components/TrainingModal';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Training } from '@/types';

export default function HomePageClient({ featuredTraining }: { featuredTraining: Training }) {
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  return (
    <div>
      <main>
        <section className="bg-secao-apresentacao">
          {featuredTraining && (
            <HeroBanner 
              featuredTraining={featuredTraining} 
              onInfoClick={setSelectedTraining} 
            />
          )}
        </section>

        <section className="bg-secao-conteudo py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Nosso Catálogo</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Tudo o que você precisa para acelerar seu desenvolvimento profissional está a um clique de distância.
          </p>
          <Link href="/treinamentos" passHref>
              <button className="group flex items-center justify-center mx-auto bg-emex-verde text-white font-bold px-8 py-4 rounded transition-all duration-300 cursor-pointer btn-pro-hover">
                  Ver todos os treinamentos
                  <ArrowRight className="h-6 w-6 ml-2 icon-pro-hover" />
              </button>
          </Link>
        </section>
      </main>

      <div className="bg-secao-conteudo">
              </div>

      {selectedTraining && (
        <TrainingModal 
          training={selectedTraining} 
          onClose={() => setSelectedTraining(null)}
        />
      )}
    </div>
  );
}