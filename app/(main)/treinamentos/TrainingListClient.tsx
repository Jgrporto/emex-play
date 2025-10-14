"use client";

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import TrainingCarousel from '@/components/TrainingCarousel';
import TrainingModal from '@/components/TrainingModal';
import { client } from '@/lib/sanityClient';
import type { Category, Training } from '@/types';

export default function TrainingListClient({ categories }: { categories: Category[] }) {
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

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

  const handleInfoClick = async (training: Training) => {
    setIsLoadingDetails(true);
    
    // --- A CORREÇÃO ESTÁ AQUI ---
    const query = `*[_type == "training" && _id == $id][0]{
      ..., 
      "slug": slug.current, // Pede o slug da SÉRIE como texto
      "thumbnailUrl": thumbnailUrl.asset->url,
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
    <>
      <div className="space-y-12">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <TrainingCarousel
              key={category._id}
              title={category.title}
              slug={category.slug.current}
              trainings={category.trainings}
              onInfoClick={handleInfoClick}
            />
          ))
        ) : (
          <div className="text-center text-gray-400 py-16">
            {/* ... sua mensagem de "nenhum resultado" ... */}
          </div>
        )}
      </div>

      {selectedTraining && (
        <TrainingModal 
          training={selectedTraining} 
          onClose={() => setSelectedTraining(null)}
        />
      )}

      {isLoadingDetails && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-emex-verde border-gray-700 rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
}