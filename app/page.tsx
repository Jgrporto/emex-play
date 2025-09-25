"use client"; // Necessário para interatividade (controlar o modal)

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import Footer from '@/components/Footer';
import TrainingModal from '@/components/TrainingModal'; // Importe o modal
import data from '@/data/trainings.json';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Definimos o tipo Training aqui para a página saber o formato dos dados
type Training = {
  id: string;
  title: string;
  thumbnailUrl: string;
  description?: string;
  fullTitle?: string;
};

export default function HomePage() {
  const { featuredTraining } = data;
  
  // Estado para controlar qual treinamento está selecionado para o modal
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  return (
    <div>
      <Navbar />
      
      <main>
        {/* Usamos a seção de apresentação como o principal da Home */}
        <section className="bg-secao-apresentacao">
          {/* Passamos a função para abrir o modal para o HeroBanner */}
          {featuredTraining && (
            <HeroBanner 
              featuredTraining={featuredTraining} 
              onInfoClick={setSelectedTraining} 
            />
          )}
        </section>

        {/* Seção com um call-to-action */}
        <section className="bg-secao-conteudo py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Nosso Catálogo</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Tudo o que você precisa para acelerar seu desenvolvimento profissional está a um clique de distância.
          </p>
          <Link href="/treinamentos" passHref>
  <button className="flex items-center justify-center mx-auto bg-emex-verde text-white font-bold px-8 py-4 rounded transition-all duration-300 cursor-pointer btn-hover-container">
    Ver todos os treinamentos
    {/* Garantimos que o ícone tenha a cor inicial e a classe de animação */}
    <ArrowRight className="h-6 w-6 ml-2 text-white icon-hover-scale" />
  </button>
</Link>
        </section>
      </main>

      {/* O Footer foi movido para fora do <main> para seguir a estrutura da página de treinamentos */}
      <div className="bg-secao-conteudo">
        <Footer />
      </div>

      {/* Renderiza o Modal APENAS se um treinamento estiver selecionado */}
      {selectedTraining && (
        <TrainingModal 
          training={selectedTraining} 
          onClose={() => setSelectedTraining(null)} // Passa a função para fechar o modal
        />
      )}
    </div>
  );
}