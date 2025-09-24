import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'emex-preto': '#141414',
        'emex-verde': '#20B042',
        'emex-laranja': '#F57F17',
        'emex-cinza-escuro': '#1F1F1F',
        'emex-cinza-claro': '#2D2D2D',
        'emex-azul-claro': '#00A3E0',
        'emex-branco': '#ffffff',
      },
    },
  },
  plugins: [], // <-- A PROPRIEDADE QUE FALTAVA
}
export default config