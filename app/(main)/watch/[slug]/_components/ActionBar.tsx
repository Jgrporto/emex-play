'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Episode } from '@/types';
import { ChevronLeft, ChevronRight, Check, Loader2, Heart, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ActionBarProps {
  episode: Episode;
  seriesSlug: { current: string };
  prevEpisode?: Episode;
  nextEpisode?: Episode;
  isFavorited: boolean;
  hasLiked: boolean | null;
  onFavorite: () => void;
  onOpenLikeModal: () => void;
  onOpenDeslikeModal: () => void;
}

export function ActionBar({ 
  seriesSlug, 
  prevEpisode, 
  nextEpisode, 
  isFavorited, 
  hasLiked, 
  onFavorite, 
  onOpenLikeModal, 
  onOpenDeslikeModal 
}: ActionBarProps) {
  
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
        {prevEpisode ? <Link href={`/watch/${seriesSlug}?episode=${prevEpisode.episodeNumber}`} className="action-button btn-nav" title="Aula anterior"><ChevronLeft size={20} /></Link> : <span className="action-button opacity-50 cursor-not-allowed" title="Início do módulo"><ChevronLeft size={20} /></span>}
        <button onClick={handleComplete} disabled={isCompleted || isLoading} className="btn-complete action-button" data-state={completeButtonState}>
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
          <span>{isCompleted ? 'Concluído' : 'Concluir'}</span>
        </button>
        {nextEpisode ? <Link href={`/watch/${seriesSlug}?episode=${nextEpisode.episodeNumber}`} className="action-button btn-nav" title="Próxima aula"><ChevronRight size={20} /></Link> : <span className="action-button opacity-50 cursor-not-allowed" title="Fim do módulo"><ChevronRight size={20} /></span>}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onFavorite} className="action-button btn-favorite" data-state={isFavorited ? 'active' : 'default'} title="Favoritar"><Heart size={20} fill={isFavorited ? 'currentColor' : 'transparent'} /></button>
        <button onClick={onOpenLikeModal} className="action-button btn-like" data-state={hasLiked === true ? 'active' : 'default'} title="Gostei"><ThumbsUp size={20} fill={hasLiked === true ? 'currentColor' : 'transparent'} /></button>
        <button onClick={onOpenDeslikeModal} className="action-button btn-dislike" data-state={hasLiked === false ? 'active' : 'default'} title="Não gostei"><ThumbsDown size={20} fill={hasLiked === false ? 'currentColor' : 'transparent'} /></button>
      </div>
    </div>
  );
}