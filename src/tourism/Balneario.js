import React from "react";
import "../lifehacks/ArticleFull.css";

const Balneario = () => {
  return (
    <article className="article-full">
      <h2 className="article-title">
        🌊 Путешествие из Флорипы в Бальнеариу-Камбориу: маленький Дубай Бразилии
      </h2>
      <p className="article-text">
        Всего в паре часов езды от Флорианополиса скрывается яркий, контрастный и
        невероятно притягательный город — Бальнеариу-Камбориу (Balneário Camboriú).
        Его нередко называют бразильским Дубаем — и не зря: небоскрёбы вдоль
        побережья, канатная дорога над Атлантическим лесом и насыщенная ночная жизнь
        делают его уникальным местом для короткого уикенда или полноценного отпуска.
      </p>

      <section className="article-section">
        <h2 className="article-subtitle">🚗 Как добраться из Флорипы</h2>
        <p className="article-text">
          Поездка из Флорианополиса занимает примерно 1,5–2 часа на машине (около 90 км),
          в зависимости от трафика.
        </p>
        <p className="article-section-info">🛣️ Маршрут: трасса BR-101 — прямая, живописная дорога вдоль побережья.</p>
        <p className="article-section-info">
          🚌 Автобус: регулярные рейсы отправляются с автовокзала Флорипы (Rodoviária Rita Maria).
          В пути — около 2,5 часов, билеты от 30 до 50 реалов.
        </p>
        <div className="article-note">
          <p className="article-note-text">
            Совет: если выезжать утром в выходной, закладывай дополнительное время — трасса
            может быть загружена, особенно летом.
          </p>
        </div>
      </section>

      <section className="article-section">
        <h2 className="article-subtitle">🌆 Что посмотреть в Бальнеариу-Камбориу</h2>
        
        <div className="article-section">
          <h3 className="article-section-title">📸 1. Пляжи</h3>
          <p className="article-text">
            Главный пляж (Praia Central) окружён небоскрёбами, идеально подходит для
            прогулок и наблюдений за городским ритмом. Если хочется уединения —
            отправляйтесь на Praia das Laranjeiras или Praia do Estaleiro.
          </p>
        </div>

        <div className="article-section">
          <h3 className="article-section-title">🚡 2. Парке Уньюн (Parque Unipraias)</h3>
          <p className="article-text">
            Изюминка города — канатная дорога, соединяющая центральный пляж с районом
            Ларанжейрас, проходящая прямо над лесом и морем. Потрясающие виды и отличное
            место для фото.
          </p>
        </div>

        <div className="article-section">
          <h3 className="article-section-title">🌙 3. Ночная жизнь</h3>
          <p className="article-text">
            Камбориу — мекка для любителей клубов. Здесь находится один из крупнейших
            клубов Южной Америки — Green Valley (в топе мировых рейтингов).
          </p>
        </div>

        <div className="article-section">
          <h3 className="article-section-title">👨‍👩‍👧‍👦 4. Для семей с детьми</h3>
          <p className="article-text">
            Аттракционы на набережной, колесо обозрения FG Big Wheel и даже небольшой
            аквапарк — развлечения на любой возраст.
          </p>
        </div>
      </section>

      <section className="article-section">
        <h2 className="article-subtitle">🍤 Где поесть</h2>
        <p className="article-text">
          <strong>Didge Steakhouse Pub</strong> — стейки и рок-н-ролл.<br />
          <strong>Chaplin Bar</strong> — коктейли с видом на закат.<br />
          <strong>Restaurante Number Seven</strong> — для тех, кто ищет более изысканную кухню.
        </p>
      </section>

      <section className="article-section">
        <h2 className="article-subtitle">🏨 Стоит ли оставаться с ночёвкой?</h2>
        <p className="article-text">
          Однозначно — да, особенно если хочется прочувствовать атмосферу вечернего города.
          Есть множество отелей и апартаментов на любой бюджет — от роскошных небоскрёбов
          до уютных семейных гостиниц.
        </p>
      </section>

      <section className="article-section">
        <h2 className="article-subtitle">🤓 Полезно знать</h2>
        <p className="article-text">
          Город очень безопасный по бразильским меркам, особенно в туристических зонах.
        </p>
        <p className="article-text">
          Летом (декабрь–февраль) здесь многолюдно, поэтому лучше бронировать жильё заранее.
        </p>
        <p className="article-text">
          Подходит как для молодёжи, так и для семей с детьми.
        </p>
      </section>
    </article>
  );
};

export default Balneario;