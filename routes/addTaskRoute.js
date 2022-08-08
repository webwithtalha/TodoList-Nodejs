const express = require("express");
const router = express.Router();
const {
  addTask,
  getTask,
  deleteTask,
  updateTask,
  getSingleTask,
} = require("../controllers/todoListController");
const { protectedRoute } = require("../middlewares/authMiddleware");

router.post("/addTask", protectedRoute, addTask);
router.get("/getTask", protectedRoute, getTask);
router.get("/getSingleTask/:id", getSingleTask);
router.delete("/deleteTask/:id", deleteTask);
router.patch("/updateTask/:id", updateTask);

module.exports = router;
