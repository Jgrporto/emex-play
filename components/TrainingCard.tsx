import Image from 'next/image';

// Definimos o que nosso componente espera receber (uma "propriedade")
type TrainingCardProps = {
  training: {
    thumbnailUrl: string;
    title: string;
  };
};

export default function TrainingCard({ training }: TrainingCardProps) {
  return (
    <div className="flex-shrink-0 w-60 cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:z-10">
      <Image
        src={training.thumbnailUrl}
        alt={training.title}
        width={240}
        height={135}
        className="rounded-md object-cover"
      />
    </div>
  );
}