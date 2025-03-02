const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  deleteUser,
} = require("../controller/userController");
const { clerkMiddleware } = require("@clerk/express");
const { checkAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ ใช้ `clerkMiddleware` สำหรับ Clerk Authentication
router.get("/profile", clerkMiddleware, getUserProfile);
router.post("/profile", clerkMiddleware, updateUserProfile);

// ✅ เส้นทาง DELETE ใช้ `checkAdmin` เพื่อตรวจสอบสิทธิ์ Admin
router.delete("/delete/:id", clerkMiddleware, checkAdmin, deleteUser);

module.exports = router;
