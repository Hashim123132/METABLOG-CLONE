/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
   
      
      screens: {
        'xsm': '430px', 
      },
      colors: {
        'custom-gray': 'rgb(36, 37, 53)',
        'custom-gray-1': 'rgb(232, 232, 234)',
        'custom-gray-3': 'rgb(232, 232, 234)',
        'custom-gray-2': 'rgb(105, 106, 117)',
        'custom-dark-green': 'rgb(37, 53, 37)',
         'custom-dark': 'rgb(24, 26, 42)',
         'custom-dark2':'rgb(36, 37, 53)'
      },
    
   
     
    
    },
  },
  plugins: [],
}

