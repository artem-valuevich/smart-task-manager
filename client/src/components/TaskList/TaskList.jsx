import { useEffect, useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.css";
import data from "../../mock-data.js";

export default function TaskList() {
  const [tasks, setTasks] = useState(data);
  const [inputValue, setInputValue] = useState("");

  const updateItem = (id, updatedData) => {
    setTasks((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, ...updatedData } : item
      )
    );
  };
  const deleteItem = (id) => {
    setTasks((prevItems) => prevItems.filter((item) => item._id !== id));
  };
  const sortedTasks = tasks
    .filter((item) =>
      item.title.toLowerCase().includes(inputValue.toLowerCase())
    )
    .sort((a, b) => {
      const STATUS_ORDER = { "in-progress": 1, todo: 2, completed: 3 };
      const PRIORITY_ORDER = { high: 1, medium: 2, low: 3 };

      // Сравниваем статус
      if (a.status !== b.status) {
        return STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
      }

      // Если статусы равны, сравниваем приоритет
      return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    });

  return (
    <>
      <div className="search-container">
        <div className="search-icon">🔍</div>
        <input
          type="text"
          value={inputValue}
          className="search-input"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Поиск задач..."
        />
      </div>

      <button className="header-button secondary" data-short="+">
        <span>➕</span>
        <span>Новая задача</span>
      </button>
      <div className="task-counter">
        <span className="counter-icon">✓</span>
        <span>Задач:</span>
        <span className="counter-number">
          {sortedTasks.filter((task) => task.status === "completed").length}/
          {sortedTasks.length}
        </span>
      </div>
      {/* Контейнер для плиточного отображения */}
      <div className="task-grid-container">
        <ul className="task-grid">
          {sortedTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              updateItem={updateItem}
              deleteItem={deleteItem}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
