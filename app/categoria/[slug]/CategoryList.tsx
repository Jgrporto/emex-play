"use client";

import { useState } from 'react';
import type { Training } from '@/types';
import TrainingCard from '@/components/TrainingCard';
import TrainingModal from '@/components/TrainingModal';

export default function CategoryList({ trainings }: { trainings: Training[] }) {
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {trainings.map(training => (
          <TrainingCard 
            key={training._id}
            training={training}
            onInfoClick={setSelectedTraining}
          />
        ))}
      </div>

      {selectedTraining && (
        <TrainingModal 
          training={selectedTraining} 
          onClose={() => setSelectedTraining(null)}
        />
      )}
    </>
  );
}