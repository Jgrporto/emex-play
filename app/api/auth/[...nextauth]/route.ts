// app/api/auth/[...nextauth]/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

        const userQuery = `*[_type == "user" && (email == $identificador || username == $identificador)][0]{
          _id, name, email, username, "image": image.asset->url, password,
          "favorites": favorites[]->_id
        }`;

        const sanityUser = await client.fetch(userQuery, { identificador });

        if (!sanityUser?.password) return null;

        const senhasCoincidem = await bcrypt.compare(senha, sanityUser.password);

        if (!senhasCoincidem) return null;

        console.log("Usuário Sanity autenticado:", identificador);

        return {
          id: sanityUser._id,
          name: sanityUser.name || sanityUser.username,
          email: sanityUser.email,
          image: sanityUser.image,
          favorites: sanityUser.favorites || [],
        };
      },
    }),
  ],

  pages: { signIn: "/login" },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      const agoraEmSegundos = Math.floor(Date.now() / 1000);

      // login
      if (user) {
        token.id = user.id;
        token.lastActivity = agoraEmSegundos;
        token.favorites = user.favorites || [];
      }

      // update() do client → FAVORITOS atualiza token
      if (trigger === "update" && session?.favorites) {
        token.favorites = session.favorites;
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
        session.user.favorites = token.favorites || [];
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export { authOptions };

