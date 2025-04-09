const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
const saltRounds = 10;

const getUserInfo = (body) => {
  const { name, email, password } = body;
  return [name, email, password];
};

// -----------------------------------------------------------------//
// -----------------------------------------------------------------//

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "72h" }
  );
};

// -----------------------------------------------------------------//
// -----------------------------------------------------------------//

const createUser = async (req, res) => {
  const result = getUserInfo(req.body);
  if (!Array.isArray(result)) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const password = result[2].toString();
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const [name, email] = result;

  try {
    const newUser = await userModel.createUser(name, email, hashedPassword);

    const token = generateToken(newUser);

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json("Failed to create user");
  }
};

// -----------------------------------------------------------------//
// -----------------------------------------------------------------//

const createAdmin = async (req, res) => {
  const result = getUserInfo(req.body);
  if (!Array.isArray(result)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const [name, email, password] = result;

  try {
    const newAdmin = await userModel.createAdmin(name, email, password);
   
    const token = generateToken(newAdmin);

    res.status(201).json({ user: newAdmin, token });
  } catch (err) {
    res.status(500).json("Failed to create Admin");
  }
};

// -----------------------------------------------------------------//
// -----------------------------------------------------------------//

const allUser = async (req, res) => {
  const allUsers = await userModel.getAllUsers();
  res.json(allUsers).status(200);
};

// -----------------------------------------------------------------//
// -----------------------------------------------------------------//

const logIn = async (req, res) => {
  const result = getUserInfo(req.body);

  if (!Array.isArray(result)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const password = result[2].toString();
  const email = result[1];
  const login = await userModel.login(email);

  if (!login)
    return res.status(401).json({ message: "incorrect email and password" });

  const isMatch = await bcrypt.compare(password, login.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = generateToken(login);
  res.status(200).json({ user: login, token });
};

// -----------------------------------------------------------------//
// -----------------------------------------------------------------//

module.exports = { createUser, allUser, createAdmin, logIn };
