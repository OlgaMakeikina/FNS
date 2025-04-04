import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './Contact.css'

function ContactForm() {
  const [state, handleSubmit] = useForm("xeoallvv");

  if (state.succeeded) {
    return <p>Спасибо за отправку сообщения!</p>;
  }

  return (
    <form className="contactForm" onSubmit={handleSubmit}>
      <input id="name" placeholder="Имя" type="text" name="name" required />
      <ValidationError prefix="Имя" field="name" errors={state.errors} />
      <input id="email" placeholder="Email" type="email" name="email" required />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <textarea id="message" placeholder="Ваше сообщение..." name="message" required />
      <ValidationError prefix="Сообщение" field="message" errors={state.errors} />

      <button className="contactForm-btn" type="submit" disabled={state.submitting}>
        Отправить
      </button>
    </form>
  );
}

export default ContactForm;
