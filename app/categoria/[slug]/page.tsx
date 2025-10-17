// app/(main)/categoria/[slug]/page.tsx

import { client } from '@/lib/sanityClient';
import type { Category, Training } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrainingGridCard from '@/components/TrainingGridCard';



// --- MUDANÇA 1: Criada uma interface para as props da página ---
interface Props {
  params: {
    slug: string;
  };
}

async function getData(slug: string) {
  // A query já está correta, buscando title, description e os treinamentos
  const query = `*[_type == "category" && slug.current == $slug][0]{
    title,
    description,
    "trainings": *[_type == "training" && references(^._id)]{
      _id, title, description, slug, "thumbnailUrl": thumbnailUrl.asset->url, duration, level
    }
  }`;
  const data = await client.fetch(query, { slug });
  return data;
}

export default async function CategoryPage({ params }: Props) {
  const category: (Category & { trainings: Training[] }) | null = await getData(params.slug);

  if (!category) {
    return (
      <div className="bg-emex-preto min-h-screen">
        <Navbar isFixed={true} />
        <main className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold text-white">Categoria não encontrada.</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-emex-preto">
      <Navbar isFixed={true} />
      
      {/* --- CABEÇALHO IMERSIVO (AGORA MAIS LIMPO) --- */}
      <header className="pt-24 pb-1 text-center bg-gradient-to-b from-emex-cinza-escuro to-emex-preto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* --- MUDANÇA AQUI --- */}
          {/* O parágrafo <p> dos breadcrumbs foi REMOVIDO */}
          
          
          {category.description && (
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
        </div>
      </header>
      
      {/* --- GRID DE TREINAMENTOS --- */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {category.trainings && category.trainings.length > 0 ? (
          <>
            <h1 className="category-title-underline text-4xl font-bold text-white mb-8 pb-2 ">{category.title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.trainings.map((training) => (
                <TrainingGridCard key={training._id} training={training} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Não há treinamentos nesta categoria no momento.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}