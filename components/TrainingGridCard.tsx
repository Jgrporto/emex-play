// components/TrainingGridCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react'; // Removemos Clock e BarChart
import type { Training } from '@/types';

export default function TrainingGridCard({ training }: { training: Training }) {
  if (!training.slug?.current) {
    return null;
  }

  return (
    <Link href={`/watch/${training.slug.current}`} className="training-grid-card">
      
      {/* 1. THUMBNAIL DO VÍDEO COMO FUNDO */}
      {/* Esta seção já está correta. A imagem preenche a div. 
          A "tela de trás" que você via era o fallback 'bg-emex-cinza-escuro' 
          caso a 'thumbnailUrl' não existisse. */}
      <div className="card-thumbnail">
        {training.thumbnailUrl ? (
          <Image
            src={training.thumbnailUrl}
            alt={`Capa do treinamento ${training.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          // Este é o fallback que aparece se não houver imagem
          <div className="w-full h-full bg-emex-cinza-escuro"></div>
        )}
      </div>

      <div className="card-content">
        <h3 className="card-title">{training.title}</h3>

        {/* 2. METADADOS (DURAÇÃO E NÍVEL) REMOVIDOS */}
        {/* O <div className="card-metadata">...</div> foi completamente removido daqui. */}

        <p className="card-description">{training.description}</p>
        
        {/* 3. BOTÃO COM NOVO ESTILO */}
        {/* A estilização deste botão agora é controlada pela nova regra .card-cta */}
        <div className="card-cta">
          <span>Iniciar Treinamento</span>
          <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}