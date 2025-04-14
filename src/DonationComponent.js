import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import support from './support.jpg';
import crypto from './crypto.jpg';
import pix from './pix.png';
import './DonationComponent.css';

const DonationComponent = () => {
  return (
    <div className="donation-container">
      <img src={support} width="100%" alt="support" />
      <h2 className="donation-header">Поддержите наш проект</h2>

      <p>
        Наш проект бесплатен как для специалистов, так и для пользователей. Мы стараемся создавать что-то
        действительно классное и удобное для нашего коммьюнити. Однако, если вы хотите нас поддержать, вы можете
        сделать это с помощью донатов.
      </p>
      <p><b>Мы будем благодарны за вашу помощь в развитии проекта!</b></p>
      <div className='donats'>
        <h4>Как сделать донат?</h4>
      <div className="donation-cont">
        <TabView className="tabs-view">
          <TabPanel header="Через бразильские банки (PIX)">
          <p>
    Перевести через Pix:
    <a
      href="https://nubank.com.br/cobrar/2lvgtx/67e9c83d-40d1-43bb-9779-5e2ce7fe1ad5" 
      target="_blank"
      rel="noopener noreferrer"
      className="pix-link"
    >
      Копировать код
    </a>
  </p>
            <img src={pix} width="150px" alt="qrcode-pix"/>
          </TabPanel>
          <TabPanel header="Через российские банки">
            <p>Информация о поддержке через российские банки.</p>
          </TabPanel>
          <TabPanel header="Криптовалютой">
          <p><b>Network: </b>TRC20</p>
            <p><b>Wallet Address: </b>TLQMa8m4e4sDhVYtCmk3MQ9BSEx4H6yZbq</p>
            <img src={crypto} width="150px" alt="qrcode-crypto" />
          </TabPanel>
        </TabView>
      </div>
      </div>

    </div>
  );
};

export default DonationComponent;

