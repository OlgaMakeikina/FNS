import React from "react";
import "../lifehacks/ArticleFull.css";

const VisaExtension = () => {
  return (
    <div className="article-full">
      <h1 className="article-title">
        🛂 Как продлить туристическое пребывание на 3 месяца      </h1>

      <p className="article-text">
        Если вы находитесь во Флорипе менее 90 дней и хотите продлить пребывание ещё на 90 дней, вам нужно обратиться в местное отделение Polícia Federal. Процесс довольно простой, но требует оплаты пошлины и визита в офис. Вот пошаговая инструкция, актуальная на апрель 2025 года.
      </p>

      <h3 className="article-section-title">1. Оплата пошлины через сайт Polícia Federal</h3>
      <p className="article-text">
        Первым шагом нужно оплатить пошлину за продление визы (R$110). Это делается онлайн через сайт Polícia Federal.
      </p>
      <ul className="article-list">
        <li>Перейдите на сайт: <a href="https://servicos.dpf.gov.br/gru2/gru?nac=1&rec=9" target="_blank" rel="noopener noreferrer">https://servicos.dpf.gov.br/gru2/gru?nac=1&rec=9</a></li>
        <li>Заполните форму для каждого, кому нужно продлить визу (данные паспорта, имя, и т.д.).</li>
        <li>Внизу выберите код <strong>140090 94</strong> — это продление туристической визы, стоимость R$110.</li>
        <li>После заполнения выберите способ оплаты PIX (в разделе Другие способы оплаты).</li>
        <li>Сохраните и распечатайте квитанцию об оплате. Если нет принтера, сделайте это заранее в любой Papelaria (магазин канцтоваров).</li>
      </ul>

      <h3 className="article-section-title">2. Посещение Polícia Federal</h3>
      <p className="article-text">
        После оплаты вам нужно лично явиться в отделение Polícia Federal с паспортом и квитанцией. Адрес и график работы:
      </p>
      <p className="article-section-info">
  📍 R. Hugo {"D'Antola"} 95, Água Branca, São Paulo (ближайшее метро: Lapa, 8-я серая линия)<br />
  ⏰ Часы работы: с понедельника по пятницу, 8:00–18:00 (суббота и воскресенье — выходные)
</p>

      <h3 className="article-section-title">3. Процесс в офисе Polícia Federal</h3>
      <p className="article-text">
        По прибытии в офис следуйте этим шагам:
      </p>
      <ul className="article-list">
  <li>Подойдите к сотрудникам на входе и скажите на португальском или английском: <em>{"Quero prorrogar meu visto de turista"}</em> или <em>{"I need to extend my tourist visa"}</em>.</li>
  <li>Предъявите паспорт — вас внесут в базу.</li>
  <li>Дождитесь, пока сотрудник отдаст вам паспорт со штампом.</li>
</ul>

      <div className="article-note">
        <p className="article-note-text">
          💡 <strong>Важно:</strong> В каждом штате Бразилии процесс может отличаться. Уточните требования в местном отделении Polícia Federal, если вы не во Флорипе.
        </p>
      </div>
    </div>
  );
};

export default VisaExtension;