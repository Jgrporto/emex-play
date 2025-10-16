// app/categoria/[slug]/page.tsx

import { client } from '@/lib/sanityClient';
import type { Category } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryList from './CategoryList';

// Função para buscar os dados da categoria específica no servidor
async function getData(slug: string) {
  const query = `*[_type == "category" && slug.current == $slug][0]{
    title,
    "trainings": *[_type == "training" && references(^._id)]{
      _id,
      title,
      "thumbnailUrl": thumbnailUrl.asset->url,
      description,
      slug
    }
  }`;

  const data = await client.fetch(query, { slug });
  return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CategoryPage({ params }: any) {
  const category: Category = await getData(params.slug);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-emex-preto">
        {/* MUDANÇA AQUI: Adicionada a propriedade isFixed={true} */}
        <Navbar isFixed={true} />
        {/* MUDANÇA AQUI: Adicionado padding-top para não ficar sob a navbar */}
        <main className="flex-grow flex flex-col justify-center items-center text-white pt-24">
          <h1 className="text-3xl font-bold">Categoria não encontrada.</h1>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-secao-conteudo min-h-screen">
      {/* MUDANÇA AQUI: Adicionada a propriedade isFixed={true} */}
      <Navbar isFixed={true} />

      {/* O padding 'pt-32' já existente é suficiente para a navbar fixa */}
      <main className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl font-bold text-white mb-8">
            Categoria: <span className="text-emex-azul-claro">{category.title}</span>
          </h1>

          {category.trainings.length > 0 ? (
            <CategoryList trainings={category.trainings} />
          ) : (
            <p className="text-gray-400">Não há treinamentos nesta categoria no momento.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}