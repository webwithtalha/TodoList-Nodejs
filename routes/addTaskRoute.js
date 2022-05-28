const express = require("express");
const router = express.Router();
const {
  addTask,
  getTask,
  deleteTask,
} = require("../controllers/todoListController");
const { protectedRoute } = require("../middlewares/authMiddleware");

router.post("/addTask", addTask);
router.get("/getTask", protectedRoute, getTask);
router.delete("/deleteTask/:id", protectedRoute, deleteTask);

module.exports = router;