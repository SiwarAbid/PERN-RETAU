import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authntification from './pages/Authentification'
import Accueil from "./pages/Accueil";

const App: React.FC = () => {

  return (
    <Router>
       <Routes>
         <Route path="/" element={<Authntification />} />
         <Route path="/accueil" element={<Accueil />} />

       </Routes>
     </Router>
      
  )
}

export default App
