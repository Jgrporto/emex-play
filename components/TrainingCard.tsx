"use client";

import Image from 'next/image';
import type { Training } from '@/types';
import { PlayCircle } from 'lucide-react';

type TrainingCardProps = {
  training: Training;
  onInfoClick: (training: Training) => void;
};

export default function TrainingCard({ training, onInfoClick }: TrainingCardProps) {
  return (
    <div 
      onClick={() => onInfoClick(training)}
      className="group relative flex-shrink-0 w-72 aspect-video rounded-lg overflow-hidden
                 bg-emex-cinza-escuro shadow-lg
                 transform transition-all duration-300 ease-in-out
                 hover:scale-105 hover:z-20 hover:shadow-xl cursor-pointer"
    >
      <Image
        src={training.thumbnailUrl}
        alt={training.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300"></div>
      <div className="absolute top-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white font-bold line-clamp-2">{training.title}</h3>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <PlayCircle size={48} className="text-white/80" />
      </div>
    </div>
  );
}