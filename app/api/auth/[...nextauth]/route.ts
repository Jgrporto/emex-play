// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "@/lib/sanityClient";
import bcrypt from "bcryptjs";

// --- A lógica do USUARIO_PADRAO foi REMOVIDA ---
// Agora, o usuário "SistemasEmex" deve ser criado no Sanity
// através da sua página /admin/criar-usuario para que tenha uma senha com HASH.

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

        // --- Verificação ÚNICA E SEGURA no Sanity ---
        try {
          // A query busca pelo email OU pelo username
          const userQuery = `*[_type == "user" && (email == $identificador || username == $identificador)][0]{
            _id, name, email, username, "image": image.asset->url, password
          }`;
          const sanityUser = await client.fetch(userQuery, { identificador });

          if (!sanityUser || !sanityUser.password) {
            console.error("Erro de Autenticação: Usuário não encontrado no Sanity:", identificador);
            return null; // Usuário não encontrado
          }

          // Compara a senha enviada com a senha HASHED do Sanity
          const senhasCoincidem = await bcrypt.compare(senha, sanityUser.password);

          if (!senhasCoincidem) {
            console.error("Erro de Autenticação: Senha incorreta para usuário Sanity:", identificador);
            return null; // Senhas não coincidem
          }

          console.log("Usuário Sanity autenticado:", identificador);
          // Retorna o objeto do usuário se o login for bem-sucedido
          return {
            id: sanityUser._id,
            name: sanityUser.name || sanityUser.username,
            email: sanityUser.email,
            image: sanityUser.image,
          };
        } catch (error) {
          console.error("Erro durante autorização do usuário Sanity:", error);
          return null; // Retorna null em caso de erro no banco de dados
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias de tempo máximo total da sessão
  },

  callbacks: {
    // Callback para registrar a última atividade (para o timeout de 24h)
    async jwt({ token, user, trigger }) {
      const agoraEmSegundos = Math.floor(Date.now() / 1000);

      if (user) {
        token.id = user.id;
        token.lastActivity = agoraEmSegundos; // Registra atividade inicial
      }

      // Atualiza a atividade em checagens ou updates da sessão
      if (trigger === "update" || !trigger) {
         token.lastActivity = agoraEmSegundos; 
      }

      return token;
    },
    // Callback para adicionar o 'id' do token ao objeto 'session'
    async session({ session, token }) {
      if (token?.id) {
        if (!session.user) session.user = {}; 
        session.user.id = token.id as string; // Adiciona ID à sessão
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
