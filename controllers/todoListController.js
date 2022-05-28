const asyncHandler = require("express-async-handler");
const AddTask = require("../models/addTodoList");

const addTask = asyncHandler(async (req, res) => {
  const new_task = await AddTask.create({
    task: req.body.task,
  });

  res.status(200).json({
    status: "success",
    new_task,
  });
});

const getTask = asyncHandler(async (req, res) => {
  const tasks = await AddTask.find().sort({ createdAt: -1 });

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
