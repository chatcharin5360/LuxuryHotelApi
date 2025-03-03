const express = require("express");
const {
  getProfile,
  updateProfile,
  deleteAccount,
} = require("../controller/userController");
const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

// API สำหรับดึงข้อมูลผู้ใช้
router.get("/profile", verifyToken, getProfile); // ใช้ /profile ในการดึงข้อมูล

// API สำหรับอัปเดตข้อมูลผู้ใช้
router.post("/update", verifyToken, updateProfile); // ใช้ /update ในการอัปเดตข้อมูล

// API สำหรับลบข้อมูลผู้ใช้ (เฉพาะ Admin)
router.delete("/delete", verifyToken, isAdmin, deleteAccount); // ใช้ /delete ในการลบข้อมูล

module.exports = router;
