import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, X } from 'lucide-react';
import videoList from '../../../assets/video/videos.json'
import axios from "axios"
import type { Restau } from "../../../types/accueil.ts"
import DataLoadingState from '../../Loading.tsx';
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
  const [restau, setRestau] = useState<Restau | null>(null);
  const [isOpenDecouverte, setIsOpenDecouverte] = useState(false);
  const FoodTime = [
    { categorie: 'Breakfast', de: 6, a: 11},
    { categorie: 'Dessert', de: 11, a: 12},
    { categorie: 'Lunch', de: 12, a: 15},
    { categorie: 'Dessert', de: 15, a: 18},
    { categorie: 'Dinner', de: 18, a: 22},
    { categorie: 'Dessert', de: 22, a: 6}
  ]

  const getCurentCategory = (): string | null => {
    const now = new Date();
    const currentHour = now.getHours();

    for (const { categorie, de, a } of FoodTime) {
    if (de < a) {
      // Période normale (ex: 12 -> 15)
      if (currentHour >= de && currentHour < a) {
        return categorie;
      }
    } else {
      // Période qui traverse minuit (ex: 22 -> 6)
      if (currentHour >= de || currentHour < a) {
        return categorie;
      }
    }
    }
      return null;
    
  }

  const currentCtegory = getCurentCategory();
  const filtredVideos = videoList.filter(v => v.periode.includes(currentCtegory!))
  if (filtredVideos.length === 0) console.log('Aucun video !!')
  const randomVideo = filtredVideos[Math.floor(Math.random() * filtredVideos.length)]
  localStorage.setItem('currentCategory', JSON.stringify(randomVideo.categories));
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios.get(`${apiBaseUrl}/restau/last`).then(res => {
      setRestau(res.data)
      console.log(res.data)
      localStorage.setItem('restaurant', JSON.stringify(res.data));
    }).catch(err => {
      console.log("Errer Restau get -- ", err)
      throw Error(err)
    })

  },[])

  const handleOrderClick = () => {
    sessionStorage.setItem('categorieRandomVideo', randomVideo.categories)
    sessionStorage.setItem('nomRamdomVideo', randomVideo.title)
    window.location.href = '/menu';
  };

  return (
    <section id="accueil" className="hero">
      <div className="container">
        <div className="hero-content">
          { restau ?
          /* Left Column - Content */
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
              {restau.description}
            </p>

            {/* Buttons */}
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => handleOrderClick()}>
                <span>Goûter sans attendre</span>
                <ArrowRight className="icon" />
              </button>
              
              <button className="btn-secondary" onClick={() => setIsOpenDecouverte(true)}
>
                <Play className="icon" />
                <span>Bienvenue chez nous</span>
              </button>
              {/* YouTube iframe */}
              {isOpenDecouverte &&
              <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
                <div
                  className="relative w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden" 
                  onClick={() => setIsOpenDecouverte(false)}
                >
                  <button
                    onClick={() => setIsOpenDecouverte(false)}
                    className="absolute top-2 right-2 text-white hover:text-red-500 z-50"
                  >
                    <X size={28} />
                  </button>
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/xiWU6HmpIU0"
                    title="YouTube video"
                    frameBorder="0"
                    allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>}
            </div>
            </div>
          : <DataLoadingState isLoading={true} hasError={false} isEmpty={true} />}
          {/* Right Column - Visual */}
          <div className="hero-visual">
            <div className="hero-video-container">
              {

              }
              <VideoPlayer
                src={randomVideo.src}
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