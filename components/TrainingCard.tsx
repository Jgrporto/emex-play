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
        <Image
          src={training.thumbnailUrl}
          alt={training.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 25vw"
        />
      </div>

      {/* Gradiente e informações ao passar o mouse */}
      <div
        // ALTERAÇÃO: Aumentamos o padding de p-3 para p-4
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   flex flex-col justify-end p-4"
      >
        {/* Título */}
        {/* ALTERAÇÃO: Aumentamos o tamanho do texto de text-sm para text-base */}
        <h3 className="text-white font-semibold text-base mb-3 truncate">
          {training.title}
        </h3>

        {/* Botão de informações */}
        <button
          onClick={() => onInfoClick(training)}
          // --- ALTERAÇÃO AQUI ---
          className="flex items-center justify-center gap-2 
                     text-white text-sm font-medium
                     px-3 py-1 rounded-full transition-colors cursor-pointer
                     btn-info-borda-azul" // Substituímos as classes de borda
        >
          {/* --- E ALTERAÇÃO AQUI --- */}
          <Info size={20} className="icon-info-verde" /> {/* Adicionamos a classe do ícone */}
          Mais informações
        </button>
      </div>
    </div>
  );
}