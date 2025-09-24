import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import TrainingCarousel from '@/components/TrainingCarousel';
import Footer from '@/components/Footer';
import data from '@/data/trainings.json';

export default function HomePage() {
  const { categories } = data;
  const featuredTraining = categories[0]?.trainings[0];

  return (
    // DEPOIS: Adicionamos um padding no topo (pt-24) para criar o espaço abaixo da Navbar.
    <div className="pt-24">
      <Navbar />
      
      {featuredTraining && <HeroBanner featuredTraining={featuredTraining} />}

      {/* Removemos a margem negativa (-mt-20) que não é mais necessária */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {categories.map((category) => (
          <TrainingCarousel
            key={category.slug}
            title={category.title}
            trainings={category.trainings}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}