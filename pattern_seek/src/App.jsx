import { patternsData } from './mockData';
import './App.css'; // Оставляем стандартные стили для базовой структуры

function App() {
  return (
    <div>
      <h1>Бесплатные лекала</h1>
      
      {/* Контейнер для нашего списка */}
      <ul>
        {patternsData.map((pattern) => (
          <li key={pattern.id}>
            <strong>{pattern.title}</strong> — Размер: {pattern.size} (Категория: {pattern.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
