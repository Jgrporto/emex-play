'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// 1. A função 'update' é REMOVIDA desta linha de importação
import { useSession } from 'next-auth/react'; 

type FavoritesContextType = {
  favorites: string[];
  isFavorited: (trainingId: string) => boolean;
  toggleFavorite: (trainingId: string) => void;
  isLoading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // 2. A função 'update' é OBTIDA AQUI, como um retorno do hook useSession
  const { data: session, update } = useSession(); 
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega os favoritos da sessão para o estado local
  useEffect(() => {
    if (session) {
      const userFavorites = session.user.favorites || []; 
      setFavorites(userFavorites);
      setIsLoading(false);
    }
  }, [session]);

  // Função para verificar se um item é favorito
  const isFavorited = (trainingId: string) => {
    return favorites.includes(trainingId);
  };

  // Função principal de toggle (com Atualização Otimista)
  const toggleFavorite = async (trainingId: string) => {
    const optimisticFavorites = [...favorites];
    let newFavorites: string[];

    // --- Atualização Otimista (Instantânea na UI) ---
    if (isFavorited(trainingId)) {
      newFavorites = favorites.filter(id => id !== trainingId); // Remove
    } else {
      newFavorites = [...favorites, trainingId]; // Adiciona
    }
    setFavorites(newFavorites); // Atualiza a UI imediatamente

    try {
      // --- Sincronização com o Backend ---
      const response = await fetch('/api/favorites/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trainingId }),
        credentials: 'include', // Envia o cookie de sessão
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`[FavoritesContext] Erro da API: ${response.status}`, errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`); 
      }
      
      // 3. Verifica se a função 'update' foi obtida com sucesso antes de chamar
      if (update) {
        await update({ favorites: newFavorites });
      } else {
        console.warn("[FavoritesContext] A função 'update' da sessão não está disponível.");
      }

    } catch (error) {
      console.error("[FavoritesContext] Erro no toggleFavorite, revertendo:", error);
      // Reverte a UI em caso de erro
      setFavorites(optimisticFavorites); 
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorited, toggleFavorite, isLoading }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

