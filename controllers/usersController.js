const User = require("../models/User");

// GET all users
async function getAllUsers(req, res) {
  const users = await User.find();
  res.json(users);
}

// GET user by id
async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
}

// CREATE user
async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    // duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }

    res.status(400).json({ error: error.message });
  }
}


// UPDATE user
async function updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
}

// DELETE user
async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

