// components/TrainingModal.tsx

'use client';

import type { Training, Episode } from '@/types';
import Image from 'next/image';
import { X, Play, Plus, ThumbsUp, ThumbsDown } from 'lucide-react';
import Link from 'next/link';

interface TrainingModalProps {
  training: Training;
  onClose: () => void;
}

// Pequeno componente para a linha do episódio
function EpisodeRow({ episode }: { episode: Episode }) {
  if (!episode.thumbnail?.asset?.url) return null; // Segurança

  return (
    <div className="episode-item">
      <div className="thumbnail">
        <Image src={episode.thumbnail.asset.url} alt={episode.title} fill className="object-cover" />
      </div>
      <div className="details">
        <h3 className="title">{episode.title}</h3>
        <p className="description">{episode.description}</p>
      </div>
    </div>
  );
}

export default function TrainingModal({ training, onClose }: TrainingModalProps) {
  // Verificação de segurança
  if (!training) return null;

  return (
    <div className="training-modal-overlay" onClick={onClose}>
      <div className="training-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="action-button modal-close-button" onClick={onClose}>
          <X size={20} />
        </button>

        {/* --- SEÇÃO DO BANNER --- */}
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
              <Link href={`/watch/${training.slug.current}`} className="modal-play-button">
                <Play size={20} fill="currentColor" />
                <span>Iniciar</span>
              </Link>
              <button className="action-button btn-favorite"><Plus size={20} /></button>
              <button className="action-button btn-like"><ThumbsUp size={20} /></button>
              <button className="action-button btn-dislike"><ThumbsDown size={20} /></button>
            </div>
            <p className="modal-description">{training.description}</p>
          </div>
        </div>

        {/* --- SEÇÃO DA LISTA DE EPISÓDIOS --- */}
        {training.episodes && training.episodes.length > 0 && (
          <div className="modal-content-body">
            <h2 className="episodes-title">Episódios ({training.episodes.length})</h2>
            <div className="episodes-list">
              {training.episodes.map((episode) => (
                <EpisodeRow key={episode._id} episode={episode} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}