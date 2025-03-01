const express = require("express");
const router = express.Router();
const roomController = require("../controller/roomController");
const isAdmin = require("../middleware/adminMiddleware");

// เพิ่ม middleware isAdmin ก่อนดำเนินการ
router.post("/rooms", isAdmin, roomController.createRoom);
router.put("/rooms/:id", isAdmin, roomController.updateRoom);
router.delete("/rooms/:id", isAdmin, roomController.deleteRoom);

module.exports = router;
