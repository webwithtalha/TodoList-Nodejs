const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const cookie = require("cookie");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN_DAYS + "d",
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      message: "Please add all fields",
    });
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({
      message: "User already exists",
    });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      message: "User Successfully Registered",
      user,
    });
  } else {
    res.status(400).json({
      message: "Invalid user data",
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // res.setHeader(
    //   "Set-Cookie",
    //   cookie.serialize("token", generateToken(user._id), {
    //     httpOnly: true,
    //     maxAge: 60 * 24,
    //     // path: "/",
    //   })
    // );
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      message: "Invalid credentials",
    });
  }
});

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const logout = asyncHandler(async (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    })
  );
  res.status(200).json({
    message: "User successfully logout!",
  });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logout,
};
