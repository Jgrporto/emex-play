import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import TrainingCarousel from '@/components/TrainingCarousel';
import Footer from '@/components/Footer';
import data from '@/data/trainings.json';

export default function HomePage() {
  // Lógica de dados CORRETA: buscando o featuredTraining e as categories
  const { featuredTraining, categories } = data;

  return (
    <div>
      <Navbar />
      
      <main className="pt-24">
        
        {/* --- SEÇÃO 1: APRESENTAÇÃO --- */}
        {/* Estrutura visual CORRETA com a nossa classe manual */}
        <section className="bg-secao-apresentacao">
          {featuredTraining && <HeroBanner featuredTraining={featuredTraining} />}
        </section>

        {/* --- SEÇÃO 2: CONTEÚDO (CARROSSÉIS) --- */}
        {/* Estrutura visual CORRETA com a nossa classe manual */}
        <section className="bg-secao-conteudo py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            {categories.map((category) => (
              <TrainingCarousel
                key={category.slug}
                title={category.title}
                trainings={category.trainings}
              />
            ))}
          </div>
          <Footer />
        </section>
        
      </main>
    </div>
  );
}