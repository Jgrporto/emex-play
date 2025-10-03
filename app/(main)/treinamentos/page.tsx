// app/(main)/treinamentos/page.tsx

import { Suspense } from 'react';
import { client } from '@/lib/sanityClient';
import TrainingListClient from './TrainingListClient';
import type { Category } from '@/types';

async function getCategoriesData(): Promise<Category[]> {
  const query = `*[_type == "category"] | order(title asc){
    _id,
    title,
    "slug": slug.current, // <-- A CORREÇÃO ESTÁ AQUI
    "trainings": *[_type == "training" && references(^._id)]{
       _id,
       title,
       description,
       "slug": slug.current,
       "thumbnailUrl": thumbnailUrl.asset->url,
       platform
    }
  }`;
  
  const data = await client.fetch(query);
  return data;
}

export default async function TrainingsPage() {
  const categories = await getCategoriesData();

  if (!categories || categories.length === 0) {
    return (
      <main className="pt-24 bg-emex-preto min-h-screen text-white flex items-center justify-center">
        <p>Nenhum treinamento encontrado.</p>
      </main>
    );
  }

  return (
    // GARANTA QUE O PADDING LATERAL (px-...) ESTÁ AQUI
    <main className="pt-24 bg-emex-preto px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-white text-center p-12">Carregando treinamentos...</div>}>
        <TrainingListClient categories={categories} />
      </Suspense>
    </main>
  );
}