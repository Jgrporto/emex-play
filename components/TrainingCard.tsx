import Image from 'next/image';
import Link from 'next/link'; // <-- Importe Link

type TrainingCardProps = {
  training: {
    id: string; // Adicione id aqui se ainda não tiver
    thumbnailUrl: string;
    title: string;
    description?: string; // Adicione description para o futuro
  };
};

export default function TrainingCard({ training }: TrainingCardProps) {
  return (
    // Envolvemos o card com o Link
    <Link href={`/watch/${training.id}`} passHref>
      <div className="group relative flex-shrink-0 w-60 cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:z-20">
        <Image
          src={training.thumbnailUrl}
          alt={training.title}
          width={240}
          height={135}
          className="rounded-md object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-2 rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white text-sm font-bold truncate">{training.title}</h3>
        </div>
      </div>
    </Link>
  );
}