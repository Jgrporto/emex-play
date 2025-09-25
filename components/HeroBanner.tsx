import { Play, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Definimos o tipo de dados que o componente espera receber
type Training = {
  id: string;
  title: string;
  fullTitle?: string; // Título opcional, mais completo para o banner
  thumbnailUrl: string;
  description?: string;
};

// Definimos as propriedades do componente HeroBanner
type HeroBannerProps = {
  featuredTraining: Training;
  onInfoClick: (training: Training) => void; // Função para abrir o modal
};

export default function HeroBanner({ featuredTraining, onInfoClick }: HeroBannerProps) {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 py-12">

      {/* Coluna da Esquerda: Imagem */}
      <div className="w-full md:w-1/2">
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
          {/* Usando o "fullTitle" para o banner, com destaque na primeira palavra */}
          <span className="text-emex-laranja">BOAS-VINDAS</span> AO EMEX PLAY!
        </h2>

        <p className="mt-4 text-lg text-gray-300">
          {featuredTraining.description}
        </p>

        <div className="flex items-center mt-8 space-x-4">
           <Link href={`/watch/${featuredTraining.id}`} passHref>
  <button className="flex items-center justify-center bg-emex-verde text-white font-bold px-6 py-3 rounded transition-all duration-300 cursor-pointer btn-hover-container">
    <Play className="h-6 w-6 mr-2 text-white icon-hover-scale" />
    Assistir
  </button>
</Link>
          
          {/* Botão que chama a função onInfoClick para abrir o modal */}
          <button 
            onClick={() => onInfoClick(featuredTraining)}
            className="flex items-center justify-center bg-transparent border-2 border-gray-400 text-gray-300 font-bold px-6 py-3 rounded btn-vazado-hover transition-colors duration-200 cursor-pointer"
          >
            <Info className="h-6 w-6 mr-2" /> Mais Informações
          </button>
        </div>
      </div>

    </div>
  );
}