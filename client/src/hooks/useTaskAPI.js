import { useState } from "react";

export default function useTaskAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE_URL = "http://localhost:3000/api";

  // Загрузка всех задач
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_BASE_URL);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Ошибка загрузки задач:", err);
      setError("Не удалось загрузить задачи");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Обновление задачи
  const updateTask = async (id, updatedData) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedTask = await response.json();
      return updatedTask;
    } catch (err) {
      console.error("Ошибка обновления задачи:", err);
      setError("Не удалось обновить задачу");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Удаление задачи
  const deleteTask = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true;
    } catch (err) {
      console.error("Ошибка удаления задачи:", err);
      setError("Не удалось удалить задачу");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Создание задачи
  const createTask = async (newTask) => {
    try {
      setIsLoading(true);
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedTask = await response.json();
      return savedTask;
    } catch (err) {
      console.error("Ошибка создания задачи:", err);
      setError("Не удалось создать задачу");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Сброс ошибки
  const clearError = () => {
    setError(null);
  };

  return {
    isLoading,
    error,
    clearError,
    fetchTasks,
    updateTask,
    deleteTask,
    createTask,
  };
}
