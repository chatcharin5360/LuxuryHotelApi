const { PrismaClient } = require("@prisma/client");
const createError = require("../utils/createError");
const { updateUserSchema } = require("../middleware/userValidation");

const prisma = new PrismaClient();

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
    await prisma.user.delete({ where: { User_id: req.user.id } });
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    next(error);
  }
};
