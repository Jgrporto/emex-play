// app/(main)/page.tsx

import { client } from '@/lib/sanityClient';
import type { Training } from '@/types';
import HomePageClient from './HomePageClient';

interface PageData {
  featuredTraining: Training;
}

async function getData(): Promise<PageData> {
  const query = `*[_type == "homepage" && _id == "homepage"][0]{
    "featuredTraining": featuredTraining->{
      _id,
      title,
      fullTitle,
      "thumbnailUrl": thumbnailUrl.asset->url,
      description,
      "slug": slug.current
    }
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function HomePage() {
  const data = await getData();

  if (!data || !data.featuredTraining) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center text-white">
        <div>Não foi possível carregar o conteúdo da página inicial.</div>
      </div>
    );
  }

  return (
    // A página agora simplesmente renderiza o componente de cliente, passando os dados
    <HomePageClient featuredTraining={data.featuredTraining} />
  );
}