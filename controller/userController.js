const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createError = require("../utils/createError");


exports.getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { User_id: req.user.id },
    });
    if (!user) return next(createError(404, "User not found"));

    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    
    const { FirstName, LastName, Email, Phone } = req.body;
    const updatedUser = await prisma.user.upsert({
      where: { cleck_id: id },
      create: { cleck_id: id, FirstName, LastName, Email, Phone },
      update: { FirstName, LastName, Email, Phone }
    });

    res.status(200).json({message: "success"});
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
