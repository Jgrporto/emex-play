// components/EpisodeListItem.tsx

"use client";

import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle } from 'lucide-react';
import type { Episode } from '@/types';

type EpisodeListItemProps = {
  episode: Episode;
  trainingSlug: string; // Recebe o slug da SÉRIE
};

export default function EpisodeListItem({ episode, trainingSlug }: EpisodeListItemProps) {
  return (
    // O link agora usa o slug da série e o número do episódio
    <Link href={`/watch/${trainingSlug}?episode=${episode.episodeNumber}`}>
      <div className="flex items-start gap-4 p-4 rounded-lg transition-colors duration-300 hover:bg-white/5 cursor-pointer group">
        
        <div className="text-2xl font-semibold text-gray-400">
          {episode.episodeNumber}
        </div>

        <div className="relative w-40 h-24 flex-shrink-0 rounded-md overflow-hidden">
          <Image
            src={episode.thumbnail.asset.url}
            alt={episode.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="160px"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center 
                         opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayCircle size={32} className="text-white/80" />
          </div>
        </div>

        <div className="flex-grow">
          <h4 className="font-bold text-white mb-1">{episode.title}</h4>
          <p className="text-sm text-gray-400 line-clamp-2">
            {episode.description}
          </p>
        </div>
      </div>
    </Link>
  );
}