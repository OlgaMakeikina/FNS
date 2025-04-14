import React from "react";
import { Link } from "react-router-dom"; // Используем Link для навигации, если у тебя React Router
import "./Footer.css";

const WebsiteMap = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Навигация</h3>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/about">О нас</Link>
            </li>
            <li>
              <Link to="/services">Услуги</Link>
            </li>
            <li>
              <Link to="/contact">Контакты</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Услуги</h3>
          <ul>
            <li>
              <Link to="/services/web-development">Веб-разработка</Link>
            </li>
            <li>
              <Link to="/services/design">Дизайн</Link>
            </li>
            <li>
              <Link to="/services/marketing">Маркетинг</Link>
            </li>
            <li>
              <Link to="/services/support">Поддержка</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Ресурсы</h3>
          <ul>
            <li>
              <Link to="/blog">Блог</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/terms">Условия использования</Link>
            </li>
            <li>
              <Link to="/privacy">Политика конфиденциальности</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Связаться</h3>
          <ul>
            <li>
              <a href="mailto:example@email.com">example@email.com</a>
            </li>
            <li>
              <a href="https://t.me/example" target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
            </li>
            <li>
              <a href="tel:+1234567890">+1 234 567 890</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Название сайта. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default WebsiteMap;