import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { PageData } from '@/types';
import TrainingClient from './TrainingClient';

export default async function TrainingsPage() {
  // Faz fetch inicial dos dados no server (para SEO e SSG)
  const query = `*[_type == "homepage" && _id == "homepage"][0]{
    "heroTrainings": *[_type == "training" && _id in ^.heroCarouselTrainingIds[]->._id]{_id, title, "thumbnailUrl": thumbnailUrl.asset->url, description, slug},
    "categories": *[_type == "category"] | order(title asc){_id, title, slug, "trainings": *[_type == "training" && references(^._id)]{_id, title, "thumbnailUrl": thumbnailUrl.asset->url, description, slug}}
  }`;

  const data: PageData = await fetch(process.env.SANITY_API_URL!, {
    method: 'POST',
    body: JSON.stringify({ query }),
  }).then(res => res.json());

  return (
    <div>
      <Navbar />
      {/* Componente client que lida com useSearchParams, filtros e modal */}
      <TrainingClient initialData={data} />
      <Footer />
    </div>
  );
}
