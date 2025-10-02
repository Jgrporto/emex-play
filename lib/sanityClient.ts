// lib/sanityClient.ts
import { createClient } from 'next-sanity'

// Buscamos o projectId da variável de ambiente
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// Se o projectId não for encontrado, lançamos um erro claro
if (!projectId) {
  throw new Error("A variável de ambiente NEXT_PUBLIC_SANITY_PROJECT_ID não foi definida. Verifique seu arquivo .env.local");
}

export const client = createClient({
  projectId: projectId,
  dataset: 'production',
  apiVersion: '2024-10-21', // Use uma data recente
  
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})