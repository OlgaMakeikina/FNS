
import "./App.css";
import ContactForm from "./ContactForm";


const Contact = () => {
  return (
    <div>
<div className="contact-header">
<h2 >Контакты</h2>
<p>Если у вас остались вопросы или вы хотите поделиться с нами своими отзывами и предложениями, свяжитесь с нами любым удобным для вас способом.</p>
    <ContactForm />
    </div>
    </div>


  );
};

export default Contact;