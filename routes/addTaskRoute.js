const express = require("express");
const router = express.Router();
const {
  addTask,
  getTask,
  deleteTask,
} = require("../controllers/todoListController");
const { protectedRoute } = require("../middlewares/authMiddleware");

router.post("/addTask", addTask);
router.get("/getTask", getTask);
router.delete("/deleteTask/:id", deleteTask);

module.exports = router;
