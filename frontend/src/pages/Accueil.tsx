import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { useTheme } from '../hooks/useTheme';
import '../css/Accuil.css';

function Accueil() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-all duration-1000 relative overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-br from-[#9f754c] via-[#9f754c]/80 to-[#f8bb4c]/60' 
            : 'bg-gradient-to-br from-[#fef6e5] via-[#f9d1b8]/50 to-[#f8bb4c]/30'
        }`}>
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        {/* Placeholder for future sections */}
        <section className="h-screen bg-secondary-100 dark:bg-brown-800 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brown-900 dark:text-neutral-50 mb-4">
              Autres sections à venir
            </h2>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Accueil;