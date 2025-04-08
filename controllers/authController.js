const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getUserInfo = (body) => {
  const { name, username, password } = body;
  return [name, username, password];
};

const createUser = async (req, res) => {
  const result = getUserInfo(req.body);
  if (!Array.isArray(result)) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const password = result[2].toString();
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const [name, username] = result;

  try {
    const newUser = await userModel.createUser(name, username, hashedPassword);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json("Failed to create user");
  }
};

const createAdmin = async (req, res) => {
  const result = getUserInfo(req.body);
  if (!Array.isArray(result)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const [name, username, password] = result;

  try {
    const newAdmin = await userModel.createAdmin(name, username, password);
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(500).json("Failed to create Admin");
  }
};

const allUser = async (req, res) => {
  const allUsers = await userModel.getAllUsers();
  res.json(allUsers).status(200);
};

const logIn = async (req, res) => {
  const result = getUserInfo(req.body);

  if (!Array.isArray(result)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const password = result[2].toString();
  const username = result[1]; 
  const login = await userModel.login(username);

  if(!login)
    return res.status(401).json({ message: "incorrect username and password"})
  
  const isMatch = await bcrypt.compare(password, login.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" })
      }
  res.status(200).json(login)
  
};

module.exports = { createUser, allUser, createAdmin, logIn };
