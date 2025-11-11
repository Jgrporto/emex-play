'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react'; 

type FavoritesContextType = {
  favorites: string[];
  isFavorited: (trainingId: string) => boolean;
  toggleFavorite: (trainingId: string) => void;
  isLoading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { data: session, update } = useSession(); 
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      const userFavorites = session.user.favorites || []; 
      setFavorites(userFavorites);
      setIsLoading(false);
    }
  }, [session]);

  const isFavorited = (trainingId: string) => {
    return favorites.includes(trainingId);
  };

  const toggleFavorite = async (trainingId: string) => {
    const optimisticFavorites = [...favorites];
    let newFavorites: string[];

    if (isFavorited(trainingId)) {
      newFavorites = favorites.filter(id => id !== trainingId);
    } else {
      newFavorites = [...favorites, trainingId];
    }

    setFavorites(newFavorites);

    try {
      const response = await fetch('/api/favorites/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trainingId }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`[FavoritesContext] Erro da API: ${response.status}`, errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      if (update) {
        await update({ favorites: newFavorites });

        // <-- A LINHA NOVA FICA AQUI
        setFavorites(newFavorites);
      } else {
        console.warn("[FavoritesContext] A função 'update' da sessão não está disponível.");
      }

    } catch (error) {
      console.error("[FavoritesContext] Erro no toggleFavorite, revertendo:", error);
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
