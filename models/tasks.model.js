const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
    enum: [1, 2, 3],
    default: 2,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = TodoModel;
