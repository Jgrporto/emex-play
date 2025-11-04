// app/admin/criar-usuario/page.tsx

"use client";

import { useState } from "react";

export default function CreateUserPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 1. Envia 'username' no corpo da requisição
        body: JSON.stringify({ name, username, email, password }),
      });

      // 2. Lê a resposta como JSON
      const data = await response.json();

      // 3. Trata o erro se a API retornar um status de falha (ex: 400, 409, 500)
      if (!response.ok) {
        throw new Error(data.message || 'Algo deu errado');
      }
      
      setMessage({ type: 'success', text: `Usuário "${data.user.name}" (Username: ${data.user.username}) criado com sucesso!` });
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");

    } catch (error) {
      // 4. O 'catch' agora sempre receberá uma mensagem de erro clara
      if (error instanceof Error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'error', text: 'Ocorreu um erro desconhecido.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-emex-preto text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-emex-verde">Painel Administrativo</h1>
        <h2 className="text-xl font-semibold mb-8">Criar Novo Usuário</h2>
        <div className="bg-emex-cinza-escuro p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nome (Obrigatório)</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emex-azul-claro focus:border-emex-azul-claro"
                />
              </div>
              
              {/* Campo de Username (obrigatório) */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">Nome de Usuário (Obrigatório, para login)</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emex-azul-claro focus:border-emex-azul-claro"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email (Opcional)</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // 'required' removido
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emex-azul-claro focus:border-emex-azul-claro"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300"> Senha (Obrigatório)</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emex-azul-claro focus:border-emex-azul-claro"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emex-verde hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emex-verde disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Criando...' : 'Criar Usuário'}
              </button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-800/50 text-green-300' : 'bg-red-800/50 text-red-300'}`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}