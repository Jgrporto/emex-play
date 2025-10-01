// middleware.ts

export { default } from "next-auth/middleware"

export const config = { 
  /*
   * O 'matcher' abaixo usa uma expressão regular para combinar com TODAS as rotas,
   * EXCETO aquelas que o Next.js precisa para funcionar (como _next/static, _next/image),
   * o favicon.ico, e a própria página de login.
   * Isso evita um loop infinito de redirecionamento.
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)']
}