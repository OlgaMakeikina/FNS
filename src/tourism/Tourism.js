import tourismData from './tourismData';
import TourismPreview from './TourismPreview';
const Tourism = () => {
  return (
    <div>
    <div className="lifehacks-header">
        <h2>Статьи и лайфхаки</h2>  
        <p>Раздел будет пополняться новыми статьями!</p>
    </div>

    <div className="lifehacks-cont">
      {tourismData.map((article) => (
        <TourismPreview
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

export default Tourism;