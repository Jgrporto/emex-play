"use client";

import { createContext, useState, useContext, ReactNode } from 'react';

// Definimos o que o nosso contexto vai fornecer
type SearchContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

// Criamos o contexto
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Criamos o "Provedor" que vai gerenciar o estado
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <SearchContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </SearchContext.Provider>
  );
};

// Criamos um hook customizado para facilitar o uso do contexto
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};