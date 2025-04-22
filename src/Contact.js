import React from "react";
import ContactForm from "./ContactForm"; 
import "./Contact.css"; 

const Contact = () => {
  return (
    <section>
          <div className="contact-container">
      <div className="contact-header">
        <h2>Контакты</h2>
        <p>Если у вас остались вопросы или вы хотите поделиться с нами своими отзывами и предложениями, свяжитесь с нами любым удобным для вас способом.</p>
      </div>

      <div className="contact-info">
        <div className="contact-item">
          <h3>Адрес:</h3>
          <p>Флорианополис, Бразилия</p>
        </div>
        <div className="contact-item">
          <h3>Email:</h3>
          <p>
            <a href="mailto:omakeykina@gmail.com">omakeykina@gmail.com</a>
          </p>
        </div>
        <div className="contact-item">
          <h3>Telegram:</h3>
          <p>
            <a href="https://t.me/Olga_Makey" target="_blank" rel="noopener noreferrer">
              @Olga_Makey
            </a>
          </p>
        </div>
      </div>

      <div className="contact-form-section">
        <h3>Форма для связи</h3>
        <ContactForm />
      </div>
    </div>
    </section>

  );
};

export default Contact;