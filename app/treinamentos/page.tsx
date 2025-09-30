import { Suspense } from 'react'; // 1. Importe o Suspense
import { client } from '@/lib/sanityClient';
import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import TrainingListClient from './TrainingListClient'; // 2. Importe o novo componente
import type { PageData } from '@/types';

async function getData(): Promise<PageData> {
  const query = `*[_type == "homepage" && _id == "homepage"][0]{
    "heroTrainings": *[_type == "training" && _id in ^.heroCarouselTrainingIds[]->._id]{
      _id, title, "thumbnailUrl": thumbnailUrl.asset->url, description, slug
    },
    "categories": *[_type == "category"] | order(title asc){
      _id, title, slug,
      "trainings": *[_type == "training" && references(^._id)]{
         _id, title, "thumbnailUrl": thumbnailUrl.asset->url, description, slug
      }
    }
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function TrainingsPage() {
  const data = await getData();

  if (!data) {
    return <div>Não foi possível carregar os dados.</div>;
  }

  return (
    <div>
      <Navbar />
      <main>
        {/* O HeroCarousel não depende da busca, então ele pode ficar fora do Suspense */}
        <section className="bg-emex-preto">
          <HeroCarousel trainings={data.heroTrainings} />
        </section>

        {/* 3. Envolva o componente de cliente com <Suspense> */}
        <Suspense fallback={<div className="bg-secao-conteudo text-white text-center p-12">Carregando busca...</div>}>
          <TrainingListClient categories={data.categories} />
        </Suspense>

      </main>
    </div>
  );
}