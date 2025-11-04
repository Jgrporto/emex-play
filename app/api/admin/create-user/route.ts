// app/api/admin/create-user/route.ts

import { NextResponse } from 'next/server';
import { client } from '@/lib/sanityClient'; // Seu cliente Sanity
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { username, password, name, email } = await request.json();

    if (!username || !password || !name) {
      return NextResponse.json({ message: 'Nome, username e senha são obrigatórios.' }, { status: 400 });
    }

    // Verifica se o username já existe
    const existingUser = await client.fetch(`*[_type == "user" && username == $username][0]`, { username });
    if (existingUser) {
      return NextResponse.json({ message: 'Este nome de usuário já está em uso.' }, { status: 409 }); // 409 Conflict
    }

    // CRIA O HASH DA SENHA
    const hashedPassword = await bcrypt.hash(password, 12); // 12 é o custo (salt)

    // Cria o documento do usuário
    const newUserDocument = {
      _type: 'user',
      name: name,
      username: username,
      email: email || null, // Salva null se o email for vazio
      password: hashedPassword, // Salva a senha hasheada
    };

    // Salva o novo usuário no Sanity
    const createdUser = await client.create(newUserDocument);

    return NextResponse.json({ message: 'Usuário criado com sucesso!', user: createdUser }, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}