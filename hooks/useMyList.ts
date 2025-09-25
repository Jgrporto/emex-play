"use client";

import { useState, useEffect, useCallback } from 'react';

const LOCAL_STORAGE_KEY = 'emexPlayMyList';

// Função para ler do localStorage de forma segura
const getStoredList = (): string[] => {
  // GARANTIA: Só executa se estiver no navegador
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return [];
  }
};

export const useMyList = () => {
  // O estado agora é inicializado de forma segura com a função acima
  const [myList, setMyList] = useState<string[]>(getStoredList);

  // Efeito para salvar no localStorage sempre que 'myList' mudar
  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(myList));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }, [myList]);

  const toggleMyList = useCallback((trainingId: string) => {
    setMyList((prevList) => {
      if (prevList.includes(trainingId)) {
        // Remove da lista
        return prevList.filter((id) => id !== trainingId);
      } else {
        // Adiciona na lista
        return [...prevList, trainingId];
      }
    });
  }, []);

  const isInMyList = useCallback((trainingId: string) => {
    return myList.includes(trainingId);
  }, [myList]);

  // Retornamos as novas ferramentas
  return { myList, toggleMyList, isInMyList };
};