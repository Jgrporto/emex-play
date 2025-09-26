"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import YouTube from 'react-youtube';
import data from '@/data/trainings.json';
import NextTrainingCard from '@/components/NextTrainingCard';
import CommentsSection from '@/components/CommentsSection';
import { ThumbsUp, ThumbsDown, Bookmark } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LikeModal from '@/components/LikeModal';
import DislikeModal from '@/components/DislikeModal';

// Definimos o tipo Training para uso interno nesta página
type Training = {
  id: string;
  title: string;
  thumbnailUrl: string;
  description?: string;
  fullTitle?: string;
};

export default function WatchPage() {
  // --- Lógica de busca de dados ---
  const params = useParams();
  const videoId = params.id as string;

  const allTrainings: Training[] = [
    ...(data.featuredTraining ? [data.featuredTraining as Training] : []),
    ...data.categories.flatMap(category => category.trainings)
  ];
  
  const training = allTrainings.find(t => t.id === videoId);

  let nextTrainings: Training[] = [];
  if (training) {
    const currentCategory = data.categories.find(cat => cat.trainings.some(t => t.id === training.id));
    if (currentCategory) {
      const currentIndex = currentCategory.trainings.findIndex(t => t.id === training.id);
      nextTrainings = currentCategory.trainings.slice(currentIndex + 1, currentIndex + 4);
    }
  }

  const youtubeVideoMap: { [key: string]: string | undefined } = { 
    'apresentacao': 'SEU_ID_AQUI', 
    '1': '4QRPT8qozx4' 
  };
  const youtubeVideoId = training ? youtubeVideoMap[training.id] : undefined;
  
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [showDislikeModal, setShowDislikeModal] = useState(false);

  // --- Verificações de Erro ---
  if (!training) {
    return (
      <div className="bg-emex-preto min-h-screen text-white">
        <Navbar />
        <main className="flex-grow flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-3xl font-bold">Treinamento não encontrado.</h1>
          <p className="text-gray-400 mt-2">O link que você acessou pode estar quebrado ou o treinamento foi removido.</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!youtubeVideoId) {
    return (
      <div className="bg-emex-preto min-h-screen text-white">
        <Navbar />
        <main className="max-w-4xl mx-auto p-8 pt-32 text-center">
            <h1 className="text-3xl font-bold text-white mb-3">{training.title}</h1>
            <div className="bg-emex-cinza-escuro p-4 rounded-lg text-gray-300 mt-8">
                <h2 className="text-xl font-semibold text-emex-laranja mb-4">Vídeo Indisponível</h2>
                <p className="text-base leading-relaxed">{training.description}</p>
            </div>
            <CommentsSection />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-emex-preto min-h-screen text-white">
      <Navbar />
      
      <main className="max-w-screen-xl mx-auto p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Coluna Principal (Vídeo, Detalhes e Comentários) */}
          <div className="w-full lg:flex-grow">
            
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
              <YouTube 
                videoId={youtubeVideoId} 
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

          {/* Barra Lateral (Próximos Vídeos) */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <h3 className="font-bold text-white text-xl mb-4">Próximos Treinamentos</h3>
            <div className="flex flex-col gap-4">
              {nextTrainings.map(next => (
                <NextTrainingCard key={next.id} training={next} />
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />

      {/* Renderização condicional dos novos modais */}
      {showLikeModal && <LikeModal onClose={() => setShowLikeModal(false)} />}
      {showDislikeModal && <DislikeModal onClose={() => setShowDislikeModal(false)} />}
    </div>
  );
}