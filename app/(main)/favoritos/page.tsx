// app/(main)/favoritos/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { client } from '@/lib/sanityClient';
import { useFavorites } from '@/context/FavoritesContext';
import type { Training } from '@/types';
import TrainingGridCard from '@/components/TrainingGridCard';
import Loading from '@/components/Loading';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function FavoritosPage() {
  // 1. Pega os dados do contexto
  const { favorites: favoriteIDs, isLoading: isContextLoading } = useFavorites();

  // 2. Estados da página
  const [favoritedTrainings, setFavoritedTrainings] = useState<Training[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false); // <-- Flag para controlar a busca inicial

  // --- EFEITO 1: Busca os dados INICIAIS no Sanity ---
  useEffect(() => {
    // Roda apenas uma vez quando o contexto está pronto e os dados ainda não foram buscados
    if (!isContextLoading && !hasFetched) {
      setIsPageLoading(true);
      
      if (favoriteIDs.length === 0) {
        setIsPageLoading(false);
        setFavoritedTrainings([]);
        setHasFetched(true); // Marca que a busca (de nada) foi feita
        return;
      }

      const fetchFavoritesData = async () => {
        const query = `*[_type == "training" && _id in $favoriteIDs]{
          _id, title, description, slug, "thumbnailUrl": thumbnailUrl.asset->url, duration, level
        }`;
        
        try {
          const data = await client.fetch(query, { favoriteIDs });
          setFavoritedTrainings(data);
        } catch (error) {
          console.error("Falha ao buscar favoritos:", error);
        } finally {
          setIsPageLoading(false);
          setHasFetched(true); // Marca que a busca inicial foi concluída
        }
      };

      fetchFavoritesData();
    }
  }, [favoriteIDs, isContextLoading, hasFetched]); // Depende do contexto e da flag

  // --- EFEITO 2: A CORREÇÃO (Sincronização Otimista) ---
  // Este efeito "ouve" as mudanças na lista de IDs do contexto DEPOIS da carga inicial
  useEffect(() => {
    // Não roda na carga inicial (o Efeito 1 cuida disso)
    if (!hasFetched) {
      return;
    }

    // Filtra a lista de treinos ATUAL na tela para remover o que já não está nos IDs
    setFavoritedTrainings((currentTrainings) => {
      // Mantém apenas os treinos cujo ID está na lista de favoritos do contexto
      return currentTrainings.filter(training => favoriteIDs.includes(training._id));
    });

  }, [favoriteIDs, hasFetched]); // Depende da lista de IDs do contexto

  // 4. Renderiza o estado de carregamento global
  if (isContextLoading || isPageLoading) {
    return <Loading />;
  }

  // 5. Renderiza o conteúdo da página
  return (
    <div className="bg-emex-preto min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Cabeçalho da página */}
        <div className="category-page-header">
          <h1 className="title">Meus Favoritos</h1>
          {/* Atualiza a contagem em tempo real */}
          <span className="count">{favoritedTrainings.length} Treinamentos</span>
        </div>

        {/* Grid de Treinamentos */}
        {favoritedTrainings.length > 0 ? (
          <div className="training-grid">
            {favoritedTrainings.map((training) => (
              // O TrainingGridCard usa o mesmo FavoritesContext e
              // ao ser clicado, vai acionar o Efeito 2
              <TrainingGridCard key={training._id} training={training} />
            ))}
          </div>
        ) : (
          // Mensagem de estado vazio
          <div className="text-center py-16">
            <Heart size={48} className="text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Sua lista está vazia</h2>
            <p className="text-lg text-gray-400 mb-6">
              Clique no ícone de coração nos treinamentos para adicioná-los aqui.
            </p>
            <Link 
              href="/treinamentos" 
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explorar treinamentos
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}