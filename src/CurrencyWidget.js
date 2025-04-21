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
          EUR: data.rates.EUR,
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
    RUB: 'https://flagcdn.com/w40/ru.png',
    EUR: 'https://flagcdn.com/w40/eu.png',
    BRL: 'https://flagcdn.com/w40/br.png',
  };

  if (loading) return <p>Загрузка курсов валют...</p>;

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1rem',
      borderRadius: '8px',
      maxWidth: '250px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h3>Курс USD</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {Object.entries(rates).map(([currency, rate]) => (
          <li key={currency} style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
            <img
              src={flags[currency]}
              alt={currency}
              style={{ width: '24px', height: '16px', marginRight: '10px', objectFit: 'cover' }}
            />
            <span>{currency}: {rate}</span>
          </li>
        ))}
      </ul>
      <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
        Обновлено: {formattedDate}
      </p>
    </div>
  );
}
  
  export default CurrencyWidget;
  