// app/(main)/watch/[slug]/page.tsx

import { client } from '@/lib/sanityClient';
import { urlFor } from '@/lib/sanityImageUrl';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import type { Training, Episode } from '@/types';

interface WatchPageData {
  series: Training | null;
  episodes: Episode[];
}

async function getData(slug: string): Promise<WatchPageData> {
  const query = `*[_type == "training" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    "episodes": episodes[]->{
      _id,
      title,
      episodeNumber,
      description,
      "thumbnail": thumbnail{asset->},
      youtubeVideoId
    } | order(episodeNumber asc)
  }`;

  const seriesData = await client.fetch(query, { slug });

  if (!seriesData) {
    return { series: null, episodes: [] };
  }

  return {
    series: seriesData,
    episodes: seriesData.episodes || [],
  };
}

// --- A CORREÇÃO ESTÁ AQUI ---
// Usamos 'any' para as props e desabilitamos o aviso do ESLint
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function WatchPage({ params, searchParams }: any) {
  const { series, episodes } = await getData(params.slug);

  if (!series || episodes.length === 0) {
    notFound();
  }

  const currentEpisodeNumber = parseInt(searchParams.episode || '1', 10);
  const episodeToPlay = episodes.find(ep => ep.episodeNumber === currentEpisodeNumber) || episodes[0];

  return (
    <main className="bg-emex-preto text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-2/3">
            <div className="aspect-video mb-6 bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${episodeToPlay.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title={episodeToPlay.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{series.title}</h1>
            <h2 className="text-xl text-gray-300 font-semibold mb-4">
              E{episodeToPlay.episodeNumber}: {episodeToPlay.title}
            </h2>
            <p className="text-gray-400">
              {episodeToPlay.description}
            </p>
          </div>

          <div className="w-full lg:w-1/3">
            <h3 className="text-2xl font-bold mb-4">Próximos Episódios</h3>
            <div className="space-y-4 max-h-[80vh] overflow-y-auto scrollbar-hide">
              {episodes.map(ep => (
                <Link key={ep._id} href={`/watch/${series.slug}?episode=${ep.episodeNumber}`}>
                  <div className={`flex items-start gap-4 p-3 rounded-lg transition-colors ${ep._id === episodeToPlay._id ? 'bg-emex-cinza-escuro' : 'hover:bg-white/5'}`}>
                    <div className="relative w-32 h-20 flex-shrink-0 rounded-md overflow-hidden group">
                      <Image
                        src={urlFor(ep.thumbnail).width(320).height(180).url()}
                        alt={ep.title}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle size={28} className="text-white/80" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">E{ep.episodeNumber}: {ep.title}</h4>
                      <p className="text-sm text-gray-400 line-clamp-2 mt-1">{ep.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}