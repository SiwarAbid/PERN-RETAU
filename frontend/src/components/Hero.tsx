import { ArrowRight, Play } from 'lucide-react';
import '../css/Accuil.css';

const Hero = () => {
  return (
    <section id="accueil" className="min-h-screen bg-gradient-to-br from-neutral-50 via-secondary-50 to-secondary-100 dark:from-brown-900 dark:via-brown-800 dark:to-brown-700 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-12">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Small intro title */}
            <div className="inline-block">
              <span className="text-secondary-600 dark:text-secondary-400 text-lg font-medium tracking-wide">
                Un coin, mille saveurs...
              </span>
            </div>

            {/* Main title with mixed typography */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
              <span className="text-brown-900 dark:text-neutral-50">Ici, chaque</span>{' '}
              <span className="text-primary-500 font-bold">bouchée</span>{' '}
              <span className="text-brown-900 dark:text-neutral-50">vous raconte</span>{' '}
              <span className="text-secondary-600 dark:text-secondary-400 italic">une histoire.</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-brown-600 dark:text-neutral-300 max-w-lg leading-relaxed">
              Découvrez une cuisine authentique où tradition et innovation se rencontrent 
              pour créer des expériences culinaires inoubliables.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                <span>Commander maintenant</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="group bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300">
                <Play className="h-5 w-5" />
                <span>Découvrir notre restau</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">15+</div>
                <div className="text-sm text-brown-500 dark:text-neutral-400">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">100+</div>
                <div className="text-sm text-brown-500 dark:text-neutral-400">Plats uniques</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">5000+</div>
                <div className="text-sm text-brown-500 dark:text-neutral-400">Clients satisfaits</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative animate-fade-in">
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Video placeholder with food image */}
              <div className="absolute inset-0 bg-gradient-to-t from-brown-900/30 to-transparent z-10"></div>
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Plat délicieux"
                className="w-full h-full object-cover animate-float"
              />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-6 rounded-full transition-all duration-300 hover:scale-110 border border-white/30">
                  <Play className="h-8 w-8 text-white ml-1" />
                </button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary-500/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;