// app/api/favorites/toggle/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { client } from '@/lib/sanityClient';

export async function POST(request: NextRequest) {
  console.log("[API /favorites/toggle] Requisição recebida.");

  const session = await getServerSession(authOptions);

  console.log("SESSION DEBUG => ", session);

  if (!session?.user?.id) {
    console.error("[API /favorites/toggle] FALHA: Usuário não autenticado.");
    return NextResponse.json({ message: 'Não autorizado.' }, { status: 401 });
  }

  const { trainingId } = await request.json();
  if (!trainingId) {
    return NextResponse.json({ message: 'ID do treinamento ausente.' }, { status: 400 });
  }

  const userId = session.user.id;
  const currentFavorites = session.user.favorites || [];

  try {
    let newFavorites: string[] = [];
    let patch;

    if (currentFavorites.includes(trainingId)) {
      newFavorites = currentFavorites.filter(id => id !== trainingId);
      patch = client.patch(userId).unset([`favorites[_ref=="${trainingId}"]`]);
    } else {
      newFavorites = [...currentFavorites, trainingId];
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
