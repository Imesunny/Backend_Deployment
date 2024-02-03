const express = require("express");
const TodoModel = require("../models/tasks.model");
const toggleRouter = express.Router();

// Toggling for completed/not completed
toggleRouter.put("/:id", async (req, res) => {
  try {
    const todoRef = await TodoModel.findById(req.params.id);

    if (!todoRef) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const updatedTodo = await TodoModel.findOneAndUpdate(
      { _id: req.params.id },
      { completed: !todoRef.completed },
      { new: true }
    );

    return res.status(200).json({ message: "Status Upadated", updatedTodo });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = toggleRouter;
