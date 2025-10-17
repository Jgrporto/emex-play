'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import TrainingCarousel from '@/components/TrainingCarousel';
import TrainingModal from '@/components/TrainingModal';
import type { PageData, Training } from '@/types';
import Link from 'next/link';
import { client } from '@/lib/sanityClient';

interface Props {
  initialData: PageData;
}

export default function TrainingClient({ initialData }: Props) {
  const [data] = useState<PageData>(initialData);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

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

  const handleInfoClick = async (training: Training) => {
    setIsLoadingDetails(true);
    
    const query = `*[_type == "training" && _id == $id][0]{
      ...,
      "episodes": episodes[]->{
        _id,
        title,
        episodeNumber,
        description,
        "thumbnail": thumbnail{asset->{url}},
        youtubeVideoId
      } | order(episodeNumber asc)
    }`;

    try {
      const fullTrainingData = await client.fetch(query, { id: training._id });
      setSelectedTraining(fullTrainingData);
    } catch (error) {
      console.error("Erro ao buscar detalhes da série:", error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* O HeroCarousel não está no seu page.tsx, então removi a referência a heroTrainings por enquanto */}
      {/* {!searchQuery && <HeroCarousel trainings={data.heroTrainings} />} */}
      
      {filteredCategories.length > 0 ? (
        filteredCategories.map(category => (
          <TrainingCarousel
            key={category._id}
            title={category.title}
            
            // --- CORREÇÃO PRINCIPAL AQUI ---
            // Alterado de 'category.slug.current' para apenas 'category.slug'
            slug={category.slug} 
            
            trainings={category.trainings}
            onInfoClick={handleInfoClick}
          />
        ))
      ) : (
        <div className="text-center text-gray-400 py-16">
          <h2 className="text-4xl font-bold text-white mb-2">Ops!</h2>
          <p className="text-lg mb-8">Não encontramos nada que corresponda à sua pesquisa.</p>
          <Link
            href="/treinamentos"
            className="bg-emex-azul-claro text-white font-bold px-6 py-3 rounded hover:brightness-110 transition-all duration-300"
          >
            Limpar busca
          </Link>
        </div>
      )}

      {selectedTraining && (
        <TrainingModal training={selectedTraining} onClose={() => setSelectedTraining(null)} />
      )}

      {isLoadingDetails && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-emex-verde border-gray-700 rounded-full animate-spin"></div>
        </div>
      )}
    </motion.div>
  );
}