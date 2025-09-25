"use client";

import { useState, useEffect, useCallback } from 'react';

const LOCAL_STORAGE_KEY = 'emexPlayMyList';

export const useMyList = () => {
  // 1. O estado SEMPRE inicia vazio no servidor.
  const [myList, setMyList] = useState<string[]>([]);

  // 2. Este useEffect SÓ roda no NAVEGADOR, após a página carregar.
  // É aqui que carregamos os dados salvos de forma segura.
  useEffect(() => {
    try {
      const storedList = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedList) {
        setMyList(JSON.parse(storedList));
      }
    } catch (error) {
      console.error("Error reading from localStorage", error);
    }
  }, []); // O array vazio [] garante que isso rode só uma vez no cliente.

  // 3. Este useEffect salva a lista sempre que ela muda, também só no navegador.
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
        return prevList.filter((id) => id !== trainingId);
      } else {
        return [...prevList, trainingId];
      }
    });
  }, []);

  const isInMyList = useCallback((trainingId: string) => {
    return myList.includes(trainingId);
  }, [myList]);

  return { myList, toggleMyList, isInMyList };
};