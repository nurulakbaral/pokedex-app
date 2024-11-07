/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'pokedex-grey': '#7B8082',
        'pokedex-yellow': '#FFCB3B',
      },
    },
  },
  important: '#__next',
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
