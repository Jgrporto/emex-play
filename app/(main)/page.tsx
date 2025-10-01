// app/page.tsx

import { client } from '@/lib/sanityClient';
import HomePageClient from '../HomePageClient'; // Mantemos seu componente de cliente
import type { Training } from '@/types'; // Importamos o tipo

// Adicionamos a tipagem para os dados que a página espera
interface PageData {
  featuredTraining: Training;
}

// Função para buscar os dados no servidor
async function getData(): Promise<PageData> {
  const query = `*[_type == "homepage" && _id == "homepage"][0]{
    "featuredTraining": featuredTraining->{
      _id,
      title,
      fullTitle,
      "thumbnailUrl": thumbnailUrl.asset->url,
      description,
      "slug": slug.current // <-- ESTA É A CORREÇÃO CRUCIAL
    }
  }`;

  const data = await client.fetch(query);
  return data;
}

// A página agora é um Componente de Servidor 'async'
export default async function HomePage() {
  const data = await getData();

  // Se não houver dados, podemos mostrar uma mensagem ou um estado de erro
  if (!data || !data.featuredTraining) {
    return <div>Não foi possível carregar o conteúdo da página inicial.</div>;
  }

  // Renderiza o componente de cliente, passando os dados buscados como props
  return <HomePageClient featuredTraining={data.featuredTraining} />;
}