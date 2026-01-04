import { Children } from "react";
import Modal from "../Modal/Modal";
import TaskForm from "../TaskForm/TaskForm";

import "./TaskItem.css";
import { useEffect, useState } from "react";

export default function TaskItem({
  task: { _id, title, description, status, priority, tags = [], dueDate },
  updateItem,
}) {
  const [modalIsOpened, setModalIsOpened] = useState(false);

  // Первая функция
  const handleCheckboxClick = () => {
    updateItem(_id, {
      status: status === "completed" ? "in-progress" : "completed",
    });
  };

  // Вторая функция
  const handleStatusChange = () => {
    updateItem(_id, {
      status: status === "in-progress" ? "todo" : "in-progress",
    });
  };

  return (
    <>
      <Modal isOpen={modalIsOpened} onClose={() => setModalIsOpened(false)}>
        <TaskForm />
      </Modal>
      <li className={`task-item ${status}`}>
        {/* Контейнер для чекбокса и основной информации */}
        <div className="task-main">
          <label className="checkbox-container">
            <input type="checkbox" onClick={handleCheckboxClick} />
            <span className="custom-checkbox"></span>
          </label>

          <div className="task-content">
            {/* Заголовок и описание */}
            <div className="task-text-container">
              <h3 className="task-title">{title}</h3>
              {description && <p className="task-description">{description}</p>}
            </div>

            {/* Теги */}
            {tags && tags.length > 0 && (
              <div className="task-tags">
                {tags.map((tag) => (
                  <span key={tag} className="task-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Боковая панель с метаданными */}
        <div className="task-meta">
          {/* Верхний ряд: статус и приоритет */}
          <div className="meta-row">
            <span
              className={`task-status ${status}`}
              onClick={handleStatusChange}
            >
              {status === "completed"
                ? "✓"
                : status === "in-progress"
                ? "▶"
                : "⏳"}
              <span className="status-text">{status}</span>
            </span>

            <span className={`task-priority ${priority}`}>
              {priority === "high" ? "🔥" : priority === "medium" ? "⚠" : "📌"}
              <span className="priority-text">{priority}</span>
            </span>
          </div>

          {/* Нижний ряд: дата выполнения и кнопки действий */}
          <div className="meta-row">
            <span className="task-due-date">📅 {dueDate}</span>

            <div className="task-actions">
              <button
                className="task-action-btn edit"
                title="Редактировать"
                onClick={() => setModalIsOpened(true)}
              >
                ✏️
              </button>
              <button className="task-action-btn delete" title="Удалить">
                🗑️
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
