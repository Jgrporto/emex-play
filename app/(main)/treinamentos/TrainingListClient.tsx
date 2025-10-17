'use client';

import { useState, useMemo, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';
import TrainingCarousel from '@/components/TrainingCarousel';
import TrainingModal from '@/components/TrainingModal';
import { client } from '@/lib/sanityClient';
import type { Category, Training } from '@/types'; // Adicionado PageData para corresponder às props
import Link from 'next/link';

export default function TrainingClient({ categories }: { categories: (Category & { trainings: Training[] })[] }) {
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // --- 2. LÓGICA PARA BLOQUEAR A ROLAGEM ---
  useEffect(() => {
    // Quando o modal abre (selectedTraining não é nulo)
    if (selectedTraining) {
      document.body.style.overflow = 'hidden';
    } else {
      // Quando o modal fecha
      document.body.style.overflow = 'auto';
    }

    // Função de "limpeza": garante que o scroll seja reativado se o componente for desmontado
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedTraining]); // Este efeito roda toda vez que 'selectedTraining' muda
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
    
    const query = `*[_type == "training" && _id == $id][0]{
      ..., 
      "slug": slug.current,
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
              
              // --- CORREÇÃO DEFINITIVA AQUI ---
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