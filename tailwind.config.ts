/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Garante que ele leia todas as pastas importantes
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Inclui a pasta 'src' também, por segurança
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {

      zIndex: {
        'popout': '30', // Um z-index bem alto para o card expandido
        'carousel-content': '10', // Um z-index padrão para outros conteúdos do carrossel
      },
      // Garante que nossas cores customizadas existam
      colors: {
        'emex-verde': '#20B042',
        'emex-laranja': '#F57F17',
        'emex-azul-claro': '#00A3E0',
        'emex-preto': '#141414',
        'emex-cinza-escuro': '#1F1F1F',
        'secao-apresentacao': '#141414',
        'secao-conteudo': '#181717',
        'modal-conteudo': '#1F1F1F',
      },
      scale: {
        '108': '1.08', // Manter se ainda for útil para a imagem
      },
      boxShadow: {
        'netflix': '0 10px 20px rgba(0,0,0,0.6)',
      },
      width: {
        'card-expanded': '20rem', // Largura do card quando expandido (aprox. 320px)
      },
      height: {
        'card-details-panel': '12rem', // Altura do painel de detalhes (aprox. 192px)
      }
    },
  },
  plugins: [
    
  ],
};