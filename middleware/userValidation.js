const { z } = require("zod");

exports.updateUserSchema = z.object({
    FirstName: z.string().min(1),
    LastName: z.string().min(1),
    Phone: z.string().optional(),
});
