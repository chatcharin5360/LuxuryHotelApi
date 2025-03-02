const express = require("express");
const { clerkWebhook } = require("../controller/authController");

const router = express.Router();

// ✅ Webhook Route จาก Clerk
router.post("/clerk-webhook", express.json(), clerkWebhook);

module.exports = router;
