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
    },
  },
  plugins: [
    
  ],
};