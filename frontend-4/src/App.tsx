import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authntification from './pages/Authentification'
import AdminInterf from "./pages/AdminInterf";
import LoginPage from "./pages/LoginAdmin";
import Menu from "./pages/Menu";
import {Accueil, AccueilSections} from "./pages/ClientLayout";

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
    {/* Routes client */}
      <Route element={<Accueil />}>
        <Route path="/accueil" element={<AccueilSections />} />
        <Route path="/menu" element={<Menu />} />
      </Route>
    {/* Routes Admin */}
      <Route path="/admin" element={<AdminInterf />} />
    {/* Routes Login  */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Authntification />} />
      </Routes>

    </Router>
      
  )
}

export default App
