import { Suspense } from 'react';
import { client } from '@/lib/sanityClient';
import { urlFor } from '@/lib/sanityImageUrl';
import TrainingListClient from './TrainingListClient';
import HeroBannerCarousel from '@/components/HeroBannerCarousel';
import type { Category, Banner } from '@/types';

type TreinamentosPageData = {
  categories: Category[];
  banners: Banner[];
};

async function getData(): Promise<TreinamentosPageData> {
  const query = `{
    "categories": *[_type == "category"] | order(title asc){
      _id, title, "slug": slug.current,
      "trainings": *[_type == "training" && references(^._id)]{
         _id, title, description, "slug": slug.current, "thumbnailUrl": thumbnailUrl.asset->url, platform
      }
    },
    "banners": *[_type == "bannerTreinamento" && ativo == true] | order(_createdAt desc){
      _id, titulo, descricao, link, mostrarBotao, textoDoBotao,
      // --- ALTERAÇÃO AQUI: Pedimos o objeto 'imagem' com o 'hotspot' ---
      "imagem": imagem{asset->, hotspot} 
    }
  }`;
  
  const data = await client.fetch(query);

  const bannersWithOptimizedImages = data.banners.map((banner: Banner) => ({
    ...banner,
    imagemUrlOtimizada: urlFor(banner.imagem)
      .width(1920)
      .quality(90)
      .fit('max')
      .auto('format')
      .url(),
  }));

  return {
    categories: data.categories,
    banners: bannersWithOptimizedImages,
  };
}

export default async function TrainingsPage() {
  const { categories, banners } = await getData();

  return (
    <main className="bg-emex-preto">
      
      {banners && banners.length > 0 && (
        <section className="relative z-10">
          <HeroBannerCarousel banners={banners} />
        </section>
      )}

      <div className="relative z-20 -mt-12 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-white text-center p-12">Carregando treinamentos...</div>}>
          <TrainingListClient categories={categories} />
        </Suspense>
      </div>

    </main>
  );
}