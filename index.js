const express = require("express");
const app = express();

let data = require("./mock-data");

app.use(require("cors")());
app.use(express.json());

// Middleware для задержки всех запросов
app.use((req, res, next) => {
  setTimeout(next, 1000); // 1 секунда задержки
});

// Получение всех задач
app.get("/api", (req, res) => {
  res.json(data);
});

// Создание новой задачи
app.post("/api", (req, res) => {
  const newId = Date.now().toString();

  const newTask = {
    ...req.body,
    _id: newId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  data.push(newTask);
  res.status(201).json(newTask);
});

// Обновление задачи
app.put("/api/:id", (req, res) => {
  const taskId = req.params.id;
  const taskIndex = data.findIndex((task) => task._id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Задача не найдена" });
  }

  const existingTask = data[taskIndex];
  const updatedTask = {
    ...existingTask,
    ...req.body,
    updatedAt: new Date().toISOString(),
    _id: existingTask._id, // Сохраняем оригинальный ID
  };

  data[taskIndex] = updatedTask;
  res.json(updatedTask);
});

// Удаление задачи
app.delete("/api/:id", (req, res) => {
  const taskId = req.params.id;
  const initialLength = data.length;

  data = data.filter((task) => task._id !== taskId);

  if (data.length === initialLength) {
    return res.status(404).json({ error: "Задача не найдена" });
  }

  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Сервер запущен на http://localhost:3000");
});
