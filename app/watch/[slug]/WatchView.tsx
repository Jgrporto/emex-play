// app/watch/[slug]/WatchView.tsx

"use client";

import { useState } from 'react';
import YouTube from 'react-youtube';
import NextTrainingCard from '@/components/NextTrainingCard';
import CommentsSection from '@/components/CommentsSection';
import { ThumbsUp, ThumbsDown, Bookmark } from 'lucide-react';
import LikeModal from '@/components/LikeModal';
import DislikeModal from '@/components/DislikeModal';
import type { Training, NextTraining } from '@/types';

type WatchViewProps = {
  training: Training;
  nextTrainings: NextTraining[];
};

export default function WatchView({ training, nextTrainings }: WatchViewProps) {
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [showDislikeModal, setShowDislikeModal] = useState(false);

  if (!training.youtubeVideoId) {
    return (
      <main className="max-w-4xl mx-auto p-8 pt-32 text-center">
        <h1 className="text-3xl font-bold text-white mb-3">{training.title}</h1>
        <div className="bg-emex-cinza-escuro p-4 rounded-lg text-gray-300 mt-8">
          <h2 className="text-xl font-semibold text-emex-laranja mb-4">Vídeo Indisponível</h2>
          <p className="text-base leading-relaxed">{training.description}</p>
        </div>
        <CommentsSection />
      </main>
    );
  }

  return (
    <main className="max-w-screen-xl mx-auto p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        <div className="w-full lg:flex-grow">
          
          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
            <YouTube 
              videoId={training.youtubeVideoId} 
              opts={{ width: '100%', height: '100%', playerVars: { autoplay: 1, rel: 0, modestbranding: 1 } }} 
              className="w-full h-full" 
            />
          </div>

          <h1 className="text-2xl font-bold text-white mb-3">{training.title}</h1>
          
          <div className="flex items-center space-x-6 mb-6 text-gray-300">
            <button onClick={() => setShowLikeModal(true)} className="flex items-center gap-2 hover:text-white transition-colors"><ThumbsUp size={20} /> Gostei</button>
            <button onClick={() => setShowDislikeModal(true)} className="flex items-center gap-2 hover:text-white transition-colors"><ThumbsDown size={20} /> Não Gostei</button>
            <button className="flex items-center gap-2 hover:text-white transition-colors"><Bookmark size={20} /> Salvar</button>
          </div>

          <div className="bg-emex-cinza-escuro p-4 rounded-lg text-gray-300">
            <p className="text-base leading-relaxed">{training.description}</p>
          </div>

          <CommentsSection />
        </div>

        <div className="w-full lg:w-96 flex-shrink-0">
          <h3 className="font-bold text-white text-xl mb-4">Próximos Treinamentos</h3>
          <div className="flex flex-col gap-4">
            {nextTrainings.map(next => (
              <NextTrainingCard key={next._id} training={next} />
            ))}
          </div>
        </div>

      </div>

      {showLikeModal && <LikeModal onClose={() => setShowLikeModal(false)} />}
      {showDislikeModal && <DislikeModal onClose={() => setShowDislikeModal(false)} />}
    </main>
  );
}