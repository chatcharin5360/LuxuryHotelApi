const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getDashboardData = async (req, res) => {
  try {
    // จำนวนห้อง
    const totalRooms = await prisma.room.count();

    // จำนวนผู้ใช้
    const totalUsers = await prisma.user.count();

    // จำนวนการจอง
    const totalBookings = await prisma.booking.count();

    // จำนวนการชำระเงิน
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
