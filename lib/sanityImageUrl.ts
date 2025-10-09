// lib/sanityImageUrl.ts
import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanityClient'; // Certifique-se de que o client é importado corretamente
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}