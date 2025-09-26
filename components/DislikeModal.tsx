"use client";

import { X, Frown } from 'lucide-react';

type DislikeModalProps = {
  onClose: () => void;
};

export default function DislikeModal({ onClose }: DislikeModalProps) {
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
        <Frown size={48} className="mx-auto text-emex-laranja mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Poxa, que pena!</h2>
        <p className="text-gray-300 mb-6">Seu feedback é muito importante para melhorarmos. Por que você não gostou deste treinamento?</p>
        <button className="w-full bg-emex-laranja text-white font-bold py-3 rounded hover:brightness-110 transition-all duration-300">
          Responder à Avaliação
        </button>
      </div>
    </div>
  );
}