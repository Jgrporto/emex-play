import { Play, Info } from 'lucide-react';
import Image from 'next/image';

type Training = {
  title: string;
  thumbnailUrl: string;
};

type HeroBannerProps = {
  featuredTraining: Training;
};

export default function HeroBanner({ featuredTraining }: HeroBannerProps) {
  return (
    // Container principal com Flexbox, centralizado e com espaçamento
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 py-12">
      
      {/* Coluna da Esquerda: Imagem */}
      <div className="w-full md:w-1/2">
        <Image
          // Usando a imagem que você enviou como exemplo
          src="/thumbnails/lider-1.jpeg" 
          alt={featuredTraining.title}
          width={600}
          height={400}
          className="rounded-lg object-cover shadow-lg"
        />
      </div>

      {/* Coluna da Direita: Textos e Botões */}
      <div className="w-full md:w-1/2 flex flex-col items-start text-left">
        <span className="text-emex-verde font-bold text-sm mb-2">POR ONDE COMEÇAR</span>
        
        <h2 className="text-4xl lg:text-5xl font-bold">
          {/* Colorindo apenas a primeira palavra */}
          <span className="text-emex-laranja">LIDERANÇA</span> DE PROJETOS ÁGEIS
        </h2>

        <p className="mt-4 text-lg text-gray-300">
          Aprenda a potencializar os seus projetos. Agile para pro-players, com foco em times, uma ferramenta de desenvolvimento das suas squads.
        </p>
        
        <div className="flex items-center mt-8 space-x-4">
          {/* Botão principal com a cor verde */}
          <button className="flex items-center justify-center bg-emex-verde text-white font-bold px-6 py-3 rounded hover:bg-opacity-80 transition-colors duration-200">
            <Play className="h-6 w-6 mr-2 fill-white" /> Assistir
          </button>
          {/* Botão secundário com estilo "vazado" (ghost button) */}
          <button className="flex items-center justify-center bg-transparent border-2 border-gray-400 text-gray-300 font-bold px-6 py-3 rounded hover:bg-gray-400 hover:text-emex-preto transition-colors duration-200">
            <Info className="h-6 w-6 mr-2" /> Mais Informações
          </button>
        </div>
      </div>

    </div>
  );
}