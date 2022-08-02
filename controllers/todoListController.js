const asyncHandler = require("express-async-handler");
const AddTask = require("../models/addTodoList");
const User = require("../models/userModel");

const addTask = asyncHandler(async (req, res) => {
  const new_task = await AddTask.create({
    task: req.body.task,
    user: req.user.id,
  });

  res.status(200).json({
    status: "success",
    new_task,
  });
});

const getTask = asyncHandler(async (req, res) => {
  const tasks = await AddTask.find({ user: req.user.id }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    status: "success",
    tasks,
  });
});

const deleteTask = asyncHandler(async (req, res) => {
  await AddTask.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Task Deleted Successfully" });
});

module.exports = {
  addTask,
  getTask,
  deleteTask,
};

const updateTask = asyncHandler(async (req, res) => {
  const task = await AddTask.findById(req.params.id);
  task.task = req.body.task;
  await task.save();
  res.status(200).json({ message: "Task updated Successfully" });
});

module.exports = {
  addTask,
  getTask,
  deleteTask,
  updateTask,
};
