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
        'emex-azul-claro': '#00A3E0',
        'emex-branco': '#ffffff',
      },
    },
  },
}
export default config