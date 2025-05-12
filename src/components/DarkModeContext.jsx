import React, { createContext, useContext, useState } from 'react';
// voici le composant du dark mode 

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={darkMode ? 'dark-mode' : 'light-mode'}>
        {children}
      </div>
    </DarkModeContext.Provider>
  );
};
