/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b1220',
        paper: '#f5f7fb',
        line: '#e3e8f0',
        muted: '#5b6678',
        navy: '#07101f',
        brand: { blue: '#3B82F6', cyan: '#22D3EE', deep: '#1d4ed8' },
        ok: '#10b981',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1480px' },
    },
  },
  plugins: [],
}
