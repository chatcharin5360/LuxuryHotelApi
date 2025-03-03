const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");
const { registerSchema, loginSchema } = require("../middleware/authValidation");

const prisma = new PrismaClient();

exports.register = async (req, res, next) => {
  try {
    const { FirstName, LastName, Email, Password } = registerSchema.parse(
      req.body
    );

    const existingUser = await prisma.user.findUnique({ where: { Email } });
    if (existingUser) return next(createError(400, "Email already exists"));

    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = await prisma.user.create({
      data: { FirstName, LastName, Email, Password: hashedPassword },
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { Email, Password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { Email } });
    if (!user) return next(createError(404, "User not found"));

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) return next(createError(400, "Invalid credentials"));

    const token = jwt.sign(
      { id: user.User_id, role: user.Role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
