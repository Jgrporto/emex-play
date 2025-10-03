"use client";

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import TrainingCarousel from '@/components/TrainingCarousel';
import TrainingModal from '@/components/TrainingModal';
import type { Category, Training } from '@/types';

export default function TrainingListClient({ categories }: { categories: Category[] }) {
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;

    return categories.map(category => ({
      ...category,
      trainings: category.trainings.filter(training =>
        training.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    })).filter(category => category.trainings.length > 0);
  }, [searchQuery, categories]);

  return (
    <>
      <div className="space-y-12">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <TrainingCarousel
              key={category._id}
              title={category.title}
              // --- CORREÇÃO APLICADA AQUI ---
              // Adicionamos o .current para passar apenas o texto do slug
              slug={category.slug.current} 
              trainings={category.trainings}
              onInfoClick={setSelectedTraining}
            />
          ))
        ) : (
          <div className="text-center text-gray-400 py-16">
            <h2 className="text-4xl font-bold text-white mb-2">Ops!</h2>
            <p className="text-lg mb-8">Não encontramos nada em nossa plataforma que corresponda a <span className="text-emex-azul-claro font-bold">{searchQuery}</span>.</p>
            <Link href="/treinamentos" className="bg-emex-azul-claro text-white font-bold px-6 py-3 rounded hover:brightness-110 transition-all duration-300">
              Limpar busca
            </Link>
          </div>
        )}
      </div>

      {selectedTraining && (
        <TrainingModal 
          training={selectedTraining} 
          onClose={() => setSelectedTraining(null)}
        />
      )}
    </>
  );
}