import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import DataLoadingState from '../../Loading';
import { useCart } from '../../../hooks/useCart';
import type { Dish } from '../../../types/dish'

const MenuSection = () => {
  const [currentDish, setCurrentDish] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const currentCategory = localStorage.getItem('currentCategory')
  ? JSON.parse(localStorage.getItem('currentCategory') as string)
  : '';

    // console.log("currentCategory :", currentCategory)
  const dishes = localStorage.getItem('dishes') ? (JSON.parse(localStorage.getItem('dishes') as string) as Dish[]) : [];
    // console.log("dishes without filter :", dishes)
    // console.log("dishes length :", dishes.length)
    // console.log("dishes[0] :", dishes[0])
    // console.log("dishes[0].category :", dishes[0].category.name)
    // console.log("dishes category ", dishes.filter(dish => dish.category.name === currentCategory ))
  const normalize = (str: string) =>
    str.toLowerCase().replace(/\s+/g, ' ').trim(); // enlève \t, \n, espaces multiples, etc.
  const filteredDishes = dishes.filter((dish) =>
  normalize(dish.category?.name || '') === normalize(currentCategory) &&
  dish.isAvailable === true
  );

    // console.log("dishes with filter :", filteredDishes )

    // dishes.forEach(dish => {
    //   console.log(
    //     'Plat:', dish.name,
    //     '| Catégorie plat:', JSON.stringify(dish.category?.name),
    //     '| Catégorie courante:', JSON.stringify(currentCategory),
    //     '| Match:', normalize(dish.category?.name || "") === normalize(currentCategory)
    //   );
    // });

  // Auto-rotation effect
  useEffect(() => {

    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setIsRotating(true);
      setTimeout(() => {
        setCurrentDish((prev) => (prev + 1) % filteredDishes.length);
        setIsRotating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoRotate, filteredDishes.length]);

  const { addToCart } = useCart();
  const nextDish = () => {
    setAutoRotate(false);
    setIsRotating(true);
    setTimeout(() => {
      setCurrentDish((prev) => (prev + 1) % filteredDishes.length);
      setIsRotating(false);
    }, 300);
  };

  const prevDish = () => {
    setAutoRotate(false);
    setIsRotating(true);
    setTimeout(() => {
      setCurrentDish((prev) => (prev - 1 + filteredDishes.length) % filteredDishes.length);
      setIsRotating(false);
    }, 300);
  };

  const goToDish = (index: number) => {
    if (index === currentDish) return;
    setAutoRotate(false);
    setIsRotating(true);
    setTimeout(() => {
      setCurrentDish(index);
      setIsRotating(false);
    }, 300);
  };

  const currentDishData = filteredDishes[currentDish];
  // console.log("currentDishData :", currentDishData)
  // console.log("currentDish :", currentDish)
  // console.log("dishes :", dishes)


  // Calcul de la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const dishesPerPage = 4;

  const totalPages = Math.ceil(filteredDishes.length / dishesPerPage);
  const startIndex = (currentPage - 1) * dishesPerPage;
  const endIndex = startIndex + dishesPerPage;
  const currentDishes = filteredDishes.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Génération des numéros de pages à afficher
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } 
    
    return pages;
  };

  useEffect(() => {
    const newPage = Math.floor(currentDish / dishesPerPage) + 1;
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  }, [currentDish]);

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        {/* Section Header */}
        <div className="menu-header">
          <div className="menu-intro">
            <span className="menu-intro-text">Découvrez nos créations</span>
          </div>
          <h2 className="menu-title">
            Notre <span className="menu-title-accent">Menu</span> Signature
          </h2>
          <p className="menu-description">
            Chaque plat raconte une histoire unique, préparé avec passion par nos chefs
          </p>
        </div>

        {/* Main Content */}
         <div className="menu-content">
          {/* Left Side - Dish Info */}
          {currentDishData ?
          <>
           <div className="dish-info"> 
            <div className="dish-category">{currentDishData.category.name}</div>
            
             <h3 className="dish-name">{currentDishData.name}</h3>
            
            <div className="dish-meta"> 
                <div className="dish-rating">
                <Star className="star-icon" />
                <span>{currentDishData.rating}</span>
                </div> 
               <div className="dish-time">
                  <span className='dish-price'>{currentDishData.price} TND</span>
                </div> 
             </div>
            
            <p className="dish-description">{currentDishData.description}</p> 
            
            <button className="order-btn" onClick={() => addToCart(currentDishData)}>
              Commander ce plat
            </button>
           </div> 

          {/* Center - Rotating Circle */}
          <div className="rotating-circle-container">
            <div className="circle-background"></div>
            <div className="circle-decorations">
              <div className="decoration-ring ring-1"></div>
              <div className="decoration-ring ring-2"></div>
              <div className="decoration-ring ring-3"></div>
            </div> 
            
            <div className={`dish-circle ${isRotating ? 'rotating' : ''}`}>
              <div className="dish-image-container">
                <img 
                  src={`http://localhost:5000/uploads/${currentDishData.image}`}
                  alt={currentDishData.name}
                  className="dish-image"
                />
                <div className="image-border"></div>
              </div>
            </div>

            {/* Navigation Controls */}
            <button className="nav-btn nav-btn-left" onClick={prevDish}>
              <ChevronLeft className="nav-icon" />
            </button>
            <button className="nav-btn nav-btn-right" onClick={nextDish}>
              <ChevronRight className="nav-icon" />
            </button>
           </div>
           </>
            : <DataLoadingState isLoading={false} hasError={true} isEmpty={false} errorMessage="Erreur lors du chargement des données" />}
          {/* Right Side - Dish Indicators */}
          <div className="dish-indicators">
            <div className="indicators-title">Nos Plats</div>
            <div className="indicators-list">
              {currentDishes.map((dish, index) => (
                <button
                  key={dish.name}
                  className={`indicator ${index === currentDish ? 'active' : ''}`}
                  onClick={() => goToDish(index)}
                >
                  <div className="indicator-image">
                    <img src={`http://localhost:5000/uploads/${dish.image}`} alt={dish.name} />
                  </div>
                  <div className="indicator-info">
                    <span className="indicator-name">{dish.name}</span>
                    <span className="indicator-price">{dish.price} TND</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Progress Dots  */}
              {totalPages > 1 && (
              <div className="progress-dots pt-10">
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    className={`progress-dot ${index === currentPage-1 ? 'active' : ''}`}
                    onClick={() => goToPage(page as number)} 
                    />
                ))}
              </div>)}
          </div>
        </div>

        {/* Pagination */}
        {/* 
          <div className="flex items-center justify-center gap-2"> */}
            

            {/* Page Numbers */}
            {/* <div className="flex items-center gap-1">
              
                <Fragment key={index}>
                  {page === '...' ? (
                    <div className="flex items-center justify-center w-10 h-10 text-white/70">
                      <MoreHorizontal className="w-5 h-5" />
                    </div>
                  ) : (
                    <button
                      onClick={() => goToPage(page as number)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-white text-indigo-600 shadow-lg transform scale-110'
                          : 'bg-white/20 text-white hover:bg-white/30 hover:transform hover:scale-105'
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </Fragment>
              ))}
            </div> */}

            {/* Next Button */}
            {/* <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === totalPages
                  ? 'bg-white/20 text-white/50 cursor-not-allowed'
                  : 'bg-white/90 text-indigo-600 hover:bg-white hover:shadow-lg hover:transform hover:scale-105'
              }`}
            >
              <span className="hidden sm:inline">Suivant</span>
              <ChevronRight className="w-5 h-5" />
            </button> 
          </div>
        )}*/}

      </div>
    </section>
  );
};

export default MenuSection;