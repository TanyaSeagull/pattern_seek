import React from 'react';
import './PatternCard.css'; 
// Компонент принимает данные одного лекала (props) через деструктуризацию
function PatternCard({ pattern }) {
  // Простая вспомогательная функция, чтобы красиво выводить названия категорий
  const getCategoryName = (category) => {
    const categories = {
      pants: 'Брюки',
      skirts: 'Юбки',
      dresses: 'Платья'
    };
    return categories[category] || category;
  };

  return (
    <div className="pattern-card">
      {/* Картинка-превью */}
      <img 
        src={pattern.image} 
        alt={pattern.title} 
        className="pattern-card-image" 
      />
      
      <div className="pattern-card-info">
        <div>
          <h3 className="pattern-card-title">{pattern.title}</h3>
          
          {/* Информация о размере и категории */}
          <div className="pattern-card-meta">
            <span>Размер: <strong>{pattern.size}</strong></span>
            {' | '}
            <span className="pattern-category-tag">
              {getCategoryName(pattern.category)}
            </span>
          </div>
        </div>

        {/* Та самая важная БЕЗОПАСНАЯ ссылка на внешний сайт */}
        <a 
          href={pattern.link} 
          target="_blank"             // Открывает в новой вкладке
          rel="noopener noreferrer"   // Защищает твой сайт
          className="pattern-card-button"
        >
          Скачать у автора
        </a>
      </div>
    </div>
  );
}

export default PatternCard;