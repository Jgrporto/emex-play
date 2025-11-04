// next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

// Estende o tipo JWT padrão
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    lastActivity?: number;
  }
}

// Estende o tipo Session padrão
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
    } & DefaultSession["user"]; // Mantém as propriedades padrão (name, email, image)
  }

  // Estende o tipo User padrão
  interface User extends DefaultUser {
    id?: string;
  }
}