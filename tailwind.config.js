/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'pokedex-grey': '#7B8082',
        'pokedex-yellow': '#FFCB3B',
        'chip-orange': '#E66D00',
        'chip-red': '#DE2C2C',
        'chip-green': '#01B956',
        'chip-pink': '#E34C88',
        'chip-blue': '#4350E6',
        'chip-yellow': '#FFAF66',
      },
    },
  },
  important: '#__next',
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
