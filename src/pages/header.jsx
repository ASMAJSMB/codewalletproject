import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../components/DarkModeContext"; 
import "./style.css";

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode(); 

  return (
    <header className="header">
      <div className="container">
        <Link to="/fragments" className="logo">
          <h1>Code Wallet</h1>
        </Link>
        <nav className="nav">
          <Link to="/fragments">Fragment</Link>
          <Link to="/tags">Tags</Link>
          <Link to="/info">Info</Link>
        </nav>
        
        <button className="mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? "Mode Clair" : "Mode Sombre"}
        </button>
      </div>
    </header>
  );
};

export default Header;
