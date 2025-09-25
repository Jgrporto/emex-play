import Image from 'next/image';
import Link from 'next/link';

type Training = {
  id: string;
  title: string;
  thumbnailUrl: string;
};

export default function NextTrainingCard({ training }: { training: Training }) {
  return (
    <Link href={`/watch/${training.id}`} className="flex items-center gap-4 group p-2 rounded-md hover:bg-emex-cinza-claro transition-colors">
      <div className="relative w-32 h-20 flex-shrink-0 rounded-md overflow-hidden">
        <Image
          src={training.thumbnailUrl}
          alt={training.title}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h4 className="font-bold text-white group-hover:text-emex-laranja transition-colors">{training.title}</h4>
        <p className="text-sm text-gray-400">Treinamento</p>
      </div>
    </Link>
  );
}