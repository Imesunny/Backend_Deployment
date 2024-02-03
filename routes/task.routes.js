const express = require("express");
const TodoModel = require("../models/tasks.model");
const todoRouter = express.Router();

// Get all todos
todoRouter.get("/", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a new todo
todoRouter.post("/add", async (req, res) => {
  const { title, description, dueDate, priority, completed } = req.body;

  try {
    const newTodo = new TodoModel({
      title,
      description,
      dueDate,
      priority,
      completed,
    });

    await newTodo.save();
    res.status(201).json({ message: "Todo added successfully", todo: newTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Edit a specific todo by ID
todoRouter.put("/edit/:id", async (req, res) => {
  const { title, description, dueDate, completed, priority } = req.body;

  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        dueDate,
        completed,
        priority,
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res
      .status(200)
      .json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a specific todo by ID
todoRouter.delete("/delete/:id", async (req, res) => {
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res
      .status(200)
      .json({ message: "Todo deleted successfully", todo: deletedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// export const toggleTodoDone = async (request, response) => {
//   try {
//     const todoRef = await TodoModel.findById(request.params.id);

//     if (!todoRef) {
//       return response.status(404).json({ message: "Todo not found" });
//     }

//     const todo = await TodoModel.findOneAndUpdate(
//       { _id: request.params.id },
//       { completed: !todoRef.completed },
//       { new: true }
//     );

//     return response.status(200).json(todo);
//   } catch (error) {
//     return response
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// };

module.exports = todoRouter;
