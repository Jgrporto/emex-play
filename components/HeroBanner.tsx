import { Play, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; // Importe o Link para o botão

type Training = {
  id: string;
  title: string;
  fullTitle?: string; // Título opcional para o banner
  thumbnailUrl: string;
  description?: string;
};

type HeroBannerProps = {
  featuredTraining: Training;
};

export default function HeroBanner({ featuredTraining }: HeroBannerProps) {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 py-12">

      {/* Coluna da Esquerda: Imagem */}
      <div className="w-full md:w-1/2">
        {/* CORREÇÃO 1: A imagem agora é dinâmica, vinda do treinamento */}
        <Image
          src={featuredTraining.thumbnailUrl} 
          alt={featuredTraining.title}
          width={600}
          height={400}
          className="rounded-lg object-cover shadow-lg"
          priority
        />
      </div>

      {/* Coluna da Direita: Textos e Botões */}
      <div className="w-full md:w-1/2 flex flex-col items-start text-left">
        <span className="text-emex-verde font-bold text-sm mb-2">POR ONDE COMEÇAR</span>

        <h2 className="text-4xl lg:text-5xl font-bold">
          {/* Usando o novo "fullTitle" para o banner */}
          <span className="text-emex-laranja">BOAS-VINDAS</span> AO EMEX PLAY!
        </h2>

        <p className="mt-4 text-lg text-gray-300">
          {featuredTraining.description}
        </p>

        <div className="flex items-center mt-8 space-x-4">
  <Link href={`/watch/${featuredTraining.id}`} passHref>
    <button className="flex items-center justify-center bg-emex-verde text-white font-bold px-6 py-3 rounded hover:bg-opacity-80 transition-colors duration-200 cursor-pointer"> {/* <-- Adicionado aqui */}
      <Play className="h-6 w-6 mr-2 fill-white" /> Assistir
    </button>
  </Link>
  
  <button className="flex items-center justify-center bg-transparent border-2 border-gray-400 text-gray-300 font-bold px-6 py-3 rounded hover:bg-gray-400 hover:text-emex-preto transition-colors duration-200 cursor-pointer"> {/* <-- E adicionado aqui */}
    <Info className="h-6 w-6 mr-2" /> Mais Informações
  </button>
</div>
      </div>

    </div>
  );
}