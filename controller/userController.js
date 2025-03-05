const { PrismaClient } = require("@prisma/client");
const createError = require("../utils/createError");
const { updateUserSchema } = require("../middleware/userValidation");

const prisma = new PrismaClient();

exports.getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        User_id: req.user.id,
      },
      select: {
        User_id: true,
        FirstName: true,
        LastName: true,
        Email: true,
        Role: true,
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
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { FirstName, LastName } = updateUserSchema.parse(req.body);

    const updatedUser = await prisma.user.update({
      where: { User_id: req.user.id },
      data: { FirstName, LastName },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("❌ Error updating profile:", error);
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
