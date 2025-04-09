const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  createUser,
  allUser,
  createAdmin,
  logIn,
} = require("../controllers/authController");

router.post("/login", logIn);

router.post("/register", createUser);

router.post("/admin", createAdmin);

// router.get("/users", allUser);

router.get("/api", authenticate, allUser);

module.exports = router;
