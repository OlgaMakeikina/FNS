// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import CurrencyWidget from './CurrencyWidget';
import './Footer.css';
import WorldClocks from './WorldClock';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
    
        <div className="footer-content">
          <div className="footer-links">
            <div className="footer-column">
              <h3>Навигация</h3>
              <ul>
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/specialists">Специалисты</Link></li>
                <li><Link to="/addcontact">Добавить специалиста</Link></li>
                <li><Link to="/contact">Контакты</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Полезная информация</h3>
              <ul>
                <li><Link to="/documents">Документы</Link></li>
                <li><Link to="/lifehacks">Лайфхаки</Link></li>
                <li><Link to="/news">Новости</Link></li>       
                <li><Link to="/tourism">Туризм</Link></li>
                <li><Link to="/privacy">Политика конфиденциальности</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Связаться</h3>
              <ul>
                <li><a href="mailto:omakeykina@gmail.com">omakeykina@gmail.com</a></li>
                <li><a href="https://t.me/Olga_Makey" target="_blank" rel="noopener noreferrer">Telegram</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-widgets">
            <div className="widget-wrapper">
              <CurrencyWidget />
              <WorldClocks />
            </div>
          </div>
          <div className="footer-donation">
          <h3>Поддержите нас</h3>
          <p>
            Ваши донаты помогают нам развивать сайт, добавлять новые функции и поддерживать актуальную информацию для вас. Каждый рубль или реал — это вклад в наше сообщество!
          </p>
          <div className="donation-elements">
            <Link to="/donate" className="donation-btn">
              Задонатить
            </Link>
          </div>
        </div>

        </div>
      </div>

      <div className="footer-bottom">
        <hr />
        <p>
          <b>© {new Date().getFullYear()} "Флорипа на связи".</b> Все права защищены. Дизайн и разработка от{' '}
          <a href="https://olgamakeikina.netlify.app/" target="_blank" rel="noopener noreferrer">
            Ольга Макейкина
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;