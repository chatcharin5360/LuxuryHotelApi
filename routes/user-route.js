const express = require("express");
const {
  getProfile,
  updateProfile,
  deleteAccount,
} = require("../controller/userController");
const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/profile", verifyToken, getProfile);

router.post("/update", verifyToken, updateProfile);

router.delete("/delete/:id", verifyToken, isAdmin, deleteAccount);

module.exports = router;
