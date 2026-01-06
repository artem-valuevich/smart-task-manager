import { useState, useEffect } from "react";
import TaskItem from "../TaskItem/TaskItem";
import TaskForm from "../TaskForm/TaskForm";
import useTaskAPI from "../../hooks/useTaskAPI";
import "./TaskList.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const {
    isLoading,
    error,
    clearError,
    fetchTasks,
    updateTask,
    deleteTask,
    createTask,
  } = useTaskAPI();

  // Загрузка задач при монтировании
  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    loadTasks();
  }, []);

  const updateItem = async (id, updatedData) => {
    const updatedTask = await updateTask(id, updatedData);
    // Обновляем локальное состояние
    setTasks((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, ...updatedTask } : item
      )
    );
    setIsFormOpen(false);
    setCurrentTask(null);
  };

  const deleteItem = async (id) => {
    await deleteTask(id);
    // Если сервер успешно удалил задачу, обновляем локальное состояние
    setTasks((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const addNewTask = async (newTask) => {
    let tempId; // Для оптимистичного обновления

    try {
      // Оптимистичное обновление UI
      tempId = Date.now().toString();
      const taskWithTempId = { ...newTask, _id: tempId };
      setTasks((prevTasks) => [...prevTasks, taskWithTempId]);

      // Отправляем запрос на сервер
      const savedTask = await createTask(newTask);

      // Обновляем задачу с реальным ID с сервера
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === tempId ? savedTask : task))
      );
      setIsFormOpen(false);
      setCurrentTask(null);
    } catch (err) {
      // Откатываем оптимистичное обновление в случае ошибки
      if (tempId) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== tempId)
        );
      }
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

      if (a.status !== b.status) {
        return STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
      }
      return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    });

  return (
    <>
      <TaskForm
        task={currentTask}
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
          setCurrentTask(null);
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

      {error && (
        <div className="error-message">
          {error}
          <button onClick={clearError}>✕</button>
        </div>
      )}

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

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
