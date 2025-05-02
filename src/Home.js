// src/components/Home.jsx
import { useEffect, useState } from 'react';
import map from './map.png';
import mapHover from './mask.png';
import logo from './1.png';
import './Home.css';
import { Link } from 'react-router-dom';
import Specialists from './Spescalists/Specialists';
import { gsap } from 'gsap';

const Home = () => {
  const [isMapHovered, setIsMapHovered] = useState(false);

  const handleMapToggle = () => {
    setIsMapHovered((prev) => !prev);
    gsap.fromTo(
      '.map',
      { scale: 1 },
      { scale: 1.05, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 }
    );
  };

  useEffect(() => {
    gsap.fromTo(
      '.map',
      { x: '-100%' },
      { x: '0%', duration: 2, ease: 'power2.out' }
    );
    gsap.fromTo(
      '.header-content',
      { opacity: 0 },
      { opacity: 1, duration: 3, delay: 0.5, ease: 'power2.out' }
    );
    gsap.fromTo(
      '.home-button',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 2, delay: 1, ease: 'power2.out' }
    );
    gsap.fromTo(
      '.thesis-item',
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.5, delay: 1.5, ease: 'power2.out' }
    );

    const mobileMediaQuery = window.matchMedia('(max-width: 768px)');
    let intervalId;

    const startAutoSwitch = () => {
      intervalId = setInterval(() => {
        setIsMapHovered((prev) => {
          gsap.to('.map', {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              gsap.to('.map', { opacity: 1, duration: 0.3 });
            },
          });
          return !prev;
        });
      }, 3000);
    };

    const handleMediaQueryChange = (e) => {
      if (e.matches) {
        startAutoSwitch();
      } else {
        clearInterval(intervalId);
        gsap.set('.map', { opacity: 1 });
      }
    };

    if (mobileMediaQuery.matches) {
      startAutoSwitch();
    }

    mobileMediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      clearInterval(intervalId);
      mobileMediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <header>
      <div className="home-container">
        <div className="content-wrapper">
          <div className="thesis-container">
            <div className="thesis-item">
              <p>Русскоязычные специалисты во Флорипе</p>
              <p>В одном каталоге — без лишних поисков</p>
            </div>
            <div className="thesis-item">
              <p>Поиск услуг — быстро и удобно</p>
              <p>Фильтры, категории, контакты — всё под рукой</p>
            </div>
            <div className="thesis-item">
              <p>Мастера и профессионалы всех направлений</p>
              <p>Красота, здоровье, ремонт, авто, дети и не только</p>
            </div>
            <div className="thesis-item">
              <p>Сэкономь время на поиски</p>
              <p>Найди нужного специалиста за пару кликов</p>
            </div>
          </div>
          <div className="header-content">
            <img src={logo} alt="logo" width="60px" />
            <h1>Флорипа на связи</h1>
            <h3>Здесь все свои</h3>
          </div>
          <button className="home-button">
            <Link to="/specialists" className="home-button-link">
              Найти специалиста
            </Link>
          </button>
        </div>
        <button
          type="button"
          className="map-button"
          onClick={handleMapToggle}
          onMouseEnter={() => setIsMapHovered(true)}
          onMouseLeave={() => setIsMapHovered(false)}
        >
          <img
            src={isMapHovered ? mapHover : map}
            alt="Interactive map"
            className="map"
          />
        </button>
      </div>
      <div className="thesis-container-mobile">
        <div className="thesis-item">
          <p>Русскоязычные специалисты во Флорипе</p>
          <p>В одном каталоге — без лишних поисков</p>
        </div>
        <div className="thesis-item">
          <p>Поиск услуг — быстро и удобно</p>
          <p>Фильтры, категории, контакты — всё под рукой</p>
        </div>
        <div className="thesis-item">
          <p>Мастера и профессионалы всех направлений</p>
          <p>Красота, здоровье, ремонт, авто, дети и не только</p>
        </div>
        <div className="thesis-item">
          <p>Сэкономь время на поиски</p>
          <p>Найди нужного специалиста за пару кликов</p>
        </div>
      </div>
      <Specialists />
    </header>
  );
};

export default Home;