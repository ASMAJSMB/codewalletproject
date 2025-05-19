import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/header.jsx";
import Footer from "./pages/Footer.jsx";
import Fragments from "./pages/fragments.jsx";
import Tags from "./pages/tags.jsx";
import Info from "./pages/info.jsx";
import FormulaireFragment from "./components/FormulaireFragment.jsx";
import { DarkModeProvider } from './components/DarkModeContext.jsx';

function App() {
  return (
    <DarkModeProvider>
      {/* pour mettre le mode sombre  */}
      <Router>
        {/* pour la redirection des pages  */}
        <div className="page-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Fragments />} />
              <Route path="/fragments" element={<Fragments />} />
              <Route path="/tags" element={<Tags />} />
              <Route path="/info" element={<Info />} />
              <Route path="/formulaire/new" element={<FormulaireFragment />} />
              <Route path="/formulaire/:id" element={<FormulaireFragment />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
