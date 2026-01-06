const app = require("express")();
app.use(require("cors")());
const testUser = {
  name: "artem",
  age: 23,
};
app.get("/", (req, res) => {
  res.send("<h2>Привет Express!<h2>");
});

app.get("/api", (req, res) => {
  res.json(testUser);
});

app.listen(3000);
