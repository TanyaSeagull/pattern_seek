import { useState } from 'react';
import { patternsData } from './mockData';
import './App.css';

import PatternCard from './components/PatternCard/PatternCard';

function App() {
  // 1. Создаем состояния для наших фильтров. По умолчанию стоит 'all' (показывать всё)
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');

  // 2. Фильтруем наш массив данных перед тем, как его отрисовать
  const filteredPatterns = patternsData.filter((pattern) => {
    // Проверяем категорию: если выбрано 'all' ИЛИ категория совпадает с выбранной
    const isCategoryMatch = selectedCategory === 'all' || pattern.category === selectedCategory;
    
    // Проверяем размер. pattern.size у нас число, а из select приходит строка, поэтому приводим к строке
    const isSizeMatch = selectedSize === 'all' || pattern.size.toString() === selectedSize;

    // Оставляем только те лекала, которые прошли обе проверки
    return isCategoryMatch && isSizeMatch;
  });

  return (
    <div>
      <h1>Бесплатные лекала</h1>

      {/* 3. Блок с выпадающими списками */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          Категория:
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Все</option>
            <option value="pants">Брюки</option>
            <option value="skirts">Юбки</option>
            <option value="dresses">Платья</option>
          </select>
        </label>

        <label style={{ marginLeft: '20px' }}>
          Размер:
          <select 
            value={selectedSize} 
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="all">Все</option>
            <option value="42">42</option>
            <option value="44">44</option>
          </select>
        </label>
      </div>

      {/* 4. Выводим отфильтрованный список (или сообщение, если ничего не найдено) */}
      {filteredPatterns.length > 0 ? (
        <div className="patterns-grid">
          {filteredPatterns.map((pattern) => (
            // Мы передаем данные конкретного лекала в проп pattern
            <PatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>
      ) : (
        <p>Увы, лекал с такими параметрами пока нет.</p>
      )}
    </div>
  );
}

export default App;
