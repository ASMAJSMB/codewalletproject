import React from "react";
import { useDarkMode } from "../components/DarkModeContext"; 
import "./style.css";

const Footer = () => {
  const { darkMode } = useDarkMode();

  return (
    <footer className={`footer ${darkMode ? "dark-mode" : ""}`}>
      <p className="footer-text">© 2025 Code Wallet. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
