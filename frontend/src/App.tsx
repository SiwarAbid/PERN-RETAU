import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentification from "./pages/Authntification";
import Accueil from "./pages/Accueil";
// import Contact from "./Contact";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentification />} />
        <Route path="/accueil" element={<Accueil />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
};

export default App;