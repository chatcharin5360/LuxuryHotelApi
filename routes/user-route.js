const express = require("express");
const {
  getProfile,
  updateProfile,
  deleteUser,
} = require("../controller/userController");
const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/profile", verifyToken, getProfile);
router.post("/profile", verifyToken,updateProfile);
router.delete("/:userId", verifyToken, verifyAdmin, deleteUser);


module.exports = router;
