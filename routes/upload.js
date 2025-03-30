const express = require("express");
const multer = require("multer");
const streamifier = require("streamifier");
const { cloudinary } = require("../config/cloudinary");

const router = express.Router();
const upload = multer();

// ✅ ฟังก์ชันช่วยอัปโหลดไฟล์แบบ Stream
const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "luxury_hotel", // 📁 เก็บไว้ในโฟลเดอร์ชื่อ luxury_hotel
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // ✅ ตรวจสอบว่าอัปโหลดไฟล์มาหรือไม่
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // ✅ อัปโหลดไปยัง Cloudinary
    const result = await streamUpload(req.file.buffer);

    // ✅ ส่ง URL ของรูปกลับไป
    return res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("❌ Upload error:", error);
    return res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;
