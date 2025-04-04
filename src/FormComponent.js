import React, { useState } from "react";
import axios from "axios";

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
    price: ""
  });
  
  const [photos, setPhotos] = useState({
    photo1: null,
    photo2: null,
    photo3: null
  });

  const [error, setError] = useState(null);

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
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, category: options }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

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
      {error && <div style={{color: "red"}}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Имя" onChange={handleChange} required /><br />
        <input name="service" placeholder="Услуги" onChange={handleChange} required /><br />
        <textarea name="description" placeholder="Описание" onChange={handleChange} required /><br />
        <input name="address" placeholder="Адрес" onChange={handleChange} required /><br />
        <select multiple name="category" onChange={handleCategoryChange} required>
          <option value="Категория 1">Категория 1</option>
          <option value="Категория 2">Категория 2</option>
          <option value="Категория 3">Категория 3</option>
        </select><br />
        <input type="file" name="photo1" onChange={handleFileChange} accept="image/*" required /><br />
        <input type="file" name="photo2" onChange={handleFileChange} accept="image/*" /><br />
        <input type="file" name="photo3" onChange={handleFileChange} accept="image/*" /><br />
        <input name="instagram" placeholder="Instagram" onChange={handleChange} /><br />
        <input name="telegram" placeholder="Telegram" onChange={handleChange} /><br />
        <input name="whatsapp" placeholder="WhatsApp" onChange={handleChange} /><br />
        <input name="website" placeholder="Сайт" onChange={handleChange} /><br />
        <input name="price" placeholder="Прайс" onChange={handleChange} /><br />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default FormComponent;