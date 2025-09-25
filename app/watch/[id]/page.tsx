"use client";

import { useParams } from 'next/navigation';
import YouTube from 'react-youtube';
import data from '@/data/trainings.json';
import NextTrainingCard from '@/components/NextTrainingCard';
import { ThumbsUp, ThumbsDown, Bookmark } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function WatchPage() {
  const params = useParams();
  const videoId = params.id as string;

  const allTrainings = data.categories.flatMap(category => category.trainings);
  if (data.featuredTraining) {
    allTrainings.unshift(data.featuredTraining);
  }
  
  const training = allTrainings.find(t => t.id === videoId);

  // --- Lógica para encontrar os próximos treinamentos ---
  let nextTrainings: typeof allTrainings = [];
  if (training) {
    const currentCategory = data.categories.find(cat => 
      cat.trainings.some(t => t.id === training.id)
    );
    if (currentCategory) {
      const currentIndex = currentCategory.trainings.findIndex(t => t.id === training.id);
      nextTrainings = currentCategory.trainings.slice(currentIndex + 1, currentIndex + 4);
    }
  }
  // ----------------------------------------------------

  const youtubeVideoMap: { [key: string]: string } = {
    'apresentacao': 'SEU_ID_DE_VIDEO_DE_BOAS_VINDAS',
    '1': '4QRPT8qozx4', 
  };
  
  const youtubeVideoId = training ? youtubeVideoMap[training.id] : null;

  // --- CORREÇÃO 1: Verificação de Treinamento ---
  // Se o treinamento não for encontrado, exibe uma mensagem e para a execução.
  if (!training) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col justify-center items-center bg-emex-preto text-white">
          <h1 className="text-3xl font-bold">Treinamento não encontrado.</h1>
        </main>
        <Footer />
      </div>
    );
  }

  // --- CORREÇÃO 2: Verificação de Vídeo ---
  // Se o vídeo para o treinamento não for encontrado no mapa, exibe uma mensagem.
  if (!youtubeVideoId) {
     return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col justify-center items-center bg-emex-preto text-white">
          <h1 className="text-3xl font-bold mb-4">Vídeo Indisponível</h1>
          <p className="text-gray-400">Este treinamento ainda não tem um vídeo associado.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-emex-preto min-h-screen text-white">
      <Navbar />
      
      <main animate-fade-in>
        
        <div className="w-full bg-black">
          <div className="aspect-video max-w-screen-2xl mx-auto">
            <YouTube 
              videoId={youtubeVideoId} 
              opts={{ width: '100%', height: '100%', playerVars: { autoplay: 1, rel: 0, modestbranding: 1, iv_load_policy: 3 } }} 
              className="w-full h-full" 
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            <div className="w-full lg:w-2/3">
              {/* Agora o TypeScript sabe que 'training' com certeza existe aqui */}
              <h1 className="text-3xl font-bold text-white mb-2">{training.title}</h1>
              <p className="text-sm text-gray-400 mb-4">Disponível</p>
              
              <div className="flex items-center space-x-4 mb-6">
                <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"><ThumbsUp size={20} /> Gostei</button>
                <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"><ThumbsDown size={20} /> Não Gostei</button>
                <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"><Bookmark size={20} /> Salvar</button>
              </div>

              <p className="text-gray-300 leading-relaxed">
                {training.description}
              </p>
              <button className="mt-4 text-emex-laranja font-semibold">MOSTRAR MAIS</button>
            </div>

            <div className="w-full lg:w-1/3">
              <h3 className="font-bold mb-4">PRÓXIMOS TREINAMENTOS</h3>
              <div className="flex flex-col gap-2">
                {nextTrainings.map(next => (
                  <NextTrainingCard key={next.id} training={next} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}