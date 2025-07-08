import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import '../assets/style/accueil.css'
import MenuSection from '../components/MenuSection';
import TopDishes from '../components/TopDish';
import ChefsSection from '../components/NosChefs';
import AboutSection from '../components/AboutUs';
import ContactSection from '../components/Contact';
function Accueil() {
  return (
    <div className="transition-colors">
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <TopDishes />
        <ChefsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default Accueil;