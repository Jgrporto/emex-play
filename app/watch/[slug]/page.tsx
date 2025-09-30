// app/watch/[slug]/page.tsx

import { client } from '@/lib/sanityClient';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WatchView from './WatchView'; // Importamos nosso novo componente de cliente
import type { Training, NextTraining } from '@/types'; // Importamos os tipos

// Tipo para o resultado completo da nossa query
type QueryResult = {
  training: Training;
  categoryTrainings: NextTraining[];
};

export default async function WatchPage({ params }: { params: { slug: string } }) {
  // Query GROQ para buscar o treinamento atual e TODOS os outros da mesma categoria
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

  // Se o treinamento principal não for encontrado, exibe a página 404
  if (!data || !data.training) {
    notFound();
  }

  // Lógica para encontrar os próximos treinamentos na lista
  const currentIndex = data.categoryTrainings.findIndex(t => t._id === data.training._id);
  
  // Pegamos os 3 próximos da lista. Se não houver, o slice retorna um array vazio.
  const nextTrainings = data.categoryTrainings.slice(currentIndex + 1, currentIndex + 4);

  return (
    <div className="bg-emex-preto min-h-screen text-white flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {/* Passamos os dados buscados para o componente de cliente */}
        <WatchView training={data.training} nextTrainings={nextTrainings} />
      </div>
      <Footer />
    </div>
  );
}