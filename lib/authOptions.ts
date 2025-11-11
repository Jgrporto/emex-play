// lib/authOptions.ts
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "@/lib/sanityClient";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Usuário ou E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

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
      if (user) {
        token.id = user.id;
        token.favorites = user.favorites || [];
      }
      if (trigger === "update" && session?.favorites) {
        token.favorites = session.favorites;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.favorites = token.favorites || [];
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};
