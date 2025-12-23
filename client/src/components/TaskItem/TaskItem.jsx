import "./TaskItem.css";

export default function TaskItem({
  _id,
  title,
  description,
  status,
  priority,
  tags = [],
  dueDate,
}) {
  // ВАЖНО: Вся логика будет реализована вами самостоятельно
  // Ниже только структура JSX с классами для стилизации

  return (
    <li className={`task-item ${status}`}>
      {/* Контейнер для чекбокса и основной информации */}
      <div className="task-main">
        <label className="checkbox-container">
          <input type="checkbox" />
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
        {/* Статус */}
        <span className={`task-status ${status}`}>
          {status === "completed" ? "✓" : status === "in-progress" ? "▶" : "⏳"}
          <span className="status-text">{status}</span>
        </span>

        {/* Приоритет */}
        <span className={`task-priority ${priority}`}>
          {priority === "high" ? "🔥" : priority === "medium" ? "⚠" : "📌"}
          <span className="priority-text">{priority}</span>
        </span>

        {/* Дата выполнения */}
        <span className="task-due-date">📅 {dueDate}</span>

        {/* Кнопки действий */}
        <div className="task-actions">
          <button className="task-action-btn edit" title="Редактировать">
            ✏️
          </button>
          <button className="task-action-btn delete" title="Удалить">
            🗑️
          </button>
        </div>
      </div>
    </li>
  );
}
