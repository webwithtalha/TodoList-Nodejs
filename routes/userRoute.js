const express = require("express");
const router = express.Router();
const { protectedRoute } = require("../middlewares/authMiddleware");
const {
  loginUser,
  registerUser,
  getMe,
} = require("../controllers/userController");

router.post("/loginUser", loginUser);
router.post("/registerUser", registerUser);
router.get("/getMe", protectedRoute, getMe);

module.exports = router;
