"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import TrainingCarousel from '@/components/TrainingCarousel';
import Footer from '@/components/Footer';
import TrainingModal from '@/components/TrainingModal';
import data from '@/data/trainings.json';

type Training = {
  id: string;
  title: string;
  thumbnailUrl: string;
  description?: string;
  fullTitle?: string;
};

export default function TrainingsPage() {
  // Removemos a lógica antiga e lemos apenas as categorias
  const { categories } = data;

  // NOVA LÓGICA: Pega o primeiro treinamento de cada categoria para o banner
  const heroTrainings = categories.map(category => category.trainings[0]).filter(Boolean); // .filter(Boolean) remove qualquer item indefinido se uma categoria estiver vazia

  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  return (
    <div>
      <Navbar />

      <main>
        {/* A Navbar agora é estática, então não precisamos mais do pt-24 */}
        <section className="bg-emex-preto">
          {/* O HeroCarousel agora recebe a lista dinâmica */}
          <HeroCarousel trainings={heroTrainings} />
        </section>

        <section className="bg-secao-conteudo py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            {categories.map((category) => (
              <TrainingCarousel
                key={category.slug}
                title={category.title}
                slug={category.slug}
                trainings={category.trainings}
                onInfoClick={setSelectedTraining}
              />
            ))}
          </div>
          <Footer />
        </section>

      </main>

      {selectedTraining && (
        <TrainingModal 
          training={selectedTraining} 
          onClose={() => setSelectedTraining(null)}
        />
      )}
    </div>
  );
}