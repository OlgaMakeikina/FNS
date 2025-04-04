import { useNavigate } from "react-router-dom";
import "./Specialists.css";

const SpecialistCard = ({ specialist }) => {
  const navigate = useNavigate();

  // Транслитерация имени
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
      .replace(/\s+/g, "-") // заменяем пробелы на дефисы
      .replace(/[^a-z0-9-]/g, ""); // удаляем все символы, кроме латинских букв и цифр
  };

  const urlName = transliterate(specialist.name);

  return (
    <div className="card" onClick={() => navigate(`/specialist/${urlName}`)}>
      <img 
        className="card-img" 
        src={specialist.photos?.[0] || "/images/default.jpg"} 
        alt={specialist.name} 
      />
      <h3 className="specialist-name">{specialist.name}</h3>
      <p className="specialist-services">{specialist.services}</p>
    </div>
  );
};

export default SpecialistCard;
