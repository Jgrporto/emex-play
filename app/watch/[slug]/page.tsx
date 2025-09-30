// app/watch/[slug]/page.tsx

import { client } from '@/lib/sanityClient';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WatchView from './WatchView';
import type { Training, NextTraining } from '@/types';

// O 'type Props' foi removido daqui.

type QueryResult = {
  training: Training;
  categoryTrainings: NextTraining[];
};

// A CORREÇÃO ESTÁ AQUI: definimos o tipo diretamente na função, o que é mais explícito e seguro.
export default async function WatchPage({ params }: { params: { slug: string } }) {
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

  const data = await client.fetch<QueryResult>(query, { slug: params.slug });

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