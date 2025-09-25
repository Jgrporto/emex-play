"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrainingCard from '@/components/TrainingCard';
import TrainingModal from '@/components/TrainingModal';
import data from '@/data/trainings.json';

type Training = {
  id: string;
  title: string;
  thumbnailUrl: string;
  description?: string;
};

// MUDANÇA PRINCIPAL: Usamos 'any' para as props para contornar o erro de build.
export default function CategoryPage({ params }: any) {
  const { categories } = data;
  const { slug } = params;

  const category = categories.find(cat => cat.slug === slug);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col justify-center items-center bg-emex-preto text-white">
          <h1 className="text-3xl font-bold">Categoria não encontrada.</h1>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-secao-conteudo min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-12 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl font-bold text-white mb-8">
            Categoria: <span className="text-emex-azul-claro">{category.title}</span>
          </h1>
          
          {category.trainings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {category.trainings.map(training => (
                <TrainingCard 
                  key={training.id}
                  training={training}
                  onInfoClick={setSelectedTraining}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Não há treinamentos nesta categoria no momento.</p>
          )}
        </div>
      </main>

      <Footer />

      {selectedTraining && (
        <TrainingModal 
          training={selectedTraining} 
          onClose={() => setSelectedTraining(null)}
        />
      )}
    </div>
  );
}