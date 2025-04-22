import React from "react";
import Clock from "react-live-clock";
import "./WorldClocks.css";

const WorldClocks = () => {
  return (
    <div className="clock-widget">
      <h3>Местное время</h3>
      <ul className="clock-list">
        <li className="clock-item">
          <img src="https://flagcdn.com/w40/ru.png" alt="МСК" className="flag" />
          <span>МСК: </span>
          <Clock format={"HH:mm"} ticking={true} timezone={"Europe/Moscow"} />
        </li>
        <li className="clock-item">
          <img src="https://flagcdn.com/w40/br.png" alt="Флорипа" className="flag" />
          <span>Флорипа: </span>
          <Clock format={"HH:mm"} ticking={true} timezone={"America/Sao_Paulo"} />
        </li>
      </ul>
    </div>
  );
};

export default WorldClocks;
