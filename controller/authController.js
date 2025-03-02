const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.clerkWebhook = async (req, res, next) => {
  try {
    console.log("🔔 Webhook received:", JSON.stringify(req.body, null, 2));

    if (!req.body.data) {
      return res.status(400).json({ message: "Invalid Clerk data" });
    }

    const { id, first_name, last_name, email_addresses } = req.body.data;

    if (!id || !email_addresses || email_addresses.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🔥 ใช้ `upsert()` แทน `create()` เพื่อป้องกัน Duplicate Email
    const newUser = await prisma.user.upsert({
      where: { Email: email_addresses[0].email_address },
      update: {
        clerk_id: id,
        FirstName: first_name || "Unknown",
        LastName: last_name || "User",
      },
      create: {
        clerk_id: id,
        FirstName: first_name || "Unknown",
        LastName: last_name || "User",
        Email: email_addresses[0]?.email_address || "",
      },
    });

    console.log("✅ User registered/updated successfully:", newUser);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("❌ Error processing webhook:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
