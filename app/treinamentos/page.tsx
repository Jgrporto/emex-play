import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { PageData } from '@/types';
import TrainingClient from './TrainingClient';
import { client } from '@/lib/sanityClient';

export default async function TrainingsPage() {
  // Fetch inicial apenas para SEO
  const query = `*[_type == "homepage" && _id == "homepage"][0]{
    "heroTrainings": *[_type == "training" && _id in ^.heroCarouselTrainingIds[]->._id]{_id, title, "thumbnailUrl": thumbnailUrl.asset->url, description, slug},
    "categories": *[_type == "category"] | order(title asc){_id, title, slug, "trainings": *[_type == "training" && references(^._id)]{_id, title, "thumbnailUrl": thumbnailUrl.asset->url, description, slug}}
  }`;

  const data: PageData = await client.fetch(query);

  return (
    <div>
      <Navbar />
      {/* Tudo relacionado a useSearchParams vai aqui, isolado no client */}
      <TrainingClient initialData={data} />
      <Footer />
    </div>
  );
}
