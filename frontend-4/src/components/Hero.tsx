import React, { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import videoList from '../assets/video/videos.json'
import axios from "axios"
import type { Restau } from "../types/accueil.ts"
import DataLoadingState from './Loading.tsx';
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
  const filtredVideos = videoList.filter(v => v.categories.includes(currentCtegory!))
  if (filtredVideos.length === 0) console.log('Aucun video !!')
  const randomVideo = filtredVideos[Math.floor(Math.random() * filtredVideos.length)]

  useEffect(() => {
    axios.get("http://localhost:5000/restau/last").then(res => setRestau(res.data)).catch(err => {throw Error(err)})
  },[])

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