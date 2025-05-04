// src/components/CurrencyWidget.jsx
import React, { useEffect, useState } from 'react';
import './Widget.css';

const CurrencyWidget = () => {
  const [rates, setRates] = useState({});
  const [formattedDate, setFormattedDate] = useState('');
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    const monthsRu = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
    ];

    const [year, month, day] = dateString.split('-');
    const monthName = monthsRu[parseInt(month, 10) - 1];
    return `${parseInt(day, 10)} ${monthName} ${year}`;
  };

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then((res) => res.json())
      .then((data) => {
        setRates({
          RUB: data.rates.RUB,
          BRL: data.rates.BRL,
        });
        setFormattedDate(formatDate(data.date));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка загрузки курсов:', error);
        setLoading(false);
      });
  }, []);

  const flags = {
    USD: 'https://flagcdn.com/w40/us.png',
    RUB: 'https://flagcdn.com/w40/ru.png',
    BRL: 'https://flagcdn.com/w40/br.png',
  };

  if (loading) return <p>Загрузка курсов валют...</p>;

  const usdToBrl = rates.BRL ? rates.BRL.toFixed(2) : 'N/A';
  const brlToRub = rates.RUB && rates.BRL ? (rates.RUB / rates.BRL).toFixed(2) : 'N/A';
  const usdToRub = rates.RUB ? rates.RUB.toFixed(2) : 'N/A';

  return (
    <div className="currency-widget">
      <h3>Курсы валют</h3>
      <ul>
        <li>
          <img src={flags.USD} alt="USD" />
          <span>1 USD = {usdToBrl} BRL</span>
          <img src={flags.BRL} alt="BRL" className="flag-right" />
        </li>
        <li>
          <img src={flags.BRL} alt="BRL" />
          <span>1 BRL = {brlToRub} RUB</span>
          <img src={flags.RUB} alt="RUB" className="flag-right" />
        </li>
        <li>
          <img src={flags.USD} alt="USD" />
          <span>1 USD = {usdToRub} RUB</span>
          <img src={flags.RUB} alt="RUB" className="flag-right" />
        </li>
      </ul>
      <p>Обновлено: {formattedDate}</p>
    </div>
  );
};

export default CurrencyWidget;