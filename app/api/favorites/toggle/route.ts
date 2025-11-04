// app/api/favorites/toggle/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { client } from '@/lib/sanityClient';

export async function POST(request: NextRequest) {
  console.log("[API /favorites/toggle] Requisição recebida.");

  // --- LOG DE DIAGNÓSTICO ---
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !token.id) {
    // Este é o erro mais provável
    console.error("[API /favorites/toggle] FALHA: Token não encontrado ou inválido. Verifique o NEXTAUTH_SECRET.");
    return NextResponse.json({ message: 'Não autorizado. Token inválido.' }, { status: 401 });
  }

  // Se chegamos aqui, o token foi encontrado
  console.log(`[API /favorites/toggle] SUCESSO: Token encontrado para o usuário ID: ${token.id}`);
  
  const { trainingId } = await request.json();
  if (!trainingId) {
    return NextResponse.json({ message: 'ID do treinamento ausente.' }, { status: 400 });
  }

  const userId = token.id;
  const favorites = (token.favorites as string[]) || [];

  try {
    let newFavorites: string[];
    let patch;

    if (favorites.includes(trainingId)) {
      newFavorites = favorites.filter(id => id !== trainingId);
      patch = client.patch(userId).unset([`favorites[_ref=="${trainingId}"]`]);
    } else {
      newFavorites = [...favorites, trainingId];
      patch = client
        .patch(userId)
        .setIfMissing({ favorites: [] })
        .append('favorites', [{ _key: `${userId}-${trainingId}`, _type: 'reference', _ref: trainingId }]);
    }

    await patch.commit();
    console.log(`[API /favorites/toggle] Favoritos atualizados para o usuário ${userId}`);
    return NextResponse.json({ success: true, favorites: newFavorites });

  } catch (error) {
    console.error("[API /favorites/toggle] Erro ao atualizar Sanity:", error);
    return NextResponse.json({ message: 'Erro interno do servidor ao salvar.' }, { status: 500 });
  }
}