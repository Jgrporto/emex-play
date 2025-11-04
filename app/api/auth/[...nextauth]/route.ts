// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "@/lib/sanityClient";
import bcrypt from "bcryptjs";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Usuário ou E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Por favor, forneça usuário/email e senha.');
        }

        const identificador = credentials.email;
        const senha = credentials.password;

        try {
          const userQuery = `*[_type == "user" && (email == $identificador || username == $identificador)][0]{
            _id, name, email, username, "image": image.asset->url, password,
            "favorites": favorites[]->_id
          }`;
          const sanityUser = await client.fetch(userQuery, { identificador });

          if (!sanityUser || !sanityUser.password) {
            console.error("Erro de Autenticação: Usuário não encontrado:", identificador);
            return null;
          }

          const senhasCoincidem = await bcrypt.compare(senha, sanityUser.password);

          if (!senhasCoincidem) {
            console.error("Erro de Autenticação: Senha incorreta para:", identificador);
            return null;
          }

          console.log("Usuário Sanity autenticado:", identificador);
          return {
            id: sanityUser._id,
            name: sanityUser.name || sanityUser.username,
            email: sanityUser.email,
            image: sanityUser.image,
            favorites: sanityUser.favorites || [], // Passa os favoritos
          };
        } catch (error) {
          console.error("Erro durante autorização:", error);
          return null;
        }
      },
    }),
  ],

  pages: { signIn: "/login" },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },

  callbacks: {
    async jwt({ token, user, trigger }) {
      const agoraEmSegundos = Math.floor(Date.now() / 1000);

      if (user) {
        token.id = user.id;
        token.lastActivity = agoraEmSegundos;
        // --- CORREÇÃO AQUI: Removemos o '(as any)' ---
        token.favorites = user.favorites || [];
      }

      if (trigger === "update" || !trigger) {
         token.lastActivity = agoraEmSegundos; 
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        if (!session.user) session.user = {}; 
        session.user.id = token.id as string;
        // --- CORREÇÃO AQUI: Removemos o '(as any)' ---
        session.user.favorites = token.favorites || [];
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };