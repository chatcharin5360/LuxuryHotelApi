// routes/room-route.js
const express = require('express');
const router = express.Router();
const roomController = require('../controller/roomController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// เส้นทางสำหรับการดึงข้อมูลห้องทั้งหมด
router.get('/rooms', roomController.getRooms);

// เส้นทางสำหรับเพิ่มห้อง (เฉพาะ Admin)
router.post('/rooms', authMiddleware, adminMiddleware, roomController.addRoom);

// เส้นทางสำหรับอัปเดตห้อง (เฉพาะ Admin)
router.put('/rooms/:Room_id', authMiddleware, adminMiddleware, roomController.updateRoom);

// เส้นทางสำหรับลบห้อง (เฉพาะ Admin)
router.delete('/rooms/:Room_id', authMiddleware, adminMiddleware, roomController.deleteRoom);

module.exports = router;
