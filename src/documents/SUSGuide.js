import React from "react";
import "../lifehacks/ArticleFull.css";

const SUSGuide = () => {
  return (
    <div className="article-full">
      <h1 className="article-title">🏥 Как оформить SUS в поликлинике (UBS)</h1>

      <p className="article-text">
        SUS (Sistema Único de Saúde) — это бразильская система бесплатного здравоохранения. Чтобы оформить Cartão SUS и получить доступ к медицинским услугам, вам нужно зарегистрироваться в ближайшей CS (Centro de Saúde). Вот пошаговая инструкция.
      </p>

      <h3 className="article-section-title">1. Найдите ближайшую UBS (Unidade Básica de Saúde)</h3>
      <p className="article-text">
        Это обычная муниципальная поликлиника по месту жительства. Найти её можно через{" "}
        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
          Google Maps
        </a>{" "}
        или спросить у соседей.
      </p>

      <h3 className="article-section-title">2. Возьмите с собой документы</h3>
      <ul className="article-list">
        <li>Паспорт или RNE/RNM;</li>
        <li>CPF (обязателен);</li>
        <li>Подтверждение адреса (коммунальный счёт, договор аренды или декларация жителя);</li>
        <li>
          Если вы арендуете жильё без контракта, можно попросить собственника или соседа написать{" "}
          <em>Declaração de residência</em>.
        </li>
      </ul>

      <h3 className="article-section-title">3. Придите лично в CS</h3>
      <p className="article-text">
        В регистратуре (<em>recepção</em>) сообщите, что хотите оформить Cartão SUS. Вам зададут несколько вопросов и внесут данные в систему.
      </p>

      <h3 className="article-section-title">4. Получите номер SUS</h3>
      <p className="article-text">
        Карточку могут выдать сразу или через несколько дней. Обычно это пластиковая или бумажная карточка с вашим индивидуальным номером.
      </p>

      <div className="article-note">
        <p className="article-note-text">
          💡 <strong>Советы:</strong>
        </p>
        <ul className="article-list">
          <li>
            Если вы планируете беременность или уже беременны — оформление SUS крайне желательно для наблюдения в бесплатной женской консультации и родов.
          </li>
          <li>
            Без SUS невозможно записаться к специалисту по направлению, даже если вы обращаетесь через частную клинику, подключённую к системе.
          </li>
          <li>Оформление полностью бесплатное.</li>
        </ul>
      </div>
    </div>
  );
};

export default SUSGuide;