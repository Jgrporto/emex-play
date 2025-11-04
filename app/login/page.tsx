// app/login/page.tsx

"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState(''); // Mantemos o nome 'email' para o NextAuth
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSupervisorMsg, setShowSupervisorMsg] = useState(false); // Estado para a mensagem
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowSupervisorMsg(false); // Esconde a msg do supervisor ao tentar logar
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: email, // Envia o conteúdo do campo (pode ser user ou email)
        password: password,
      });

      if (result?.error) {
        setError('Usuário ou senha inválidos.'); // Mensagem de erro genérica
      } else if (result?.ok) {
        router.push('/'); // Redireciona para a home
      } else {
         setError('Ocorreu um erro inesperado.');
      }
    } catch (err) {
       setError('Ocorreu um erro de conexão.');
    } finally {
      setIsLoading(false); // Desativa o carregamento
    }
  };

  return (
    // Container principal: tela cheia, fundo preto, centraliza o conteúdo
    <div className="min-h-screen bg-emex-preto flex items-center justify-center px-4">
      
      {/* Container do formulário: largura máxima, centralizado */}
      <div className="w-full max-w-md space-y-8">
        
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/emex-logo.png" // Use o caminho correto para seu logo
            alt="EMEX Play Logo"
            width={200} // Ajuste o tamanho conforme necessário
            height={67} // Ajuste a altura proporcionalmente
            priority
          />
        </div>

        {/* Formulário */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Campo Usuário ou E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Usuário ou E-mail
            </label>
            <input
              id="email"
              name="email" // O name continua 'email' para o NextAuth
              type="text"   // Mudado para 'text' para aceitar username
              autoComplete="username email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-800 text-white"
            />
          </div>

          {/* Campo Senha */}
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Senha
              </label>
              {/* "Esqueceu a senha?" agora é um botão */}
              <button 
                 type="button" 
                 onClick={() => setShowSupervisorMsg(true)} // Mostra a mensagem
                 className="text-sm text-blue-500 hover:text-blue-400 focus:outline-none">
                Esqueceu a senha?
              </button>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-800 text-white"
              />
               <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-400 hover:text-gray-200"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
            </div>
          </div>
          
          {/* Mensagem do Supervisor (condicional) */}
          {showSupervisorMsg && (
            <p className="text-center text-sm text-yellow-400 border border-yellow-600 bg-yellow-900/30 p-2 rounded-md">
              Para redefinir sua senha, por favor, entre em contato com seu supervisor.
            </p>
          )}

          {/* Checkbox "Lembrar-me" */}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded bg-gray-700"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
              Lembrar-me
            </label>
          </div>

          {/* Mensagem de Erro Geral */}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {/* Botão de Submissão */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${isLoading 
                ? 'bg-blue-800 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500'
              }`}
            >
              {isLoading ? 'Entrando...' : 'Continuar'}
            </button>
          </div>
        </form>

        {/* Texto Inferior */}
        <p className="mt-8 text-center text-xs text-gray-500">
          Sistema protegido contra bots e ferramentas de automação
          <br />
          v3.62 {/* Ajuste a versão se necessário */}
        </p>
      </div>
    </div>
  );
}