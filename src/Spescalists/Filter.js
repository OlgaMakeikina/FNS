import "./Filter.css";

const Filter = ({ categories, selectedCategories, toggleCategory }) => {
  return (
    <div className="filter-container">
      {categories.map((category) => (
        <button
          key={category} 
          onClick={() => toggleCategory(category)}
          className={selectedCategories.includes(category) ? "filter-button active" : "filter-button"}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Filter;
