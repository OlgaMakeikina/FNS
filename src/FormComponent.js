import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import './FormComponent.css';
import { Link } from 'react-router-dom';

// Функция для сжатия изображений перед загрузкой
const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    // Максимальный размер файла после сжатия (4 МБ)
    const maxFileSize = 4 * 1024 * 1024;
    
    // Если файл уже меньше максимального размера, оставляем как есть
    if (file.size <= maxFileSize) {
      resolve(file);
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Сохраняем соотношение сторон, уменьшая размер
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Уменьшаем качество изображения, пока оно не станет меньше максимального размера
        let quality = 0.9;
        let output;
        
        function compressMore() {
          output = canvas.toDataURL('image/jpeg', quality);
          
          // Преобразуем Base64 в Blob
          const byteString = atob(output.split(',')[1]);
          const mimeType = output.split(',')[0].split(':')[1].split(';')[0];
          const arrayBuffer = new ArrayBuffer(byteString.length);
          const intArray = new Uint8Array(arrayBuffer);
          
          for (let i = 0; i < byteString.length; i++) {
            intArray[i] = byteString.charCodeAt(i);
          }
          
          const blob = new Blob([arrayBuffer], { type: mimeType });
          
          if (blob.size > maxFileSize && quality > 0.1) {
            quality -= 0.1;
            compressMore();
          } else {
            // Создаем новый файл с новым именем и типом
            const compressedFile = new File([blob], file.name, { type: 'image/jpeg' });
            console.log(`Файл сжат: ${file.name}, Исходный размер: ${file.size / 1024}KB, Новый размер: ${compressedFile.size / 1024}KB`);
            resolve(compressedFile);
          }
        }
        
        compressMore();
      };
      
      img.onerror = (error) => {
        console.error('Ошибка при загрузке изображения:', error);
        reject(error);
      };
    };
    
    reader.onerror = (error) => {
      console.error('Ошибка при чтении файла:', error);
      reject(error);
    };
  });
};

