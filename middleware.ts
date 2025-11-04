// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const agora = Math.floor(Date.now() / 1000);
  const vinteQuatroHorasEmSegundos = 24 * 60 * 60; // 86400

  // Se o usuário está tentando acessar uma página protegida e não está logado
  // (e não está já indo para a página de login)
  if (!token && !pathname.startsWith('/login')) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.url); // Salva a página que ele tentou acessar
    return NextResponse.redirect(loginUrl);
  }

  // Se o usuário está logado
  if (token) {
    const ultimaAtividade = token.lastActivity as number | undefined;

    // Se a última atividade foi há mais de 24 horas E não está na página de login
    if (ultimaAtividade && (agora - ultimaAtividade > vinteQuatroHorasEmSegundos) && !pathname.startsWith('/login')) {
      console.log("Sessão expirada por inatividade. Redirecionando para login.");
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', req.url); // Salva a página atual
      // O token será invalidado na próxima vez que getToken for chamado (após o redirect)
      return NextResponse.redirect(loginUrl);
    }

    // Se está logado e ativo, mas tenta acessar a página de login, redireciona para a home
    if (pathname.startsWith('/login')) {
       return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Permite a requisição continuar (seja ela pública ou autenticada e ativa)
  return NextResponse.next();
}

// Configuração para definir quais rotas o middleware deve rodar
export const config = {
  matcher: [
    /*
     * Combine todas as rotas exceto por:
     * - api (rotas de API, incluindo a de auth)
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagem)
     * - favicon.ico (ícone)
     * - Arquivos na pasta /public (ex: logos, imagens)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}