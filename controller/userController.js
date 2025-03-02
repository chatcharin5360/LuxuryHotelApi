const { PrismaClient } = require("@prisma/client");
const createError = require("../utils/createError");

const prisma = new PrismaClient();

// ✅ ดึงข้อมูลผู้ใช้จาก MySQL และ Clerk
exports.getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.auth; // รับข้อมูลจาก Clerk Middleware

    const user = await prisma.user.findUnique({ where: { clerk_id: userId } });
    if (!user) return next(createError(404, "User not found"));

    res.json(user);
  } catch (error) {
    next(createError(500, "Failed to fetch user profile"));
  }
};

// ✅ อัปเดตข้อมูลผู้ใช้
exports.updateUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.auth;
    const { FirstName, LastName } = req.body;

    const updatedUser = await prisma.user.update({
      where: { clerk_id: userId },
      data: { FirstName, LastName },
    });

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    next(createError(500, "Failed to update user profile"));
  }
};

// ✅ ลบผู้ใช้ (เฉพาะ Admin)
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { User_id: Number(id) },
    });
    if (!user) return next(createError(404, "User not found"));

    await prisma.user.delete({ where: { User_id: Number(id) } });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(createError(500, "Failed to delete user"));
  }
};
