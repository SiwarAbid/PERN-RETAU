import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  isDark?: boolean;
}

type VideoPlayerProps = {
  src: string;
  poster?: string;
  width?: string | number;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  width = '100%',
  autoPlay = false,
  loop = false,
  muted = false,
}) => {
  return (
    <video
      width={width}
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={true}
      className="hero-video"
    >
      Votre navigateur ne supporte pas la lecture de vidéo.
    </video>
  );
};

const Hero: React.FC<HeroProps> = () => {
  return (
    <section id="accueil" className="hero">
      <div className="container">
        <div className="hero-content">
          {/* Left Column - Content */}
          <div className="hero-text">
            {/* Small intro title */}
            <div className="hero-intro">
              <span className="hero-intro-text">
                Un coin, mille saveurs...
              </span>
            </div>

            {/* Main title with mixed typography */}
            <h1 className="hero-title">
              <span className="hero-title-normal">Ici, chaque</span>{' '}
              <span className="hero-title-accent">bouchée</span>{' '}
              <span className="hero-title-normal">vous raconte</span>{' '}
              <span className="hero-title-italic">une histoire.</span>
            </h1>

            {/* Description */}
            <p className="hero-description">
              Découvrez une cuisine authentique où tradition et innovation se rencontrent 
              pour créer des expériences culinaires inoubliables.
            </p>

            {/* Buttons */}
            <div className="hero-buttons">
              <button className="btn-primary">
                <span>Commander maintenant</span>
                <ArrowRight className="icon" />
              </button>
              
              <button className="btn-secondary">
                <Play className="icon" />
                <span>Découvrir notre restau</span>
              </button>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Années d'expérience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100+</div>
                <div className="stat-label">Plats uniques</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5000+</div>
                <div className="stat-label">Clients satisfaits</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="hero-visual">
            <div className="hero-video-container">
              <VideoPlayer
                src="https://res.cloudinary.com/dxg8ndide/video/upload/v1751984263/pinterestdownloader.com-1751983780.121997_vcogdd.mp4"        
                width={200}
                autoPlay={true}
                loop={true}
                muted={true}
              />
              {/* Decorative elements */}
              <div className="decorative-element-1"></div>
              <div className="decorative-element-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;