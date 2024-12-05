/** @type {import('tailwindcss').Config} */
export default {
  //prefix: 'tw-', -> Agrega el prefijo 'tw-' a todas las clases de Tailwind
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // Desactiva el preflight de Tailwind -> normaliza los estilos
  },
  plugins: [],
}