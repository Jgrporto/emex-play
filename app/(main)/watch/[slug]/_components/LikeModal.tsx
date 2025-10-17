"use client";

import { X, Smile } from 'lucide-react';
import { useRouter } from 'next/navigation'; // 1. Importe o useRouter


type LikeModalProps = {
  onClose: () => void;
  // --- CORREÇÃO 1: A prop 'trainingSlug' agora é tipada para ser um objeto ---
  trainingSlug: { current: string };
};

export default function LikeModal({ onClose, trainingSlug }: LikeModalProps) {
  const router = useRouter(); // 3. Inicialize o router

  
  const handleNavigateToFeedback = () => {
    // 4. Navega para a página de avaliação, passando o slug
    router.push(`/feedback/${trainingSlug.current}?rating=like`); 
  };

  return (
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4"
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-modal-conteudo w-full max-w-md rounded-lg p-6 text-center relative shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
          <X size={24} />
         </button>
        <Smile size={48} className="mx-auto text-emex-verde mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Obrigado pelo seu feedback!</h2>
        <p className="text-gray-300 mb-6">Ficamos felizes que você tenha gostado. Gostaria de participar de uma breve pesquisa de satisfação?</p>
        {/* 5. Adicione a função de navegação ao botão */}
        <button 
          onClick={handleNavigateToFeedback}
          className="w-full bg-emex-laranja text-white font-bold py-3 rounded hover:brightness-110 transition-all duration-300"
        >
          Participar da Pesquisa
        </button>
      </div>
    </div>
  );
}