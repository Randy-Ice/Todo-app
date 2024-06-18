const express = require("express");
const router = express.Router();
const Auth = require("../Middleware/auth");
const {
  allTodos,
  singleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../Controllers/todoController");
router.use(Auth);
router.get("/", allTodos);

router.get("/:id", singleTodo);

router.post("/", createTodo);

router.patch("/:id", updateTodo);

router.delete("/:id", deleteTodo);
module.exports = router;
