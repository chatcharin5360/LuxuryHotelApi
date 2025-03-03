const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const handleErrors = require("./middleware/error");

// Routing
const authRouter = require("./routes/auth-route");
const userRouter = require("./routes/user-route");
const adminRouter = require("./routes/admin-route");
const app = express();

// Middlewares
app.use(cors()); // Allows cross domain
app.use(morgan("dev")); // Show log terminal
app.use(express.json()); // For reading JSON

// Routing
app.use("/api", authRouter); // สำหรับการเข้าสู่ระบบ
app.use("/api/user", userRouter); // ใช้ /api/user สำหรับ userRouter
app.use("/api/admin", adminRouter); // เพิ่ม Routing สำหรับ admin

// Handle errors
app.use(handleErrors);

// Start Server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
