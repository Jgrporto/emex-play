// app/watch/[slug]/page.tsx

import { client } from '@/lib/sanityClient';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WatchView from './WatchView';
import type { Training, NextTraining } from '@/types';

type QueryResult = {
  training: Training;
  categoryTrainings: NextTraining[];
};

// Adicione o comentário abaixo para desabilitar a regra do ESLint APENAS para a próxima linha
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any) {
  const query = `*[_type == "training" && slug.current == $slug][0]{ title }`;
  const training = await client.fetch<{ title: string }>(query, { slug: params.slug });
  return {
    title: `${training?.title || 'Treinamento'} | EMEX Play`,
  };
}

// Adicione o comentário abaixo para desabilitar a regra do ESLint APENAS para a próxima linha também
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function WatchPage({ params }: any) {
  const slug = params.slug as string;

  const query = `
    {
      "training": *[_type == "training" && slug.current == $slug][0]{
        _id,
        title,
        description,
        youtubeVideoId,
        "slug": slug.current,
        "thumbnailUrl": thumbnailUrl.asset->url,
        "category": category->{_id}
      },
      "categoryTrainings": *[_type == "training" && references(*[_type=="training" && slug.current == $slug][0].category._ref)] | order(title asc) {
        _id,
        title,
        "slug": slug.current,
        "thumbnailUrl": thumbnailUrl.asset->url
      }
    }
  `;

  const data = await client.fetch<QueryResult>(query, { slug: slug });

  if (!data || !data.training) {
    notFound();
  }

  const currentIndex = data.categoryTrainings.findIndex(t => t._id === data.training._id);
  const nextTrainings = data.categoryTrainings.slice(currentIndex + 1, currentIndex + 4);

  return (
    <div className="bg-emex-preto min-h-screen text-white flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <WatchView training={data.training} nextTrainings={nextTrainings} />
      </div>
      <Footer />
    </div>
  );
}