"use client";

import { X, Smile } from 'lucide-react';

type LikeModalProps = {
  onClose: () => void;
};

export default function LikeModal({ onClose }: LikeModalProps) {
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
        <button className="w-full bg-emex-verde text-white font-bold py-3 rounded hover:brightness-110 transition-all duration-300">
          Participar da Pesquisa
        </button>
      </div>
    </div>
  );
}