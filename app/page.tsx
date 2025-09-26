import { client } from '@/lib/sanityClient';
import HomePageClient from './HomePageClient'; // Importamos nosso novo componente

// Função para buscar os dados no servidor
async function getData() {
  // Esta query busca o documento 'homepage' e o treinamento referenciado nele
  const query = `*[_type == "homepage" && _id == "homepage"][0]{
    "featuredTraining": featuredTraining->{
      _id,
      title,
      fullTitle,
      "thumbnailUrl": thumbnailUrl.asset->url,
      description,
      slug
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