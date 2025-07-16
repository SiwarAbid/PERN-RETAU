import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authntification from './pages/Authentification'
import Accueil from "./pages/Accueil";
import AdminInterf from "./pages/AdminInterf";
import LoginPage from "./pages/LoginAdmin";

const App: React.FC = () => {

  return (
    <Router>
       <Routes>
         <Route path="/" element={<Authntification />} />
         <Route path="/accueil" element={<Accueil />} />
         <Route path="/auth" element={<LoginPage />} />
         <Route path="/admin" element={<AdminInterf/>} />
       </Routes>
     </Router>
      
  )
}

export default App
