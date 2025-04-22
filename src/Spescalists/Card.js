import { Link } from "react-router-dom"; // Добавь импорт Link
import "./Specialists.css";

const SpecialistCard = ({ specialist }) => {
  const transliterate = (text) => {
    return text
      .toLowerCase()
      .replace(/[а-яА-ЯёЁ]/g, (match) => {
        const map = {
          а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh',
          з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', 
          п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', 
          ч: 'ch', ш: 'sh', щ: 'sch', ы: 'y', э: 'e', ю: 'yu', я: 'ya',
        };
        return map[match] || match;
      })
      .replace(/\s+/g, "-") 
      .replace(/[^a-z0-9-]/g, ""); 
  };

  const urlName = transliterate(specialist.name);

  return (
    <article className="card">
      <Link to={`/specialist/${urlName}`} className="card-link">
        <img 
          className="card-img" 
          src={specialist.photos?.[0] || "/images/default.jpg"} 
          alt={`Фото ${specialist.name}`} 
        />
        <h3 className="specialist-name">{specialist.name}</h3>
        <p className="specialist-services">{specialist.services}</p>
      </Link>
    </article>
  );
};

export default SpecialistCard;