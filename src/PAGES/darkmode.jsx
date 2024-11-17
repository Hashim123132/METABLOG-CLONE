import React from 'react'
import { useEffect, useState } from 'react';


const darkmode = () => {
  const [darkMode, setDarkMode] = useState(false);

  // On page load, check if dark mode is already set in localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode on click
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const newMode = !darkMode;
    localStorage.setItem('darkMode', newMode); // Save the preference
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  return (
    <>
          <button onClick={toggleDarkMode} className="bg-blue-600 text-white p-2 rounded-md cursor-pointer ml-[1500px]    px-4 py-2  transition-opacity duration-300 ease-in-out hover:opacity-75  ;">
          Toggle Dark Mode
        </button>
        
  </>
  )
}

export default darkmode