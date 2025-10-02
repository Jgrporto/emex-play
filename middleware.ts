// middleware.ts

export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    /*
     * Combine todas as rotas, exceto as necessárias para o Next.js e o login.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
    
    // Adicione a linha abaixo para proteger todas as rotas de admin
    '/admin/:path*'
  ]
}