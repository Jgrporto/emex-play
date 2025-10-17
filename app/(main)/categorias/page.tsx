// app/(main)/categorias/page.tsx

import { client } from '@/lib/sanityClient';
import type { CategoryPageItem } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

// Função para buscar todas as categorias e suas imagens no servidor
async function getData(): Promise<CategoryPageItem[]> {
  const query = `*[_type == "category"] | order(title asc){
    _id,
    title,
    "slug": slug.current,
    "posterUrl": poster.asset->url
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function CategoriasPage() {
  const categories = await getData();

  return (
    // O Navbar e Footer são adicionados pelo seu layout principal
    <main className="bg-emex-preto text-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        
        <h1 className="text-4xl md:text-5xl font-bold mb-8 md:mb-12">
          Explorar Categorias
        </h1>

        {categories.length > 0 ? (
          // Grid responsivo para os cards das categorias
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link 
                key={category._id} 
                href={`/categoria/${category.slug}`} 
                className="category-card-hover group" // Classe para o efeito de hover
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  {category.posterUrl ? (
                    <Image
                      src={category.posterUrl}
                      alt={`Capa da categoria ${category.title}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    // Fallback caso não haja imagem
                    <div className="w-full h-full bg-emex-cinza-escuro flex items-center justify-center">
                      <p className="text-sm text-gray-400">Sem imagem</p>
                    </div>
                  )}

                  {/* Overlay gradiente para garantir a legibilidade do texto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                  <h2 className="absolute bottom-4 left-4 text-xl md:text-2xl font-bold">
                    {category.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Nenhuma categoria encontrada.</p>
        )}

      </div>
    </main>
  );
}