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
      <section className="bg-secao-conteudo py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <TrainingCarousel
                key={category._id}
                title={category.title}
                slug={category.slug.current}
                trainings={category.trainings}
                onInfoClick={setSelectedTraining}
              />
            ))
          ) : (
            <div className="text-center text-gray-400 py-16">
               <h2 className="text-4xl font-bold text-white mb-2">Ops!</h2>
               <p className="text-lg mb-8">Não encontramos nada em nossa plataforma que corresponda à sua pesquisa.</p>
               <Link href="/" className="bg-emex-azul-claro text-white font-bold px-6 py-3 rounded hover:brightness-110 transition-all duration-300">
                 Voltar para a página inicial
               </Link>
            </div>
          )}
        </div>
      </section>

      {selectedTraining && (
        <TrainingModal 
          training={selectedTraining} 
          onClose={() => setSelectedTraining(null)}
        />
      )}
    </>
  );
}