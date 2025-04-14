import React from "react";
import ArticlePreview from "./ArticlePreview";
import articlesData from "./articlesData"; 
import './Lifehacks.css'

const Lifehacks = () => {
  return (
    <div>
      <div className="lifehacks-header">
          <h2>Статьи и лайфхаки</h2>  
          <p>Раздел будет пополняться новыми статьями!</p>
      </div>
  
      <div className="lifehacks-cont">
        {articlesData.map((article) => (
          <ArticlePreview
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