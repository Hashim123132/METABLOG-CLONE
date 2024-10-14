/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': 'rgb(36, 37, 53)',
        'custom-dark-green': 'rgb(37, 53, 37)',
         'custom-dark': 'rgb(24, 26, 42)'
      },
    
   
     
    
    },
  },
  plugins: [],
}

