

import Image from 'next/image';
import Link from 'next/link';
import type { NextTraining } from '@/types'; 


type NextTrainingCardProps = {
  training: NextTraining;
};

export default function NextTrainingCard({ training }: NextTrainingCardProps) {
  return (
    // 3. O link agora usa training.slug para a URL
    <Link href={`/watch/${training.slug}`} className="flex items-center gap-4 p-2 rounded-lg hover:bg-emex-cinza-escuro transition-colors">
      <div className="relative w-32 h-20 flex-shrink-0 rounded overflow-hidden">
        <Image
          src={training.thumbnailUrl}
          alt={training.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-grow">
        <h4 className="font-semibold text-white text-sm line-clamp-2">
          {training.title}
        </h4>
      </div>
    </Link>
  );
}