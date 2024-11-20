import React, { useEffect, useState } from 'react';

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
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode); // Save the preference
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="absolute top-4 right-4 z-10">
      {/* Toggle container */}
      <div
        onClick={toggleDarkMode}
        className={`flex items-center cursor-pointer w-14 h-8 rounded-full p-1 transition-all duration-300 ease-in-out ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
      >
        {/* Knob */}
        <div
          className={`bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${darkMode ? 'transform translate-x-6' : ''}`}
        ></div>
      </div>
    </div>
  );
};

export default darkmode;
