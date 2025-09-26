// lib/sanityClient.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'w3oxdhv9', // <-- SUBSTITUA PELO SEU PROJECT ID
  dataset: 'production',
  apiVersion: '2025-09-26', // Use uma data recente
  useCdn: process.env.NODE_ENV === 'production', // `false` em dev, `true` em produção
})