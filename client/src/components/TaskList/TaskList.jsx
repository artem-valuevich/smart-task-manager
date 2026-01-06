import { useState, useEffect } from "react";
import TaskItem from "../TaskItem/TaskItem";
import TaskForm from "../TaskForm/TaskForm";
import "./TaskList.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); // null = создание, объект = редактирование
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:3000/api");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Ошибка загрузки задач:", err);
        setError("Не удалось загрузить задачи");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateItem = async (id, updatedData) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/api/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedTask = await response.json();

      // Обновляем локальное состояние
      setTasks((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, ...updatedTask } : item
        )
      );
    } catch (err) {
      console.error("Ошибка обновления задачи:", err);
      setError("Не удалось обновить задачу");
      // В случае ошибки можно откатить изменения в UI
      // или показать сообщение об ошибке
    } finally {
      setIsLoading(false);
      setIsFormOpen(false);
      setCurrentTask(null);
    }
  };

  const deleteItem = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/api/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Если сервер успешно удалил задачу, обновляем локальное состояние
      setTasks((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Ошибка удаления задачи:", err);
      setError("Не удалось удалить задачу");
      // Можно показать сообщение об ошибке пользователю
    } finally {
      setIsLoading(false);
    }
  };
  const addNewTask = async (newTask) => {
    let tempId; // Объявляем переменную в области видимости всей функции

    try {
      setIsLoading(true);
      // Для новой задачи генерируем временный ID для оптимистичного обновления
      tempId = Date.now().toString();
      const taskWithTempId = { ...newTask, _id: tempId };

      // Оптимистичное обновление UI
      setTasks((prevTasks) => [...prevTasks, taskWithTempId]);

      const response = await fetch("http://localhost:3000/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedTask = await response.json();

      // Обновляем задачу с реальным ID с сервера
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === tempId ? savedTask : task))
      );
    } catch (err) {
      console.error("Ошибка создания задачи:", err);
      setError("Не удалось создать задачу");

      // Откатываем оптимистичное обновление в случае ошибки
      if (tempId) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== tempId)
        );
      }
    } finally {
      setIsLoading(false);
      setIsFormOpen(false);
      setCurrentTask(null);
    }
  };

  const handleEditClick = (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    setCurrentTask(taskToEdit);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (taskData) => {
    if (currentTask) {
      // Редактирование существующей задачи
      updateItem(taskData._id, taskData);
    } else {
      // Создание новой задачи
      addNewTask(taskData);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setCurrentTask(null);
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
      {/* Единая форма для создания и редактирования */}
      <TaskForm
        task={currentTask} // null = новая задача, объект = редактирование
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
      />

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

      <button
        className="header-button secondary"
        data-short="+"
        onClick={() => {
          setCurrentTask(null); // Устанавливаем, что создаём новую задачу
          setIsFormOpen(true);
        }}
        disabled={isLoading}
      >
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

      {/* Сообщение об ошибке */}
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* Индикатор загрузки */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Контейнер для плиточного отображения */}
      <div className="task-grid-container">
        <ul className="task-grid">
          {sortedTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              updateItem={updateItem}
              deleteItem={deleteItem}
              onEdit={handleEditClick}
              isLoading={isLoading}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
