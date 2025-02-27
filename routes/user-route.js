const express = require("express");
const {
  getProfile,
  updateProfile,
  deleteAccount,
} = require("../controller/userController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", verifyToken, getProfile);
router.patch("/profile", verifyToken, updateProfile);
router.delete("/delete", verifyToken, deleteAccount);

module.exports = router;
