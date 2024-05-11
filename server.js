const express = require("express");
const pool = require("./db");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const ToDo = require("./models/todo");
const User = require("./models/User");

//id: { type: Number, unique: true, required: true, index: true },

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
