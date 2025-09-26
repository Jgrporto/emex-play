"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/context/SearchContext';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchModal() {
  const { isOpen, closeModal } = useSearch();
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/treinamentos?q=${query}`);
      closeModal();
      setQuery('');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop - Clicar aqui fecha o modal
    <div 
      onClick={closeModal} 
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-start pt-24"
    >
      {/* Container do Modal - Clicar aqui DENTRO não fecha */}
      <motion.div 
        onClick={(e) => e.stopPropagation()}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full max-w-2xl"
      >
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por treinamentos..."
            className="w-full p-4 pl-12 bg-emex-cinza-claro text-lg text-white rounded-lg border-2 border-gray-700 focus:border-emex-azul-claro focus:outline-none"
            autoFocus
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <button type="button" onClick={closeModal} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
            <X />
          </button>
        </form>
      </motion.div>
    </div>
  );
}