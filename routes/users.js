const express = require("express");
const router = express.Router();
const validateUser = require("../middleware/validateUser");

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/usersController");

// GET /users
router.get("/", getAllUsers);

// GET /users/:id
router.get("/:id", getUserById);

router.post("/", validateUser, createUser);
router.put("/:id", validateUser, updateUser);

// DELETE /users/:id
router.delete("/:id", deleteUser);

module.exports = router;

