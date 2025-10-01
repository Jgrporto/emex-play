'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import HeroCarousel from '@/components/HeroCarousel';
import TrainingCarousel from '@/components/TrainingCarousel';
import TrainingModal from '@/components/TrainingModal';
import type { PageData, Training } from '@/types';
import Link from 'next/link';

interface Props {
  initialData: PageData;
}

export default function TrainingClient({ initialData }: Props) {
  const [data] = useState<PageData>(initialData);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const filteredCategories = useMemo(() => {
    if (!data) return [];
    if (!searchQuery) return data.categories;
    return data.categories
      .map(category => ({
        ...category,
        trainings: category.trainings.filter(training =>
          training.title.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter(category => category.trainings.length > 0);
  }, [searchQuery, data]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {!searchQuery && <HeroCarousel trainings={data.heroTrainings} />}
      {filteredCategories.length > 0 ? (
        filteredCategories.map(category => (
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
          <p className="text-lg mb-8">Não encontramos nada que corresponda à sua pesquisa.</p>
          <Link
            href="/"
            className="bg-emex-azul-claro text-white font-bold px-6 py-3 rounded hover:brightness-110 transition-all duration-300"
          >
            Voltar para a página inicial
          </Link>
        </div>
      )}

      {selectedTraining && (
        <TrainingModal training={selectedTraining} onClose={() => setSelectedTraining(null)} />
      )}
    </motion.div>
  );
}
