import React, { createContext, useContext, useState } from 'react';

// je crée le contexte du dark mode
const DarkModeContext = createContext();

// un hook pour accéder facilement au contexte
export const useDarkMode = () => useContext(DarkModeContext);

// le composant qui gère le dark mode dans l'appli
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false); 

  // fonction pour activer/désactiver le dark mode
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {/* si darkMode est vrai, on met la classe dark-mode sinon light-mode  */}
      <div className={darkMode ? 'dark-mode' : 'light-mode'}>
        {children} {/* on affiche le contenu de l'appli ici */}
      </div>
    </DarkModeContext.Provider>
  );
};
