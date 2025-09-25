"use client";

import { X, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Training = {
  id: string;
  title: string;
  thumbnailUrl: string;
  description?: string;
};

type TrainingModalProps = {
  training: Training;
  onClose: () => void;
};

export default function TrainingModal({ training, onClose }: TrainingModalProps) {
  return (
    // Backdrop sólido
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-emex-preto z-50 flex justify-center items-center p-4"
    >
      {/* Container do Modal com a NOVA CLASSE de fundo */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-modal-conteudo w-full max-w-3xl rounded-lg overflow-hidden relative shadow-2xl"
      >
        {/* Botão de Fechar */}
        <button onClick={onClose} className="absolute top-3 right-3 z-10 text-white hover:text-gray-400">
          <X size={28} />
        </button>
        
        {/* Conteúdo do Modal */}
        <div>
          <div className="relative w-full aspect-video">
            <Image
              src={training.thumbnailUrl}
              alt={training.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            <h2 className="absolute bottom-4 left-4 text-3xl font-bold text-white">
              {training.title}
            </h2>
          </div>
          
          <div className="p-6">
            <p className="text-gray-300 leading-relaxed mb-6">
              {training.description || "Descrição não disponível."}
            </p>
            <Link href={`/watch/${training.id}`} passHref>
  <button className="flex items-center justify-center w-full bg-emex-verde text-white font-bold px-6 py-3 rounded transition-all duration-300 cursor-pointer btn-hover-container">
    <PlayCircle className="h-6 w-6 mr-2 text-white icon-hover-scale" />
    Iniciar Treinamento
  </button>
</Link>
          </div>
        </div>
      </div>
    </div>
  );
}