function FormComponent() {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    description: '',
    address: '',
    category: [],
    instagram: '',
    telegram: '',
    whatsapp: '',
    website: '',
    price: '',
    email: '',
    consent: false,
  });

  const categoryOptions = [
    'Авто', 'Бизнес', 'Дети', 'Документы', 'Доставка', 'Еда', 'Красота',
    'Медицина', 'Недвижимость', 'Образование', 'Одежда', 'Переводчик', 'Питомцы',
    'Ремонт', 'Роды', 'Развлечения', 'Трансфер', 'Уборка', 'IT', 'Другое',
  ];

  const [photos, setPhotos] = useState({
    photo1: null,
    photo2: null,
    photo3: null,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const dropdownRef = useRef(null);
  const recaptchaRef = useRef(null);

  useEffect(() => {
    console.log('Компонент FormComponent смонтирован');
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(`Файл выбран: ${e.target.name}`, { name: file.name, size: file.size });
      
      try {
        // Показываем индикатор загрузки для выбранного поля
        setPhotos((prev) => ({ 
          ...prev, 
          [e.target.name]: { 
            name: `Сжатие ${file.name}...`, 
            isLoading: true 
          } 
        }));
        
        // Сжимаем изображение
        const compressedFile = await compressImage(file);
        
        // Обновляем состояние с сжатым файлом
        setPhotos((prev) => ({ ...prev, [e.target.name]: compressedFile }));
        console.log(`Файл обработан: ${e.target.name}`, { 
          name: compressedFile.name, 
          originalSize: Math.round(file.size / 1024), 
          compressedSize: Math.round(compressedFile.size / 1024),
          reduction: Math.round((1 - compressedFile.size / file.size) * 100)
        });
      } catch (error) {
        console.error('Ошибка при обработке файла:', error);
        // В случае ошибки, используем оригинальный файл
        setPhotos((prev) => ({ ...prev, [e.target.name]: file }));
        setError(`Проблема с обработкой файла ${file.name}. Попробуйте уменьшить размер вручную.`);
      }
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => {
      const currentCategories = prev.category;
      if (currentCategories.includes(value)) {
        console.log(`Категория удалена: ${value}`);
        return {
          ...prev,
          category: currentCategories.filter((c) => c !== value),
        };
      } else if (currentCategories.length < 3) {
        console.log(`Категория добавлена: ${value}`);
        return {
          ...prev,
          category: [...currentCategories, value],
        };
      } else {
        setError('Можно выбрать не более 3 категорий.');
        console.log('Ошибка: превышен лимит категорий');
        return prev;
      }
    });
  };

  const handleRecaptchaChange = (token) => {
    console.log('reCAPTCHA токен получен', { token: !!token });
    setRecaptchaToken(token);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    console.log('Отправка формы начата', { formData, photos: Object.keys(photos).filter(k => photos[k]) });

    if (!recaptchaToken) {
      setError('Пожалуйста, подтвердите, что вы не робот.');
      console.log('Ошибка: отсутствует reCAPTCHA токен');
      setIsSubmitting(false);
      return;
    }
    
    // Отладочная информация по полям формы
    console.log("==== Проверка полей формы ====");
    console.log("name:", formData.name ? 'Заполнено' : 'ПУСТО');
    console.log("email:", formData.email ? 'Заполнено' : 'ПУСТО');
    console.log("service:", formData.service ? 'Заполнено' : 'ПУСТО');
    console.log("address:", formData.address ? 'Заполнено' : 'ПУСТО');
    console.log("description:", formData.description ? 'Заполнено' : 'ПУСТО');
    console.log("category:", formData.category.length > 0 ? `Выбрано ${formData.category.length}` : 'НЕ ВЫБРАНЫ');
    console.log("photo1:", photos.photo1 ? 'Загружено' : 'НЕ ЗАГРУЖЕНО');
    console.log("consent:", formData.consent ? 'Подтверждено' : 'НЕ ПОДТВЕРЖДЕНО');

    let emptyFields = [];

    if (!formData.name) emptyFields.push('Имя');
    if (!formData.email) emptyFields.push('Email');
    if (!formData.service) emptyFields.push('Перечень услуг');
    if (!formData.address) emptyFields.push('Адрес');
    if (!formData.description) emptyFields.push('Описание');
    if (formData.category.length === 0) emptyFields.push('Категория');
    if (!photos.photo1) emptyFields.push('Фото обложки');
    if (!formData.consent) emptyFields.push('Согласие');

    if (emptyFields.length > 0) {
      const errorMessage = `Пожалуйста, заполните следующие поля: ${emptyFields.join(', ')}`;
      setError(errorMessage);
      console.log('Ошибка: не заполнены обязательные поля:', emptyFields);
      console.log('Данные формы:', formData);
      console.log('Файлы:', photos);
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => {
          data.append('category', val);
          console.log(`Добавлена категория: ${val}`);
        });
      } else if (value || typeof value === 'boolean') {
        data.append(key, value);
        console.log(`Добавлено поле: ${key} = ${value}`);
      }
    });

    Object.entries(photos).forEach(([key, value]) => {
      if (value) {
        data.append(key, value);
        console.log(`Добавлен файл: ${key} (${value.name})`);
      }
    });

    data.append('recaptchaToken', recaptchaToken);
    console.log('FormData подготовлена', { fields: [...data.entries()].map(([k, v]) => ({ [k]: v instanceof File ? v.name : v })) });
    console.log('Все ключи в FormData:', [...data.keys()]);

    const maxRetries = 2; // Максимальное количество повторных попыток
    
    try {
      // Использование URL из переменных окружения с фолбэком
      const apiUrl = `${process.env.REACT_APP_API_URL || 'https://floripa.live'}/api/send`;
      console.log('Отправка запроса по URL:', apiUrl);
      console.log('Form data keys:', [...data.keys()]);
      
      console.log('Начинаем отправку на:', apiUrl);
      const startTime = Date.now();
      
      const response = await axios.post(apiUrl, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 90000, // Увеличиваем таймаут до 90 секунд
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Прогресс загрузки: ${percentCompleted}%`);
        }
      });
      
      const endTime = Date.now();
      console.log(`Время отправки: ${(endTime - startTime) / 1000} секунд`);
      console.log('Успешный ответ от сервера', { status: response.status, data: response.data });
      alert('Форма успешно отправлена!');
      setFormData({
        name: '',
        service: '',
        description: '',
        address: '',
        category: [],
        instagram: '',
        telegram: '',
        whatsapp: '',
        website: '',
        price: '',
        email: '',
        consent: false,
      });
      setPhotos({ photo1: null, photo2: null, photo3: null });
      setRecaptchaToken(null);
      recaptchaRef.current.reset();
      // Сбрасываем счетчик попыток и состояние отправки
      setRetryCount(0);
      setIsSubmitting(false);
    } catch (err) {
      console.error('Ошибка при отправке', {
        message: err.message,
        response: err.response ? { status: err.response.status, data: err.response.data } : null,
      });
      
      // Автоматическая повторная попытка при ошибке сети или таймауте
      if ((err.code === 'ECONNABORTED' || !err.response) && retryCount < maxRetries) {
        setRetryCount(prevCount => prevCount + 1);
        setError(`Слабое соединение. Повторная попытка ${retryCount + 1}/${maxRetries}...`);
        
        // Повторная попытка через 3 секунды
        setTimeout(() => {
          handleSubmit(e);
        }, 3000);
        return;
      }
      
      if (err.response) {
        // Ошибка от сервера с кодом состояния
        if (err.response.status === 413) {
          setError('Размер файлов слишком большой. Пожалуйста, уменьшите размер изображений (максимум 5 МБ).');
        } else if (err.response.status === 429) {
          setError('Слишком много запросов. Пожалуйста, подождите несколько минут и попробуйте снова.');
        } else if (err.response.status >= 500) {
          setError(`Внутренняя ошибка сервера. Пожалуйста, попробуйте позже или свяжитесь с администратором.`);
        } else {
          setError(`Ошибка сервера: ${err.response.status} - ${err.response.data.error || err.message}`);
        }
      } else if (err.request) {
        // Запрос был сделан, но ответ не получен
        if (err.code === 'ECONNABORTED') {
          setError('Превышено время ожидания. Проверьте скорость интернета или попробуйте позже.');
        } else {
          setError('Сервер не отвечает. Пожалуйста, проверьте подключение или попробуйте позже.');
        }
      } else {
        // Что-то другое вызвало ошибку
        setError(`Ошибка: ${err.message}`);
      }
      
      recaptchaRef.current.reset();
      setRecaptchaToken(null);
      // Сбрасываем счетчик попыток после неудачной отправки
      setRetryCount(0);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="addSpecialist-header">
        <h2>Добавить специалиста</h2>
        <p>
          Если вы хотите разместить на сайте информацию о своих услугах, заполните форму ниже. Ваша карточка будет создана в течение 5 рабочих дней.
        </p>
      </div>

      <div className="addSpecialistForm">
        {error && <div style={{ color: 'red', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Ваше имя или название организации:*
              <input name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              E-mail:*
              <input
                type="email"
                name="email"
                placeholder="example@mail.com"
                value={formData.email}
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
                value={formData.service}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Адрес:*
              <input
                name="address"
                placeholder="точный адрес или просто город/район"
                value={formData.address}
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
              {formData.category.length > 0 ? formData.category.join(', ') : categoryOptions[0]}
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
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </label>
          <label>
            Прайс (в формате: услуга — цена в реалах):
            <textarea
              name="price"
              placeholder="напр. стрижка мужская - 100, стрижка детская от - 80"
              value={formData.price}
              onChange={handleChange}
            />
          </label>

          <div className="photo-row">
            <label className="custom-file-upload">
              Фото обложки (квадратное):*
              <div className="file-upload-wrapper">
                <button type="button" onClick={() => document.getElementById('photo1').click()}>
                  +
                </button>
                <span>{photos.photo1 ? (photos.photo1.name || 'Файл выбран') : 'Файл не выбран'}</span>
                <input
                  type="file"
                  id="photo1"
                  name="photo1"
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
            </label>

            <label className="custom-file-upload">
              Фото для галереи 2 (квадратное):
              <div className="file-upload-wrapper">
                <button type="button" onClick={() => document.getElementById('photo2').click()}>
                  +
                </button>
                <span>{photos.photo2 ? (photos.photo2.name || 'Файл выбран') : 'Файл не выбран'}</span>
                <input
                  type="file"
                  id="photo2"
                  name="photo2"
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
            </label>

            <label className="custom-file-upload">
              Фото для галереи 3 (квадратное):
              <div className="file-upload-wrapper">
                <button type="button" onClick={() => document.getElementById('photo3').click()}>
                  +
                </button>
                <span>{photos.photo3 ? (photos.photo3.name || 'Файл выбран') : 'Файл не выбран'}</span>
                <input
                  type="file"
                  id="photo3"
                  name="photo3"
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
            </label>
          </div>

          <div className="addSpecialist-contacts">
            <label htmlFor="contacts">Контакты:</label>
            <div className="contacts-row">
              <input
                name="instagram"
                placeholder="Instagram"
                value={formData.instagram}
                onChange={handleChange}
              />
              <input
                name="telegram"
                placeholder="Telegram"
                value={formData.telegram}
                onChange={handleChange}
              />
            </div>
            <div className="contacts-row">
              <input
                name="whatsapp"
                placeholder="WhatsApp"
                value={formData.whatsapp}
                onChange={handleChange}
              />
              <input
                name="website"
                placeholder="Сайт"
                value={formData.website}
                onChange={handleChange}
              />
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
                  Я подтверждаю свое согласие на размещение предоставленных персональных данных на сайте*{' '}
                  <Link to="/privacy" className="consent-link" target="_blank" rel="noopener noreferrer">
                    Политика конфиденциальности
                  </Link>
                </span>
              </label>
            </div>
          </div>

          <div className="recaptcha-container" style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Lf3pworAAAAAJgE14TSN1-I9w9BSQKKWO8FUVu9"
              onChange={handleRecaptchaChange}
              hl="ru"
            />
          </div>

          <div className="contactForm-btn-cont">
            <button 
              className="contactForm-btn" 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormComponent;