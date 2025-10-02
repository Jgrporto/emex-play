// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "@/lib/sanityClient";
import bcrypt from "bcryptjs"; // Certifique-se de que o bcryptjs está sendo importado

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // --- 1. QUERY CORRIGIDA ---
        // A query agora busca a URL da imagem diretamente usando "image": image.asset->url
        const userQuery = `*[_type == "user" && email == $email][0]{
          _id,
          name,
          email,
          "image": image.asset->url, // <-- CORREÇÃO APLICADA AQUI
          password
        }`;
        const sanityUser = await client.fetch(userQuery, {
          email: credentials.email,
        });

        if (!sanityUser || !sanityUser.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          sanityUser.password
        );

        if (!passwordsMatch) {
          return null;
        }

        // --- 2. RETORNO SIMPLIFICADO ---
        // Agora 'sanityUser.image' já é a URL da imagem (uma string)
        return {
          id: sanityUser._id,
          name: sanityUser.name,
          email: sanityUser.email,
          image: sanityUser.image, // <-- CORREÇÃO APLICADA AQUI
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };