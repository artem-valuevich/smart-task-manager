const express = require("express");
const app = express();

const data = require("./mock-data");

app.use(require("cors")());
app.use(express.json());

// Middleware для задержки всех запросов
app.use((req, res, next) => {
  setTimeout(next, 7000); // Задержка 7 секунды для всех запросов
});

app.get("/api", (req, res) => {
  res.json(data);
});

app.post("/api", (req, res) => {
  console.log(req.body);
  res.status(201).send("Nice");
});

app.listen(3000);
