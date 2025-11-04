// app/api/users/create/route.ts

import { NextResponse } from 'next/server';
import { client } from '@/lib/sanityClient'; // Seu cliente Sanity
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    // 1. Recebe TODOS os campos do frontend
    const { name, username, email, password } = await request.json();

    if (!username || !password || !name) {
      return NextResponse.json({ message: 'Nome, username e senha são obrigatórios.' }, { status: 400 });
    }

    // 2. Verifica se o username ou email (se fornecido) já existem
    const existingUserQuery = `*[_type == "user" && (username == $username || (email != null && email == $email))][0]`;
    const existingUser = await client.fetch(existingUserQuery, { username, email });

    if (existingUser) {
      if (existingUser.username === username) {
        return NextResponse.json({ message: 'Este nome de usuário já está em uso.' }, { status: 409 }); // 409 Conflict
      }
      if (existingUser.email === email) {
        return NextResponse.json({ message: 'Este e-mail já está em uso.' }, { status: 409 });
      }
    }

    // 3. CRIA O HASH DA SENHA
    const hashedPassword = await bcrypt.hash(password, 12); // 12 é o custo (salt)

    // 4. Cria o documento do usuário
    const newUserDocument = {
      _type: 'user',
      name: name,
      username: username,
      email: email || null, // Salva null se o email for vazio
      password: hashedPassword, // Salva a senha hasheada
    };

    // 5. Salva o novo usuário no Sanity
    const createdUser = await client.create(newUserDocument);

    return NextResponse.json({ message: 'Usuário criado com sucesso!', user: createdUser }, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    // 6. GARANTE que erros também retornem JSON
    return NextResponse.json({ message: 'Erro interno do servidor. Verifique o console.' }, { status: 500 });
  }
}