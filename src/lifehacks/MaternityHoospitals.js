import React from "react";
import "./ArticleFull.css";

const MaternityHospitals = () => {
  return (
    <div className="article-full">
      <h1 className="article-title">
        Роддома во Флорианополисе: где рожать — бесплатные и платные клиники
      </h1>

      <p className="article-text">
        Флорианополис, столица штата Санта-Катарина, считается одним из лучших городов Бразилии для жизни и семьи. 
        И если вы ожидаете пополнение — или только планируете, — вопрос выбора роддома становится одним из главных. 
        В городе есть как государственные (бесплатные по системе SUS), так и частные клиники, каждая со своими особенностями и уровнем сервиса.
      </p>

      <h2 className="article-subtitle">🏥 Бесплатные роддома (по системе SUS)</h2>
      <p className="article-text">
        Во Флорианополисе система здравоохранения предлагает качественную помощь беременным женщинам через SUS (Sistema Único de Saúde). 
        Эти учреждения часто сотрудничают с университетами, поэтому здесь работают как опытные врачи, так и стажёры под присмотром.
      </p>

      <div className="article-note">
        <p className="article-note-text">
          💡 <strong>Важно:</strong> Бесплатные роддома не требуют предварительной записи на роды, 
          но лучше заранее встать на учёт по месту жительства и наблюдаться в ближайшем UBS (Unidade Básica de Saúde).
        </p>
      </div>

      <div className="article-section">
        <h3 className="article-section-title">1. Maternidade Carmela Dutra</h3>
        <p className="article-section-info">📍 Centro, Florianópolis</p>
        <p className="article-text">
          Один из самых известных государственных роддомов города. Принимает экстренные и плановые роды, предоставляет поддержку при грудном вскармливании, ведение беременности и послеродовой уход. 
          Есть отделение интенсивной терапии для новорождённых (UTI Neonatal).
        </p>
      </div>

      <div className="article-section">
        <h3 className="article-section-title">2. Hospital Universitário (HU-UFSC)</h3>
        <p className="article-section-info">📍 Trindade, Florianópolis</p>
        <p className="article-text">
          Университетская больница, связанная с Федеральным университетом Санта-Катарины. 
          Специализируется на естественных родах и предоставляет всестороннюю медицинскую поддержку до и после родов.
        </p>
      </div>

      <div className="article-section">
        <h3 className="article-section-title">3. Maternidade Municipal de Biguaçu</h3>
        <p className="article-section-info">📍 Biguaçu (метрополия Флорианополиса)</p>
        <p className="article-text">
        Небольшой, но современный муниципальный роддом. Принимает экстренные и плановые роды, ориентирован на жителей Бигуасу и близлежащих районов. Хвалят за индивидуальный подход, чистоту и участие акушерок. Работает по системе SUS, возможна госпитализация по направлению.
        </p>
      </div>

      <h2 className="article-subtitle">💼 Частные роддома</h2>
      <p className="article-text">
        Частные клиники — это высокий комфорт, индивидуальный подход, возможность выбора врача и дополнительных услуг (например, отдельная палата, семейные роды и т.д.).
      </p>

      <div className="article-note">
        <p className="article-note-text">
          💰 <strong>Стоимость:</strong> роды в частной клинике могут варьироваться от <strong>R$8.000</strong> до <strong>R$20.000+</strong>, 
          в зависимости от пакета услуг, врача, условий и страхового покрытия (если он есть).
        </p>
      </div>

      <div className="article-section">
        <h3 className="article-section-title">1. Hospital Baía Sul (временно на обновлении)</h3>
        <p className="article-section-info">📍 Centro, Florianópolis</p>
        <p className="article-text">
          Один из самых престижных частных роддомов города, но в данный момент проходит обновление и временно не принимает роды.
        </p>
      </div>

      <div className="article-section">
        <h3 className="article-section-title">2. Ilha Hospital</h3>
        <p className="article-section-info">📍 Saco Grande, Florianópolis</p>
        <p className="article-text">
          Современная клиника с высокотехнологичным оборудованием и комфортными условиями. 
          Есть возможность выбора персонального врача и пакета с индивидуальной палатой.
        </p>
      </div>

      <div className="article-section">
        <h3 className="article-section-title">3. Hospital e Maternidade Santa Helena</h3>
        <p className="article-section-info">📍 Campinas, São José</p>
        <p className="article-text">
          Частная клиника с хорошей репутацией, работающая как по прямым договорам, так и по страховке. 
          Имеет женскую консультацию, родильное и послеродовое отделение, ориентировано на семейные роды.
        </p>
      </div>
    </div>
  );
};

export default MaternityHospitals;