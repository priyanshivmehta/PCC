/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        // sans: [
        //   'Sans Regular',
        //   'ui-sans-serif',
        //   'system-ui',
        //   'sans-serif',
        // ],
      },
    },
  },
  plugins: [],
};
