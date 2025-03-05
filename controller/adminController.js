const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getDashboardData = async (req, res) => {
  try {
    
    const totalRooms = await prisma.room.count();

    const totalUsers = await prisma.user.count();

    const totalBookings = await prisma.booking.count();

    const totalPayments = await prisma.payment.count();

    // ส่งข้อมูลกลับ
    res.json({
      totalRooms,
      totalUsers,
      totalBookings,
      totalPayments,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
};

module.exports = { getDashboardData };
