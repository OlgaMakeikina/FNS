import React from "react";
import DocumentsPreview from "./DocumentsPreview";
import documentsData from "./documentsdata"; 
import '../lifehacks/Lifehacks.css'

const Lifehacks = () => {
  return (
    <div>
      <div className="lifehacks-header">
          <h2>Гайды по оформлению документов</h2>  
          <p>Раздел будет пополняться новыми статьями!</p>
      </div>
  
      <div className="lifehacks-cont">
        {documentsData.map((article) => (
          <DocumentsPreview
            key={article.id}
            picture={article.picture}
            title={article.title}
            date={article.date}
            excerpt={article.excerpt}
            link={article.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Lifehacks;