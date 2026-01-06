import { useState, useEffect } from "react";
import TaskItem from "../TaskItem/TaskItem";
import TaskForm from "../TaskForm/TaskForm";
import "./TaskList.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); // null = создание, объект = редактирование

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api");
      const data = await res.json();
      setTasks(data);
    };
    fetchData();
  }, []);

  const updateItem = (id, updatedData) => {
    setTasks((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, ...updatedData } : item
      )
    );
    setIsFormOpen(false);
    setCurrentTask(null);
  };

  const deleteItem = (id) => {
    setTasks((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const addNewTask = async (newTask) => {
    // Генерируем уникальный ID для новой задачи
    const taskWithId = {
      ...newTask,
      _id: Date.now().toString(), // или используйте uuid/v4
    };
    setTasks((prevTasks) => [...prevTasks, taskWithId]);
    const response = await fetch("http://localhost:3000/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskWithId),
    });
    const responseText = await response.text();
    console.log(responseText);
    setIsFormOpen(false);
    setCurrentTask(null);
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

      {/* Контейнер для плиточного отображения */}
      <div className="task-grid-container">
        <ul className="task-grid">
          {sortedTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              updateItem={updateItem}
              deleteItem={deleteItem}
              onEdit={handleEditClick} // Передаем функцию редактирования
            />
          ))}
        </ul>
      </div>
    </>
  );
}
