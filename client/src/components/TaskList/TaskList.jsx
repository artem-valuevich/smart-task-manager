import { useEffect, useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.css";
import data from "../../mock-data.js";

export default function TaskList() {
  const [tasks, setTasks] = useState(data);

  const updateItem = (id, updatedData) => {
    setTasks((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, ...updatedData } : item
      )
    );
  };

  const sortedTasks = [...tasks].sort((a, b) => {
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
          className="search-input"
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
          {tasks.filter((task) => task.status === "completed").length}/
          {tasks.length}
        </span>
      </div>
      <ul>
        {sortedTasks.map((task) => (
          <TaskItem key={task._id} task={task} updateItem={updateItem} />
        ))}
        <ul className="task-list" />
      </ul>
    </>
  );
}
