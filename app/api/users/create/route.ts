// app/api/users/create/route.ts

import { NextResponse } from 'next/server';
import { client } from '@/lib/sanityClient';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    // --- Passo 1: Receber e validar os dados do formulário ---
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse('Campos obrigatórios faltando', { status: 400 });
    }

    // --- Passo 2: Verificar se o usuário já existe ---
    const userExistsQuery = `*[_type == "user" && email == $email][0]`;
    const existingUser = await client.fetch(userExistsQuery, { email });

    if (existingUser) {
      return new NextResponse('Um usuário com este email já existe', { status: 409 }); // 409 Conflict
    }

    // --- Passo 3: Criptografar a senha ---
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // --- Passo 4: Criar o novo usuário no Sanity ---
    const newUser = {
      _type: 'user',
      name,
      email,
      password: hashedPassword,
      // O campo de imagem será adicionado separadamente pelo admin no Sanity Studio
    };

    const createdUser = await client.create(newUser);

    // --- Passo 5: Retornar uma resposta de sucesso ---
    return NextResponse.json(createdUser, { status: 201 }); // 201 Created

  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}