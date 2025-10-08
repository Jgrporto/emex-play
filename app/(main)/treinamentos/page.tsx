import { Suspense } from 'react';
import { client } from '@/lib/sanityClient';
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
      "imagem": imagem{asset->{url}}
    }
  }`;
  
  const data = await client.fetch(query);
  return data;
}

export default async function TrainingsPage() {
  const { categories, banners } = await getData();

  return (
    // A tag <main> AGORA NÃO TEM MAIS NENHUM PADDING NO TOPO.
    // Isso permite que o banner comece no topo da página.
    <main className="bg-emex-preto">
      
      {banners && banners.length > 0 && (
        // O banner agora tem um 'relative' para o z-index funcionar
        <section className="relative z-10">
          <HeroBannerCarousel banners={banners} />
        </section>
      )}

      {/* --- A MUDANÇA PRINCIPAL ESTÁ AQUI --- */}
      {/* Adicionamos uma margem negativa no topo ('-mt-20') para puxar esta seção para cima */}
      <div className="relative z-20 -mt-12 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-white text-center p-12">Carregando treinamentos...</div>}>
          <TrainingListClient categories={categories} />
        </Suspense>
      </div>

    </main>
  );
}