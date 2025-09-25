"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrainingCard from '@/components/TrainingCard';
import TrainingModal from '@/components/TrainingModal';
import { useMyList } from '@/hooks/useMyList'; // Importamos nosso hook
import data from '@/data/trainings.json';
import Link from 'next/link';

// Definimos o tipo Training aqui
type Training = {
  id: string;
  title: string;
  thumbnailUrl: string;
  description?: string;
};

export default function MyListPage() {
  // Usamos nosso hook para pegar a lista de IDs salvos
  const { myList } = useMyList();
  
  // Pegamos todos os treinamentos e transformamos em uma lista única
  const allTrainings = data.categories.flatMap(category => category.trainings);

  // Filtramos a lista completa para ter apenas os treinamentos cujo ID está em 'myList'
  const savedTrainings = allTrainings.filter(training => myList.includes(training.id));

  // Lógica para o modal de detalhes, igual nas outras páginas
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  return (
    <div className="bg-secao-conteudo min-h-screen">
      <Navbar />
      
      <main>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl font-bold text-white mb-8">
            Minha Lista
          </h1>
          
          {/* Verificamos se a lista está vazia */}
          {savedTrainings.length > 0 ? (
            // Se tiver itens, mostramos a grade de cards
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {savedTrainings.map(training => (
                <TrainingCard 
                  key={training.id}
                  training={training}
                  onInfoClick={setSelectedTraining}
                />
              ))}
            </div>
          ) : (
            // Se estiver vazia, mostramos uma mensagem amigável
            <div className="text-center text-gray-400 py-16">
              <p className="text-xl mb-4">Sua lista está vazia.</p>
              <p>Clique no ícone + nos treinamentos para adicioná-los aqui.</p>
              <Link href="/treinamentos" className="mt-8 inline-block bg-emex-verde text-white font-bold px-6 py-3 rounded hover:brightness-110 transition-all duration-300">
                Explorar Treinamentos
              </Link>
            </div>
          )}
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