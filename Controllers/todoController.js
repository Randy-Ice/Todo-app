const Todo = require("../Models/todoModel");

const allTodos = async (req, res) => {
  const userId = req.user.id;
  try {
    const todo = await Todo.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        userId: userId,
      },
    });
    if (todo.length === 0) {
      return res.status(200).json({ message: "no todo found" });
    }
    res.status(200).json({
      count: todo.length,
      status: "ok",
      data: todo,
    });
  } catch (err) {
    res.status(500).json({ message: "server error", err: err.message });
  }
};

const singleTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findAll({
      where: {
        id: id,
        userId: req.user.id,
      },
    });
    if (todo.length === 0) {
      return res.status(404).json({ message: "no todo found by that id" });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: "server error", err: err.message });
  }
};

const createTodo = async (req, res) => {
  const { title, category } = req.body;
  try {
    if (!title || !category) {
      return res
        .status(400)
        .json({ message: "title and category are required" });
    }
    if (title.length > 30 || title.length < 3) {
      return res
        .status(400)
        .json({ message: "Todo should have min of 3-30 characters in length" });
    }

    const todo = await Todo.create({
      title,
      category,
      userId: req.user.id,
    });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "server error", err: err.message });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.update(
      { ...req.body },
      {
        where: {
          id: id,
          userId: req.user.id,
        },
      }
    );
    if (todo[0] === 1) {
      return res.status(200).json({ message: "update success" });
    }
    if (todo[0] === 0) {
      return res.status(400).json({ message: "Failed to update todo" });
    }
  } catch (err) {
    res.status(500).json({ message: "server error", err: err.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.destroy({
      where: {
        id: id,
        userId: req.user.id,
      },
    });

    if (todo === 0) {
      return res.status(400).json({ message: "Failed to delete todo" });
    }
    if (todo === 1) {
      return res.status(400).json({ message: "Todo successfully deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: "server error", err: err.message });
  }
};
module.exports = {
  allTodos,
  singleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
