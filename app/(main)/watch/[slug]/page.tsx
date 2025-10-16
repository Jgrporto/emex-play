// app/(main)/watch/[slug]/page.tsx

'use client'; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Training, Episode } from '@/types';
import { client } from '@/lib/sanityClient';
import { useParams, useSearchParams } from 'next/navigation';

// Componentes
import { VideoPlayer } from './_components/VideoPlayer';
import { EpisodeSidebar } from './_components/EpisodeSidebar';
import { ActionBar } from './_components/ActionBar';
import { ChevronLeft } from 'lucide-react';
import LikeModal from './_components/LikeModal';
import DislikeModal from './_components/DislikeModal';

async function getData(slug: string): Promise<{ series: Training | null; episodes: Episode[] }> {
  const query = `*[_type == "training" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, "category": category->{name, "slug": slug.current},
    "episodes": episodes[]->{
      _id, title, episodeNumber, description, "thumbnail": thumbnail{asset->}, youtubeVideoId
    } | order(episodeNumber asc)
  }`;
  const seriesData = await client.fetch(query, { slug });
  return { series: seriesData, episodes: seriesData?.episodes || [] };
}

// 2. REMOVA 'searchParams' DAS PROPS
export default function WatchPage() {
  const params = useParams();
  const searchParams = useSearchParams(); // <-- 3. USE O HOOK PARA OBTER OS PARÂMETROS DE BUSCA
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [series, setSeries] = useState<Training | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLikeModalOpen, setLikeModalOpen] = useState(false);
  const [isDeslikeModalOpen, setDeslikeModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [hasLiked, setHasLiked] = useState<boolean | null>(null);

  useEffect(() => {
    if (slug) {
      const fetchData = async () => {
        setIsLoadingData(true);
        const { series: fetchedSeries, episodes: fetchedEpisodes } = await getData(slug);
        setSeries(fetchedSeries);
        setEpisodes(fetchedEpisodes);
        setIsLoadingData(false);
      };
      fetchData();
    }
  }, [slug]);

  const handleOpenLikeModal = () => { setHasLiked(p => p === true ? null : true); setLikeModalOpen(true); };
  const handleOpenDeslikeModal = () => { setHasLiked(p => p === false ? null : false); setDeslikeModalOpen(true); };

  if (isLoadingData) {
    return <div className="flex justify-center items-center h-screen text-white">Carregando treinamento...</div>;
  }

  if (!series || episodes.length === 0) {
    return <div className="flex justify-center items-center h-screen text-white">Treinamento não encontrado.</div>;
  }

  // 4. ACESSE O PARÂMETRO COM O MÉTODO .get()
  const episodeParam = searchParams.get('episode');
  const currentEpisodeNumber = parseInt(episodeParam || '1', 10);
  
  const episodeToPlay = episodes.find(ep => ep.episodeNumber === currentEpisodeNumber) || episodes[0];
  const nextEpisode = episodes.find(ep => ep.episodeNumber === currentEpisodeNumber + 1);
  const prevEpisode = episodes.find(ep => ep.episodeNumber === currentEpisodeNumber - 1);

  if (!episodeToPlay) {
     return <div className="flex justify-center items-center h-screen text-white">Episódio não encontrado.</div>;
  }
  
  return (
    <>
      <main className="bg-emex-preto text-white">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="px-4 sm:px-6 lg:px-8">
                 <Link href={`/category/${series.category?.slug || ''}`} className="back-link-icon-hover inline-flex items-center gap-1 text-sm text-gray-400">
                    <ChevronLeft size={18} />
                    <span>Voltar para {series.category?.name || 'Categoria'}</span>
                </Link>
            </div>
          
          {/* --- ESTRUTURA CORRIGIDA --- */}
          {/* A classe 'gap-8' cria um espaço saudável entre as colunas */}
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Coluna Esquerda: Player e Ações */}
            {/* Ocupa 3/4 da largura em telas grandes */}
            <div className="px-4 sm:px-6 lg:px-8 py-1 w-full lg:w-2/3">
              <VideoPlayer episode={episodeToPlay} />
              <ActionBar
                episode={episodeToPlay}
                seriesSlug={series.slug!}
                prevEpisode={prevEpisode}
                nextEpisode={nextEpisode}
                isFavorited={isFavorited}
                hasLiked={hasLiked}
                onFavorite={() => setIsFavorited(p => !p)}
                onOpenLikeModal={handleOpenLikeModal}
                onOpenDeslikeModal={handleOpenDeslikeModal}
              />
              <h1 className="text-3xl font-bold mb-2">{episodeToPlay.title}</h1>
              <p className="text-gray-400">{episodeToPlay.description}</p>
            </div>

            {/* Coluna Direita: Sidebar de Episódios */}
            {/* Ocupa 1/4 da largura em telas grandes, garantindo que não seja achatada */}
            <div className="w-full lg:w-1/3">
              <EpisodeSidebar
                seriesTitle={series.title}
                episodes={episodes}
                currentEpisodeId={episodeToPlay._id}
                seriesSlug={series.slug!}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Renderização condicional dos seus modais */}
      {isLikeModalOpen && <LikeModal onClose={() => setLikeModalOpen(false)} trainingSlug={series.slug!} />}
      {isDeslikeModalOpen && <DislikeModal onClose={() => setDeslikeModalOpen(false)} trainingSlug={series.slug!} />}
    </>
  );
}