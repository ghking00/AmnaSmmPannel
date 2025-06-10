/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af', // Tailwind's blue-800
        secondary: '#f97316', // Tailwind's orange-500
        background: '#f9fafb', // light gray
        card: '#ffffff',
        text: '#111827' // dark gray text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem'
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }
    }
  },
  plugins: []
}