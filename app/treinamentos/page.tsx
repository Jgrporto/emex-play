'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { client } from '@/lib/sanityClient';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import TrainingCarousel from '@/components/TrainingCarousel';
import Footer from '@/components/Footer';
import TrainingModal from '@/components/TrainingModal';
import Loading from '@/components/Loading';
import type { PageData, Training } from '@/types';
import Link from 'next/link';

export default function TrainingsPage() {
  const [data, setData] = useState<PageData | null>(null);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  // Fetch dos dados apenas no client
  useEffect(() => {
    const query = `*[_type == "homepage" && _id == "homepage"][0]{
      "heroTrainings": *[_type == "training" && _id in ^.heroCarouselTrainingIds[]->._id]{_id, title, "thumbnailUrl": thumbnailUrl.asset->url, description, slug},
      "categories": *[_type == "category"] | order(title asc){_id, title, slug, "trainings": *[_type == "training" && references(^._id)]{_id, title, "thumbnailUrl": thumbnailUrl.asset->url, description, slug}}
    }`;
    client.fetch(query).then(setData).catch(console.error);
  }, []);

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

  if (!data) return <Loading />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Navbar />
      <main>
        {!searchQuery && (
          <section className="bg-emex-preto">
            <HeroCarousel trainings={data.heroTrainings} />
          </section>
        )}

        <section className="bg-secao-conteudo py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
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
          </div>
          <Footer />
        </section>
      </main>

      {selectedTraining && (
        <TrainingModal training={selectedTraining} onClose={() => setSelectedTraining(null)} />
      )}
    </motion.div>
  );
}
