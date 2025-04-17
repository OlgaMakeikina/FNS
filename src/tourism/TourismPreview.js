import React from "react";
import { Link } from "react-router-dom";
import '../lifehacks/Lifehacks.css';

const TourismPreview = ({ title, date, excerpt, link, picture}) => {
  return (
    <div className="lifehacks-card">
      <img src={picture} alt={title} />
      <h3>{title}</h3>
      <p>{date}</p>
      <p>{excerpt}</p>
      <Link to={link}>Читать дальше</Link>
    </div>  
  );
};

export default TourismPreview;