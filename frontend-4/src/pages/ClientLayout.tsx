import Header from '../components/client-view/Header';
import Hero from '../components/client-view/acceuil/Hero';
import Footer from '../components/client-view/Footer';
import '../assets/style/accueil.css'
import MenuSection from '../components/client-view/acceuil/MenuSection';
import TopDishes from '../components/client-view/acceuil/TopDish';
import ChefsSection from '../components/client-view/acceuil/NosChefs';
import AboutSection from '../components/client-view/acceuil/AboutUs';
import ContactSection from '../components/client-view/acceuil/Contact';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DataLoadingState from '../components/Loading';
import type { Category } from '../types/accueil';


export interface Dish {
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  rating: number;
  category: Category;
  createdAt?: Date;
}

export const AccueilSections: React.FC = () => {
  return (
      <main>
        <Hero />
        <MenuSection />
        <TopDishes />
        <ChefsSection />
        <AboutSection />
        <ContactSection />
      </main>
  )} 
export const Accueil: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect (() =>{
      const fetchDishes = async () => {
      setLoading(true);
      setError(null);
        try {
          const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
          const response = await fetch(`${apiBaseUrl}/dishes`, {
            credentials: 'include',
          });
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des plats');
          }
          const data = await response.json();
          // console.log(data);
          const dishes : Dish[] = [];
          for(let i = 0; i < data.length; i++) {
            const dish : Dish = {
              name: data[i].name,
              description: data[i].description,
              price: data[i].price,
              image: data[i].image,
              isAvailable: data[i].isAvailable,
              rating: data[i].rating,
              category: data[i].category,
              createdAt: data[i].createdAt
            }
            
            dishes.push(dish);
          }
          localStorage.setItem('dishes', JSON.stringify(dishes));
          // console.log("Dishes LocalStorage ; ",localStorage.getItem('dishes'));
        } catch (err) {
          setError(
            err instanceof Error ? err.message : 'Erreur inconnue lors du chargement'
          );
        } finally {
          setLoading(false);
        }
      };
      fetchDishes();
    },[])
  return (
    <div className="transition-colors">
      <Header />
      <main className="flex-grow">
        {loading && <div className="text-center py-4"><DataLoadingState isLoading={loading} isEmpty={true} hasError={false}/></div>}
        {error && <div className="text-center py-4 text-red-500"><DataLoadingState isLoading={loading} isEmpty={false} hasError={true} errorMessage={error}/></div>}
        {!loading && !error && 
        <Outlet /> }
      </main>
      <Footer />
    </div>
  );
}

export default Accueil;