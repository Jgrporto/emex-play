// app/(main)/watch/[slug]/_components/ActionBar.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Episode } from '@/types';
import { ChevronLeft, ChevronRight, Check, Loader2, Heart, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext'; // 1. O hook que usaremos

interface ActionBarProps {
  seriesSlug: { current: string };
  trainingId: string; // 2. Precisamos do ID do treinamento (série)
  prevEpisode?: Episode;
  nextEpisode?: Episode;
  hasLiked: boolean | null;
  onOpenLikeModal: () => void;
  onOpenDeslikeModal: () => void;
  // As props 'isFavorited' e 'onFavorite' foram REMOVIDAS
}

export function ActionBar({ 
  seriesSlug, 
  trainingId, // 3. Recebemos o ID do treinamento
  prevEpisode, 
  nextEpisode, 
  hasLiked, 
  onOpenLikeModal, 
  onOpenDeslikeModal 
}: ActionBarProps) {
  
  // 4. Usamos o hook de Favoritos
  const { isFavorited, toggleFavorite } = useFavorites();
  
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    if (isCompleted || isLoading) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsCompleted(true);
    setIsLoading(false);
  };

  let completeButtonState = 'default';
  if (isLoading) completeButtonState = 'loading';
  if (isCompleted) completeButtonState = 'completed';

  return (
    <div className="flex justify-between items-center mb-4 mt-4 text-white">
      <div className="flex items-center gap-2">
        
        {/* CORREÇÃO DE SINTAXE: O href agora é um template literal `` */}
        {prevEpisode ? <Link href={`/watch/${seriesSlug.current}?episode=${prevEpisode.episodeNumber}`} className="action-button btn-nav" title="Aula anterior"><ChevronLeft size={20} /></Link> : <span className="action-button opacity-50 cursor-not-allowed" title="Início do módulo"><ChevronLeft size={20} /></span>}
        
        <button onClick={handleComplete} disabled={isCompleted || isLoading} className="btn-complete action-button" data-state={completeButtonState}>
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
          <span>{isCompleted ? 'Concluído' : 'Concluir'}</span>
        </button>
        
        {/* CORREÇÃO DE SINTAXE: O href agora é um template literal `` */}
        {nextEpisode ? <Link href={`/watch/${seriesSlug.current}?episode=${nextEpisode.episodeNumber}`} className="action-button btn-nav" title="Próxima aula"><ChevronRight size={20} /></Link> : <span className="action-button opacity-50 cursor-not-allowed" title="Fim do módulo"><ChevronRight size={20} /></span>}
      </div>
      
      <div className="flex items-center gap-2">
        {/* 5. LÓGICA DE FAVORITOS ATUALIZADA */}
        <button 
          onClick={() => toggleFavorite(trainingId)} 
          className="action-button btn-favorite" 
          data-state={isFavorited(trainingId) ? 'active' : 'default'} 
          title="Favoritar"
        >
          <Heart size={20} fill={isFavorited(trainingId) ? 'currentColor' : 'transparent'} />
        </button>
        
        <button onClick={onOpenLikeModal} className="action-button btn-like" data-state={hasLiked === true ? 'active' : 'default'} title="Gostei"><ThumbsUp size={20} fill={hasLiked === true ? 'currentColor' : 'transparent'} /></button>
        <button onClick={onOpenDeslikeModal} className="action-button btn-dislike" data-state={hasLiked === false ? 'active' : 'default'} title="Não gostei"><ThumbsDown size={20} fill={hasLiked === false ? 'currentColor' : 'transparent'} /></button>
      </div>
    </div>
  );
}