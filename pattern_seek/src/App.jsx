import { useState } from 'react';
import { patternsData } from './mockData';
import PatternCard from './components/PatternCard/PatternCard';
import './App.css';

function App() {
  // Состояния для трех фильтров
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');

  // Умная фильтрация
  const filteredPatterns = patternsData.filter((pattern) => {
    const genderMatch = selectedGender === 'all' || pattern.gender === selectedGender;
    const categoryMatch = selectedCategory === 'all' || pattern.category === selectedCategory;
    
    // Проверка размера: так как в данных теперь массив [42, 44], 
    // мы проверяем, есть ли выбранный размер внутри этого массива
    const sizeMatch = selectedSize === 'all' || 
                      pattern.sizes.map(String).includes(selectedSize);

    return genderMatch && categoryMatch && sizeMatch;
  });

  // Получаем список всех уникальных размеров из всех лекал для выпадающего списка
  // Это "продвинутый" уровень: фильтр сам подстроится под твои данные в mockData
  const allSizes = [...new Set(patternsData.flatMap(p => p.sizes))].sort((a, b) => a - b);

  return (
    <div className="app-container">
      <h1>Pattern Aggregator</h1>

      <div className="filters-container">
        {/* Фильтр по полу */}
        <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
          <option value="all">Кому (Все)</option>
          <option value="women">Женщинам</option>
          <option value="men">Мужчинам</option>
          <option value="kids">Детям</option>
        </select>

        {/* Фильтр по категории */}
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="all">Что шьем (Все)</option>
          <option value="dresses">Платья</option>
          <option value="pants">Брюки</option>
          <option value="t-shirts">Футболки</option>
        </select>

        {/* Динамический фильтр по размеру */}
        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
          <option value="all">Размер (Все)</option>
          {allSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div className="patterns-grid">
        {filteredPatterns.length > 0 ? (
          filteredPatterns.map((pattern) => (
            <PatternCard key={pattern.id} pattern={pattern} />
          ))
        ) : (
          <div className="no-results">
            <p>Ничего не нашлось. Попробуйте поменять фильтры!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;