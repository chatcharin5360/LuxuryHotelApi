const express = require("express");
const { getDashboardData } = require("../controller/adminController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", verifyToken, getDashboardData);

module.exports = router;
