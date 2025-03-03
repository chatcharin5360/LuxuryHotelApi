// adminRoute.js
const express = require("express");
const { getDashboardData } = require("../controller/adminController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// เพิ่ม route สำหรับดึงข้อมูล Dashboard
router.get("/dashboard", verifyToken, getDashboardData);

module.exports = router;
