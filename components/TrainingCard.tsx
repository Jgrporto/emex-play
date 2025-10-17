// components/TrainingCard.tsx

"use client";

import Image from "next/image";
import type { Training } from "@/types";
import { Info } from "lucide-react";

type TrainingCardProps = {
  training: Training;
  onInfoClick: (training: Training) => void;
};

export default function TrainingCard({ training, onInfoClick }: TrainingCardProps) {
  return (
    <div
      className="group relative w-full h-full rounded-xl overflow-hidden 
               bg-emex-cinza-escuro transition-all duration-300 
               hover:-translate-y-2 hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)]"
    >
      {/* Imagem de Capa */}
      <div className="relative w-full aspect-[16/9]">
        
        {/* --- CORREÇÃO AQUI --- */}
        {/* Adicionada a verificação para garantir que a thumbnailUrl exista */}
        {training.thumbnailUrl ? (
          <Image
            src={training.thumbnailUrl}
            alt={training.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 25vw"
          />
        ) : (
          // Placeholder caso não haja imagem
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs text-gray-500">Sem Imagem</span>
          </div>
        )}
      </div>

      {/* Gradiente e informações ao passar o mouse */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   flex flex-col justify-end p-4"
      >
        {/* Título */}
        <h3 className="text-white font-semibold text-base mb-3 truncate">
          {training.title}
        </h3>

        {/* Botão de informações */}
        <button
          onClick={(e) => {
            e.preventDefault(); // Impede o link pai de ser acionado
            e.stopPropagation();
            onInfoClick(training);
          }}
          className="flex items-center justify-center gap-2 
                     text-white text-sm font-medium
                     px-3 py-1 rounded-full transition-colors cursor-pointer
                     btn-info-borda-azul" // Classe do CSS manual
        >
          <Info size={20} className="icon-info-verde" />
          Mais informações
        </button>
      </div>
    </div>
  );
}