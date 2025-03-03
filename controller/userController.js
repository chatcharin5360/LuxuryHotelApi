const { PrismaClient } = require("@prisma/client");
const createError = require("../utils/createError");
const { updateUserSchema } = require("../middleware/userValidation");

const prisma = new PrismaClient();

exports.getProfile = async (req, res) => {
  try {
    console.log("🔍 Fetching Profile for User ID:", req.user?.id); // ✅ Debug User ID

    // ใช้ User_id แทน id
    const user = await prisma.user.findUnique({
      where: {
        User_id: req.user.id, // ใช้ User_id แทน id
      },
      select: {
        User_id: true,
        FirstName: true,
        LastName: true,
        Email: true,
      },
    });

    if (!user) {
      console.log("❌ User Not Found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User Profile Found:", user);
    res.json(user);
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { FirstName, LastName, Phone } = updateUserSchema.parse(req.body);

    const updatedUser = await prisma.user.update({
      where: { User_id: req.user.id },
      data: { FirstName, LastName, Phone },
    });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userToDelete = await prisma.user.findUnique({
      where: { User_id: Number(id) },
    });

    if (!userToDelete) return next(createError(404, "User not found"));

    await prisma.user.delete({ where: { User_id: Number(id) } });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
