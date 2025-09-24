"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import data from '@/data/trainings.json';

// Para esta página ser um Client Component (interativa)
import { useParams } from 'next/navigation';
import YouTube from 'react-youtube'; // Vamos instalar esta biblioteca no próximo passo

export default function WatchPage() {
  const params = useParams();
  const videoId = params.id as string; // Pega o ID do vídeo da URL

  // Encontra o treinamento correspondente (simplificado para o MVP)
  const allTrainings = data.categories.flatMap(category => category.trainings);
  const training = allTrainings.find(t => t.id === videoId);

  // Se o treinamento não for encontrado, exibe uma mensagem
  if (!training) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-emex-preto text-white">
        <h1 className="text-3xl font-bold mb-4">Treinamento não encontrado.</h1>
        <p>Verifique o link e tente novamente.</p>
      </div>
    );
  }

  // IDs de vídeo do YouTube (MVP: um mapa manual para o seu vídeo)
  // Futuramente, esta informação viria do seu JSON ou de uma API
  const youtubeVideoMap: { [key: string]: string } = {
    '1': '4QRPT8qozx4' // O ID do seu vídeo do YouTube para o treinamento com ID '1'
    // Adicione mais IDs de treinamento aqui conforme necessário
  };

  const youtubeVideoId = youtubeVideoMap[training.id];

  if (!youtubeVideoId) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-emex-preto text-white">
        <h1 className="text-3xl font-bold mb-4">Vídeo não disponível.</h1>
        <p>Este treinamento ainda não possui um vídeo associado.</p>
      </div>
    );
  }


  // Opções para o player do YouTube
  const opts = {
    height: '390', // Altura padrão do player
    width: '640',  // Largura padrão do player
    playerVars: {
      autoplay: 1, // Auto-iniciar o vídeo
    },
  };

  return (
    <div className="bg-emex-preto min-h-screen">
      <Navbar /> {/* A navbar sempre estará visível */}

      <main className="max-w-7xl mx-auto pt-24 pb-8 px-4">
        <h1 className="text-4xl font-bold text-emex-laranja mb-6">{training.title}</h1>

        {/* Player de Vídeo */}
        <div className="relative aspect-video w-full bg-black flex justify-center items-center rounded-lg overflow-hidden">
          <YouTube videoId={youtubeVideoId} opts={opts} className="w-full h-full" iframeClassName="w-full h-full" />
        </div>

        {/* Detalhes do Treinamento */}
        <div className="mt-8 bg-gray-900 p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Sobre este treinamento</h2>
          <p className="text-gray-300 leading-relaxed">
            {training.description || "Este treinamento aborda conceitos avançados para aprimorar suas habilidades. Prepare-se para um conteúdo rico e prático."}
          </p>
          {/* Adicionar mais detalhes aqui (duração, instrutor, módulos, etc.) */}
          <div className="mt-6">
            <p className="text-gray-400">Duração: 2h 30min</p>
            <p className="text-gray-400">Instrutor: Equipe EMEX</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}