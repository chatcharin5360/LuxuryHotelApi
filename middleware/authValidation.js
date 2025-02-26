const { z } = require("zod");

const registerSchema = z.object({
  FirstName: z.string().min(2, "First name must be at least 2 characters"),
  LastName: z.string().min(2, "Last name must be at least 2 characters"),
  Email: z.string().email("Invalid email format"),
  Phone: z.string().optional(),
  Password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  Email: z.string().email("Invalid email format"),
  Password: z.string().min(6, "Password must be at least 6 characters"),
});

module.exports = { registerSchema, loginSchema };
