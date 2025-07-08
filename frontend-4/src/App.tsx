import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authntification from './pages/Authentification'

const App: React.FC = () => {

  return (
    <Router>
       <Routes>
         <Route path="/" element={<Authntification />} />
       </Routes>
     </Router>
      
  )
}

export default App
