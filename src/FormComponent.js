import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import './FormComponent.css';
import { Link } from "react-router-dom";

function FormComponent() {
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    description: "",
    address: "",
    category: [],
    instagram: "",
    telegram: "",
    whatsapp: "",
    website: "",
    price: "",
    email: "",
    consent: false 
  });

  const categoryOptions = [
    "Авто", "Бизнес", "Дети", "Документы", "Доставка", "Еда", "Красота", 
    "Медицина", "Недвижимость", "Образование", "Одежда", "Переводчик", "Питомцы", 
    "Ремонт", "Роды", "Развлечения", "Трансфер", "Уборка", "IT", "Другое"
  ];

  const [photos, setPhotos] = useState({
    photo1: null,
    photo2: null,
    photo3: null
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotos(prev => ({ ...prev, [e.target.name]: file }));
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFormData(prev => {
      const currentCategories = prev.category;
      if (currentCategories.includes(value)) {
        return {
          ...prev,
          category: currentCategories.filter(c => c !== value)
        };
      } else if (currentCategories.length < 3) {
        return {
          ...prev,
          category: [...currentCategories, value]
        };
      } else {
        setError("Можно выбрать не более 3 категорий.");
        return prev;
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.email || !formData.service || !formData.address || !formData.description || formData.category.length === 0 || !photos.photo1) {
      setError("Пожалуйста, заполните все обязательные поля и загрузите фото обложки.");
      return;
    }

    const data = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(val => data.append("category", val));
      } else if (value) {
        data.append(key, value);
      }
    });

    Object.entries(photos).forEach(([key, value]) => {
      if (value) {
        data.append(key, value);
      }
    });

    try {
      const response = await axios.post("http://localhost:4001/api/send", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000 
      });
      console.log("Успешный ответ от сервера:", response.data);
      alert("Форма успешно отправлена!");
    } catch (err) {
      console.error("Ошибка при отправке:", err);
      if (err.response) {
        setError(`Ошибка сервера: ${err.response.data.error || err.message}`);
      } else if (err.request) {
        setError("Сервер не отвечает. Проверьте, запущен ли сервер на порту 4001");
      } else {
        setError(`Ошибка: ${err.message}`);
      }
    }
  };

  return (
    <div>
      <div className="addSpecialist-header">
        <h2>Добавить специалиста</h2>
        <p>Если вы хотите разместить на сайте информацию о своих услугах, заполните форму ниже. Ваша карточка будет создана в течение 5 рабочих дней.</p>  
      </div>
   
      <div className="addSpecialistForm">
        {error && <div style={{ color: "red" }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Ваше имя или название организации:*
              <input name="name" onChange={handleChange} required />
            </label>
            <label>
              E-mail:*
              <input
                type="email"
                name="email"
                placeholder="example@mail.com"
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Перечень услуг — кратко:*
              <input
                name="service"
                placeholder="напр., ремонт бытовой техники, услуги косметолога, трансфер в аэропорт"
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Адрес:*
              <input 
                name="address" 
                placeholder="точный адрес или просто город/район"
                onChange={handleChange} 
                required 
              />
            </label>
          </div>

          <fieldset className="custom-dropdown" ref={dropdownRef}>
  <legend>Категория (макс.3):*</legend>
  <button
    type="button"
    className="dropdown-label"
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
  >
    {formData.category.length > 0
      ? formData.category.join(", ")
      : categoryOptions[0]}
    <span className="dropdown-arrow">▼</span>
  </button>
  {isDropdownOpen && (
    <div className="dropdown-options">
      {categoryOptions.map((category, idx) => (
        <label key={idx} className="dropdown-option">
          <input
            type="checkbox"
            value={category}
            checked={formData.category.includes(category)}
            onChange={handleCategoryChange}
          />
          <span>{category}</span>
        </label>
      ))}
    </div>
  )}
</fieldset>

          <label>
            Описание:*
            <textarea name="description" onChange={handleChange} required />
          </label>
          <label>
            Прайс (в формате: услуга — цена в реалах):
            <textarea 
              name="price" 
              placeholder="напр. стрижка мужская - 100, стрижка детская от - 80" 
              onChange={handleChange} 
            />
          </label>
        
          <div className="photo-row">
            <label className="custom-file-upload">
              Фото обложки (квадратное):*
              <div className="file-upload-wrapper">
                <button
                  type="button"
                  onClick={() => document.getElementById("photo1").click()}
                >
                  +
                </button>
                <span>{photos.photo1 ? photos.photo1.name : "Файл не выбран"}</span>
                <input
                  type="file"
                  id="photo1"
                  name="photo1"
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                  required
                />
              </div>
            </label>

            <label className="custom-file-upload">
              Фото для галереи 2 (квадратное):
              <div className="file-upload-wrapper">
                <button
                  type="button"
                  onClick={() => document.getElementById("photo2").click()}
                >
                  +
                </button>
                <span>{photos.photo2 ? photos.photo2.name : "Файл не выбран"}</span>
                <input
                  type="file"
                  id="photo2"
                  name="photo2"
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
            </label>

            <label className="custom-file-upload">
              Фото для галереи 3 (квадратное):
              <div className="file-upload-wrapper">
                <button
                  type="button"
                  onClick={() => document.getElementById("photo3").click()}
                >
                  +
                </button>
                <span>{photos.photo3 ? photos.photo3.name : "Файл не выбран"}</span>
                <input
                  type="file"
                  id="photo3"
                  name="photo3"
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
            </label>
          </div>

          <div className="addSpecialist-contacts">
          <label htmlFor="contacts">Контакты:</label>
            <div className="contacts-row">
              <input name="instagram" placeholder="Instagram" onChange={handleChange} />
              <input name="telegram" placeholder="Telegram" onChange={handleChange} />
            </div>
            <div className="contacts-row">
              <input name="whatsapp" placeholder="WhatsApp" onChange={handleChange} />
              <input name="website" placeholder="Сайт" onChange={handleChange} />
            </div>
          <div className="consent-row">
          <label className="consent-label">
  <input
    type="checkbox"
    name="consent"
    checked={formData.consent}
    onChange={handleChange}
    required
  />
  <span>
    Я подтверждаю свое согласие на размещение предоставленных персональных данных на сайте*{" "}
    <Link to="/privacy" className="consent-link" target="_blank" rel="noopener noreferrer">
      Политика конфиденциальности
    </Link>
  </span>
</label>
          </div>
          </div>
<div className="contactForm-btn-cont">
      <button className="contactForm-btn" type="submit">Отправить</button>
</div>
      
        </form>
      </div>
    </div>
  );
}

export default FormComponent;