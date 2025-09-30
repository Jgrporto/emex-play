// app/treinamentos/page.tsx

import { Suspense } from 'react';
import { client } from '@/lib/sanityClient';
import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import TrainingListClient from './TrainingListClient';
import Footer from '@/components/Footer';
import type { PageData } from '@/types';

async function getData(): Promise<PageData> {
  const query = `*[_type == "homepage" && _id == "homepage"][0]{
    "heroTrainings": *[_type == "training" && _id in ^.heroCarouselTrainingIds[]->._id]{
      _id,
      title,
      description,
      "slug": slug.current,
      "thumbnailUrl": thumbnailUrl.asset->url
    },
    "categories": *[_type == "category"] | order(title asc){
      _id,
      title,
      "slug": slug.current, // <-- CORREÇÃO ADICIONADA AQUI
      "trainings": *[_type == "training" && references(^._id)]{
         _id,
         title,
         description,
         "slug": slug.current,
         "thumbnailUrl": thumbnailUrl.asset->url
      }
    }
  }`;
  
  const data = await client.fetch(query);
  return data;
}

export default async function TrainingsPage() {
  const data = await getData();

  if (!data || !data.heroTrainings || !data.categories) {
    return (
      <div className="bg-emex-preto min-h-screen text-white flex items-center justify-center">
        <Navbar />
        <p>Não foi possível carregar os dados. Tente novamente mais tarde.</p>
      </div>
    );
  }

  return (
    <div className="bg-emex-preto">
      <Navbar />
      <main>
        <section className="bg-emex-preto">
          <HeroCarousel trainings={data.heroTrainings} />
        </section>

        <Suspense fallback={<div className="bg-secao-conteudo text-white text-center p-12">Carregando treinamentos...</div>}>
          <TrainingListClient categories={data.categories} />
        </Suspense>

      </main>
      <Footer /> 
    </div>
  );
}