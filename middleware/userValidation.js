const { z } = require("zod");

exports.updateUserSchema = z.object({
    FirstName: z.string().min(2, "First name must be at least 2 characters"),
    LastName: z.string().min(2, "Last name must be at least 2 characters"),
    Phone: z.string().optional(),
});
