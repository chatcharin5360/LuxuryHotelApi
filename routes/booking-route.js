// 📁 routes/booking.js
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const {
  createBooking,
  getMyBookings,
  payBooking,
  cancelBooking,
} = require("../controller/bookingController");

// ✅ 1. สร้างการจอง
router.post("/book", authenticate, createBooking);

// ✅ 2. ดูรายการที่จองไว้
router.get("/my-bookings", authenticate, getMyBookings);

// ✅ 3. จ่ายเงิน (mock)
router.post("/pay/:id", authenticate, payBooking);

router.delete("/bookings/:id", authenticate, cancelBooking);

module.exports = router;
