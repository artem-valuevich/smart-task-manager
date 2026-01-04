import "./TaskItem.css";
export default function TaskItem({
  task: { _id, title, description, status, priority, tags = [], dueDate },
  updateItem,
  deleteItem,
  onEdit,
}) {
  const handleDelete = () => {
    if (window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
      deleteItem(_id);
    }
  };

  const handleCheckboxClick = () => {
    updateItem(_id, {
      status: status === "completed" ? "in-progress" : "completed",
    });
  };

  const handleStatusChange = () => {
    updateItem(_id, {
      status: status === "in-progress" ? "todo" : "in-progress",
    });
  };

  const handleEditClick = () => {
    onEdit(_id); // Только ID!
  };

  return (
    <>
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
                onClick={handleEditClick}
              >
                ✏️
              </button>
              <button
                className="task-action-btn delete"
                title="Удалить"
                onClick={handleDelete}
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
