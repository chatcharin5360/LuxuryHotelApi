const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createError = require("../utils/createError");

// ✅ เพิ่ม API สำหรับดึงข้อมูลโปรไฟล์ของผู้ใช้
exports.getProfile = async (req, res, next) => {
  try {
    const { id } = req.user; // Clerk ID

    const user = await prisma.user.findUnique({
      where: { cleck_id: id },
      select: { FirstName: true, LastName: true, Email: true, Phone: true },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { id } = req.user; // Clerk ID
    const { FirstName, LastName, Email, Phone } = req.body;

    const updatedUser = await prisma.user.upsert({
      where: { cleck_id: id },
      create: { cleck_id: id, FirstName, LastName, Email, Phone },
      update: { FirstName, LastName, Email, Phone },
    });

    console.log("Updated User:", updatedUser);
    res.status(200).json({ message: "success", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const existingUser = await prisma.user.findUnique({
      where: { User_id: Number(userId) },
    });

    if (!existingUser) {
      return next(createError(404, "User not found"));
    }

    await prisma.user.delete({
      where: { User_id: Number(userId) },
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
