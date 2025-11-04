// components/TrainingModal.tsx

'use client';

import type { Training, Episode } from '@/types';
import Image from 'next/image';
import { X, Play, Plus, ThumbsUp, ThumbsDown, Check } from 'lucide-react';
import Link from 'next/link';
import { useFavorites } from '@/context/FavoritesContext';

interface TrainingModalProps {
  training: Training;
  onClose: () => void;
}

// --- 1. COMPONENTE EPISODEROW ATUALIZADO ---
// Agora espera o slug da série e a função de fechar
interface EpisodeRowProps {
  episode: Episode;
  seriesSlug: string; // O slug (string) do treinamento
  onClose: () => void;
}

function EpisodeRow({ episode, seriesSlug, onClose }: EpisodeRowProps) {
  // Verifica se temos os dados mínimos para criar um link
  if (!episode.thumbnail?.asset?.url || typeof episode.episodeNumber === 'undefined' || !seriesSlug) {
    return null;
  }
  // Monta a URL correta
  const href = `/watch/${seriesSlug}?episode=${episode.episodeNumber}`;

  return (
    // A div agora é um Link clicável que também fecha o modal
    <Link href={href} onClick={onClose} className="episode-item">
      <div className="thumbnail">
        <Image src={episode.thumbnail.asset.url} alt={episode.title} fill className="object-cover" />
      </div>
      <div className="details">
        <h3 className="title">{episode.title}</h3>
        <p className="description">{episode.description}</p>
      </div>
    </Link>
  );
}

// --- COMPONENTE PRINCIPAL DO MODAL ---
export default function TrainingModal({ training, onClose }: TrainingModalProps) {
  const { isFavorited, toggleFavorite } = useFavorites();

  if (!training) return null;

  // --- 2. CORREÇÃO DA LÓGICA DO SLUG ---
  // Esta lógica robusta verifica se 'slug' é a string (como vem da query do modal)
  // OU se é o objeto (como pode vir de outras queries)
  const slugString = typeof training.slug === 'string' 
    ? training.slug 
    : (training.slug as { current: string })?.current;
  
  const hasSlug = !!slugString;
  const trainingId = training._id;

  return (
    <div className="training-modal-overlay" onClick={onClose}>
      <div className="training-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-banner">
          {training.thumbnailUrl && (
            <Image
              src={training.thumbnailUrl}
              alt={`Banner de ${training.title}`}
              fill
              className="modal-banner-image"
              priority
            />
          )}
          <div className="modal-banner-overlay"></div>
          <div className="modal-banner-content">
            <h1 className="modal-title">{training.title}</h1>
            <div className="modal-actions">
              
              {/* --- 3. BOTÃO INICIAR CORRIGIDO --- */}
              {/* O botão agora aparece e o link usa a 'slugString' correta */}
              {hasSlug && (
                <Link href={`/watch/${slugString}`} className="modal-play-button">
                  <Play size={20} fill="currentColor" />
                  <span>Iniciar</span>
                </Link>
              )}

              {/* --- 4. LÓGICA DE FAVORITOS ADICIONADA --- */}
              <button 
                onClick={() => toggleFavorite(trainingId)}
                className="action-button btn-favorite"
                data-state={isFavorited(trainingId) ? 'active' : 'default'}
                title={isFavorited(trainingId) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
              >
                {isFavorited(trainingId) ? <Check size={20} /> : <Plus size={20} />}
              </button>

              <button className="action-button btn-like"><ThumbsUp size={20} /></button>
              <button className="action-button btn-dislike"><ThumbsDown size={20} /></button>
            </div>
            <p className="modal-description">{training.description}</p>
          </div>
        </div>

        {/* --- 5. SEÇÃO DA LISTA DE EPISÓDIOS CORRIGIDA --- */}
        {training.episodes && training.episodes.length > 0 && (
          <div className="modal-content-body">
            <h2 className="episodes-title">Episódios ({training.episodes.length})</h2>
            <div className="episodes-list">
              {training.episodes.map((episode) => (
                // Agora passamos as props necessárias para o EpisodeRow
                <EpisodeRow 
                  key={episode._id} 
                  episode={episode}
                  seriesSlug={slugString as string} // Passa a string do slug
                  onClose={onClose}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

