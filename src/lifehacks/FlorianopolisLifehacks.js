import React from "react";
import "./ArticleFull.css"; 

const FlorianopolisLifeHacks = () => {
  return (
    <div className="article-full">
      <h1 className="article-title">ТОП-5 лайфхаков для жизни во Флорианополисе</h1>

      <p className="article-text">
        Флорианополис — это не просто город, а остров, где каждый день может начинаться с прогулки по пляжу и 
        заканчиваться чашкой чая под шум волн. Но у этого райского места есть свои особенности. 
        Делимся 5 лайфхаками, которые помогут тебе быстрее адаптироваться и чувствовать себя как дома.
      </p>

      <div className="article-section">
        <h3 className="article-section-title">1. 🚗 Планируй передвижение заранее</h3>
        <p className="article-text">
          Флорианополис может быть райским островом, но пробки здесь вполне реальные — особенно в сезон (лето и праздники).
        </p>
        <p className="article-section-info">
          📍 <strong>Лайфхак:</strong> избегай поездок в центр утром и вечером. Используй Google Maps или Waze для планирования маршрута. 
          А ещё лучше — живи ближе к месту работы, школы или хобби.
        </p>
      </div>

      <div className="article-section">
        <h3 className="article-section-title">2. 🛍️ Закупайся на местных фермерских рынках</h3>
        <p className="article-text">
          Фрукты, овощи, сыры, мёд и даже домашние яйца — всё это можно найти на feirinhas (ярмарках).
        </p>
        <p className="article-section-info">
          📍 <strong>Лайфхак:</strong> крупный рынок — на Lagoa da Conceição по средам и субботам. 
          У каждого района есть свои дни и точки — узнай у соседей или в UBS.
        </p>
      </div>

      <div className="article-section">
        <h3 className="article-section-title">3. 🌬️ Готовься к "четырём сезонам за день"</h3>
        <p className="article-text">
          Погода на острове может меняться очень быстро: утром солнце, в обед ветер с моря, вечером дождь.
        </p>
        <p className="article-section-info">
          📍 <strong>Лайфхак:</strong> носи с собой лёгкую ветровку, зонт и не забывай солнцезащитный крем — даже в пасмурную погоду.
        </p>
      </div>

      <div className="article-section">
        <h3 className="article-section-title">4. 💡 Оформи CPF как можно раньше</h3>
        <p className="article-text">
          CPF (аналог ИНН) нужен почти везде: для покупок онлайн, оформления сим-карты, открытия счёта, аренды жилья и даже получения скидок.
        </p>
        <p className="article-section-info">
          📍 <strong>Лайфхак:</strong> оформить CPF можно в отделении Receita Federal.
        </p>
      </div>

      <div className="article-section">
        <h3 className="article-section-title">5. 🤝 Вступай в локальные чаты и сообщества</h3>
        <p className="article-text">
          Самый быстрый способ адаптироваться — общение с теми, кто уже прошёл этот путь. 
          Здесь много русскоязычных, а также англоязычных чатов для экспатов.
        </p>
        <p className="article-section-info">
          📍 <strong>Лайфхак:</strong> ищи Telegram-группы вроде "Floripa Forum", "Флорианополис live", а также локальные Telegram и WhatsApp-группы по районам.
        </p>
      </div>
    </div>
  );
};

export default FlorianopolisLifeHacks;