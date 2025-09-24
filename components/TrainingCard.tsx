import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle, PlusCircle, ChevronDown } from 'lucide-react'; // Novos ícones

type TrainingCardProps = {
  training: {
    id: string;
    thumbnailUrl: string;
    title: string;
    description?: string;
  };
};

export default function TrainingCard({ training }: TrainingCardProps) {
  return (
    // O Link agora envolve o novo card. Clicar em qualquer lugar ainda funciona.
    <Link href={`/watch/${training.id}`} passHref>
      {/* Container principal com 'group' para controlar o hover dos elementos filhos */}
      <div className="group relative flex-shrink-0 w-60 rounded-lg overflow-hidden
                      bg-emex-cinza-escuro shadow-lg
                      transform transition-all duration-300 ease-in-out
                      hover:scale-110 hover:z-20 hover:shadow-2xl">
        
        {/* Container da Imagem */}
        <div className="relative w-full aspect-video">
          <Image
            src={training.thumbnailUrl}
            alt={training.title}
            fill // 'fill' faz a imagem preencher o container pai
            className="object-cover"
          />
          {/* Overlay que escurece a imagem no hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
        </div>

        {/* Painel de Informações que aparece no hover */}
        <div className="absolute -bottom-full w-full p-3 bg-emex-cinza-escuro
                      opacity-0 group-hover:opacity-100 group-hover:bottom-0
                      transition-all duration-300 ease-in-out">
          <h3 className="text-white font-bold truncate mb-2">{training.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <PlayCircle className="h-8 w-8 text-white hover:text-emex-verde transition-colors" />
                <PlusCircle className="h-8 w-8 text-white hover:text-emex-laranja transition-colors" />
            </div>
            <ChevronDown className="h-8 w-8 text-white hover:text-emex-azul-claro transition-colors" />
          </div>
        </div>

      </div>
    </Link>
  );
}