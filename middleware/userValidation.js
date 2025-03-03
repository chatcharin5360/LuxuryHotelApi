const { z } = require("zod");

exports.updateUserSchema = z.object({
    FirstName: z.string().min(1),
    LastName: z.string().min(1),
    Phone: z.string().regex(/^[0-9]{10}$/).optional(),
});