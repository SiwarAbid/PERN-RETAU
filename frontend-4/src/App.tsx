import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authntification from './pages/Authentification'
import AdminInterf from "./pages/AdminInterf";
import LoginPage from "./pages/LoginAdmin";
import Menu from "./pages/Menu";
import {Accueil, AccueilSections} from "./pages/ClientLayout";
import ScrollManager from "./components/ScrolToTop";
import { CartProvider } from "./context/CartContext";
import { MessageProvider } from "./context/Messages";
import LoyaltyPage from "./pages/Loyality";
import { OrderArchive } from "./components/client-view/orderArchive/OrderArchive";

const App: React.FC = () => {

  return (
    
    
    <Router>
      <CartProvider>
      <MessageProvider>
      <ScrollManager/>
      <Routes>

    {/* Routes client */}

        <Route element={<Accueil />}>
          <Route path="/accueil" element={<AccueilSections />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profil" element={<LoyaltyPage />} />
          <Route path="/orders" element={<OrderArchive />} />
        </Route>
      
    {/* Routes Admin */}
      <Route path="/admin" element={<AdminInterf />} />

    {/* Routes Login  */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Authntification />} />

      </Routes>
      </MessageProvider>
      </CartProvider>
    </Router>
    
      
  )
}

export default App
