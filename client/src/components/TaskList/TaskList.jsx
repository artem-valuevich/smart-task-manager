import { useEffect } from "react";
import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.css";
import data from "../../mock-data.js";

export default function TaskList() {
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
        <span className="counter-number">5/12</span>
      </div>
      <ul>
        {data.map((task) => (
          <TaskItem key={task._id} {...task} />
        ))}
        <ul className="task-list" />
      </ul>
    </>
  );
}
