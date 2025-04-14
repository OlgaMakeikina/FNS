import React, { useState, useEffect } from "react";
import "./Widget.css";

const CurrencyWidget = () => {
    const [rates, setRates] = useState(null);
  
    useEffect(() => {
      const fetchRates = async () => {
        try {
          const response = await fetch("https://api.exchangerate-api.com/v4/latest/RUB");
          const data = await response.json();
          setRates(data.rates);
        } catch (error) {
          console.error("Ошибка загрузки курсов валют:", error);
        }
      };
      fetchRates();
    }, []);
  
    return (
      <div className="currency-widget-container">
        <div className="currency-widget-content">
          {rates ? (
            <table>
              <thead>
                <tr>
                  <th>Валюта</th>
                  <th>За 100 RUB</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>BRL</td>
                  <td>{(rates.BRL * 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>USD</td>
                  <td>{(rates.USD * 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>EUR</td>
                  <td>{(rates.EUR * 100).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Загрузка курсов...</p>
          )}
        </div>
        <div className="currency-widget-footer">
          <a href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer">
            ExchangeRate-API
          </a>
        </div>
      </div>
    );
  };
  
  export default CurrencyWidget;