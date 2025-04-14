import React, { useEffect } from "react";
import "./Widget.css"; 

const WeatherWidget = () => {
  useEffect(() => {
    if (!document.getElementById("weatherwidget-io-js")) {
      const script = document.createElement("script");
      script.id = "weatherwidget-io-js";
      script.src = "https://weatherwidget.io/js/widget.min.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="weather-widget-container">
      <a
        className="weatherwidget-io"
        href="https://forecast7.com/ru/n27d60n48d55/florianopolis/"
        data-label_1="FLORIANÓPOLIS"
        data-label_2="WEATHER"
        data-font="Open Sans Condensed"
        data-days="3"
        data-theme="original"
      >
        FLORIANÓPOLIS WEATHER
      </a>
    </div>
  );
};

export default WeatherWidget;