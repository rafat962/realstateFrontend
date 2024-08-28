/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'selector',
  theme: {
    screens: {
      sm: '550px',
      md: '767px',
      lg: '1025px',
      xl: '1340px',
    },
    extend: {
      fontFamily:{
        sans:'Poppins',
        sec:'Open Sans'
      },
      colors:{
        prim:'#000000',
        sec:'#F4EAE0',
        thr:'#1D24CA',
        for:'#FAF6F0'
      }
    },
  },
  plugins: [],
}
