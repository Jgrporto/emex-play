// app/(main)/watch/[slug]/_components/EpisodeSidebar.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanityImageUrl';
import type { Episode } from '@/types';

interface EpisodeSidebarProps {
  seriesTitle: string;
  episodes: Episode[];
  currentEpisodeId: string;
  seriesSlug: string;
}

export function EpisodeSidebar({ seriesTitle, episodes, currentEpisodeId, seriesSlug }: EpisodeSidebarProps) {
  return (
    <div className="bg-emex-cinza-escuro/50 border border-gray-700/50 rounded-lg p-4">
      <h3 className="text-lg font-bold text-white truncate">{seriesTitle}</h3>
      <p className="text-sm text-gray-400 mb-4">Aulas • {episodes.length} Conteúdos</p>
      <hr className="border-gray-700 mb-4" />

      <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
        {episodes.map(ep => (
          <Link key={ep._id} href={`/watch/${seriesSlug}?episode=${ep.episodeNumber}`}>
            <div className={`flex items-center gap-4 p-2 rounded-md transition-all duration-200 ${ep._id === currentEpisodeId ? 'bg-emex-azul-claro/20 border border-emex-azul-claro' : 'hover:bg-white/10 border border-transparent'}`}>
              <div className="relative w-28 h-16 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src={urlFor(ep.thumbnail).width(200).height(112).url()}
                  alt={ep.title}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <h4 className="font-semibold text-white text-sm leading-tight flex-1">
                {ep.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}