// app/login/page.tsx

"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    if (result?.error) {
      setError('Credenciais inválidas. Tente novamente.');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-emex-preto">
      {/* CARD: Borda superior verde já está aqui com border-t-4 border-emex-verde */}
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg border-t-4 border-emex-verde">
        
        <div className="flex justify-center mb-6">
          <Image
            src="/footer-logo.png"
            alt="EMEX Play Logo"
            width={290}
            height={60}
            priority
          />
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-300">Usuário</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-emex-azul-claro focus:border-emex-azul-claro"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-300">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-emex-azul-claro focus:border-emex-azul-claro"
            />
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <div>
            {/* BOTÃO: Estilização para deixá-lo mais aparente e com hover */}
            <button
              type="submit"
              className="w-full px-4 py-3 font-bold text-white bg-emex-verde rounded-md 
                         hover:bg-green-600 transition-all duration-300 ease-in-out 
                         focus:outline-none focus:ring-2 focus:ring-emex-verde focus:ring-offset-2 focus:ring-offset-gray-800
                         cursor-pointer"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}