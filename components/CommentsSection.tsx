export default function CommentsSection() {
  return (
    <div className="mt-8 border-t border-gray-800 pt-6">
      <h2 className="text-xl font-bold text-white mb-4">Comentários</h2>
      <div className="flex flex-col gap-4">
        {/* Placeholder para a área de adicionar comentário */}
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-emex-azul-claro flex-shrink-0"></div>
          <textarea 
            placeholder="Adicione um comentário..."
            className="w-full bg-transparent border-b-2 border-gray-600 focus:border-emex-azul-claro focus:outline-none text-white p-2 transition-colors"
            rows={1}
          />
        </div>
        {/* Placeholder para um comentário existente */}
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-emex-laranja flex-shrink-0"></div>
          <div>
            <p className="font-bold text-sm">Usuário Exemplo <span className="text-gray-400 font-normal ml-2">há 1 semana</span></p>
            <p>Ótimo treinamento, muito bem explicado!</p>
          </div>
        </div>
      </div>
    </div>
  );
}