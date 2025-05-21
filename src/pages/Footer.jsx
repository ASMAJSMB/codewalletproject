import React from "react";
import { useDarkMode } from "../components/DarkModeContext"; 
import "./style.css";
// le footer 
const Footer = () => {
  const { darkMode } = useDarkMode();

  return (
    <footer className={`footer ${darkMode ? "dark-mode" : ""}`}>
      <p className="footer-text">© 2025 Code Wallet. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
