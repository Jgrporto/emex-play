"use client"; // Necessário para a interatividade do modal

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrainingCard from '@/components/TrainingCard';
import TrainingModal from '@/components/TrainingModal';
import data from '@/data/trainings.json';

// Definimos o tipo Training aqui
type Training = {
  id: string;
  title: string;
  thumbnailUrl: string;
  description?: string;
};

// A página recebe 'params' que contém o slug da URL
export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { categories } = data;
  const { slug } = params;

  // Encontra a categoria correspondente ao slug da URL
  const category = categories.find(cat => cat.slug === slug);

  // Estado para controlar o modal, assim como nas outras páginas
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  // Se a categoria não for encontrada, exibe uma mensagem de erro
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-emex-preto text-white">
        <h1 className="text-3xl font-bold">Categoria não encontrada.</h1>
      </div>
    )
  }

  return (
    <div className="bg-secao-conteudo min-h-screen">
      <Navbar />

      <main animate-fade-in>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl font-bold text-white mb-8">
            Categoria: <span className="text-emex-azul-claro">{category.title}</span>
          </h1>

          {/* Grid responsivo para os cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {category.trainings.map(training => (
              <TrainingCard 
                key={training.id}
                training={training}
                onInfoClick={setSelectedTraining}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* Renderiza o Modal se um treinamento for selecionado */}
      {selectedTraining && (
        <TrainingModal 
          training={selectedTraining} 
          onClose={() => setSelectedTraining(null)}
        />
      )}
    </div>
  );
}