import { useState, useMemo } from "react";
import specialists from "./data";
import SpecialistCard from "./Card";
import Filter from "./Filter";
import "./Filter.css";

const categories = [
  "Все", "Авто", "Бизнес", "Деньги", "Дети", "Документы", "Доставка", "Еда", "Красота", 
  "Медицина", "Недвижимость", "Образование", "Одежда", "Переводчик", "Питомцы", 
  "Ремонт", "Роды", "Развлечения", "Трансфер", "Уборка", "IT", "Другое"
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const SpecialistsList = () => {
  const [selectedCategories, setSelectedCategories] = useState(["Все"]);

  const shuffledSpecialists = useMemo(() => shuffleArray(specialists), []);

  const toggleCategory = (category) => {
    if (category === "Все") {
      setSelectedCategories(["Все"]);
    } else {
      setSelectedCategories(prev =>
        prev.includes(category)
          ? prev.filter(c => c !== category)
          : [...prev.filter(c => c !== "Все"), category]
      );
    }
  };

  const filteredSpecialists =
    selectedCategories.includes("Все") || selectedCategories.length === 0
      ? shuffledSpecialists
      : shuffledSpecialists.filter(specialist =>
          specialist.tags.some(tag => selectedCategories.includes(tag))
        );

  return (
    <div>
      <div className="filter-btn-container">
        <Filter 
          categories={categories} 
          selectedCategories={selectedCategories} 
          toggleCategory={toggleCategory} 
        />
      </div>
      <div className="container">
        {filteredSpecialists.length > 0 ? (
          filteredSpecialists.map((specialist) => (
            <SpecialistCard key={specialist.id} specialist={specialist} />
          ))
        ) : (
          <p className="undefinedSpecialist">Пока нет специалистов в выбранных категориях. Если вы такого знаете, напишите нам!</p>
        )}
      </div>
    </div>
  );
};

export default SpecialistsList;