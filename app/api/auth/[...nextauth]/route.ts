// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // --- INÍCIO DA CORREÇÃO ---
        // 1. Verificamos se as credenciais foram recebidas. Se não, negamos o acesso.
        if (!credentials) {
          return null;
        }

        // 2. Agora que sabemos que 'credentials' existe, podemos usá-lo com segurança.
        if (credentials.email === process.env.ADMIN_EMAIL && credentials.password === process.env.ADMIN_PASSWORD) {
          // Se as credenciais baterem, retorna um objeto de usuário
          return { id: "1", name: "Admin", email: credentials.email };
        }
        
        // Se as credenciais não baterem, retorna null
        return null;
        // --- FIM DA CORREÇÃO ---
      }
    })
  ],
  
  pages: {
    signIn: '/login',
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }