// app/(main)/categoria/[slug]/page.tsx

import { client } from '@/lib/sanityClient';
import type { Category, Training } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrainingGridCard from '@/components/TrainingGridCard';

// --- CORREÇÃO 1: Criado um 'type' dedicado para as props da página ---
type CategoryPageProps = {
  params: {
    slug: string;
  };
};

async function getData(slug: string) {
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

// --- CORREÇÃO 2: A função agora usa o novo tipo 'CategoryPageProps' ---
export default async function CategoryPage({ params }: CategoryPageProps) {
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
    <div className="bg-emex-preto min-h-screen">
      <Navbar isFixed={true} />
      
      {/* Container principal que começa abaixo da Navbar */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-32">

        {/* --- MUDANÇA 2: Layout do cabeçalho e grid simplificado e corrigido --- */}
        <div className="category-title-underline flex justify-between items-baseline pb-4 mb-10">
          <h1 className="text-4xl font-bold text-white">{category.title}</h1>
          {category.trainings && (
            <span className="text-base font-medium text-gray-400">
              {category.trainings.length} Treinamentos
            </span>
          )}
        </div>

        {category.trainings && category.trainings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.trainings.map((training) => (
              <TrainingGridCard key={training._id} training={training} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-gray-400">Não há treinamentos nesta categoria no momento.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}