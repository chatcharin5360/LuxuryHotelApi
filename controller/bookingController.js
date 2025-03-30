// 📁 controller/bookingController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createBooking = async (req, res) => {
  const { roomId, quantity, checkIn, checkOut } = req.body;

  try {
    const room = await prisma.room.findUnique({ where: { Room_id: roomId } });
    if (!room) return res.status(404).json({ message: "Room not found" });

    const nights = Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = room.Price_per_night * nights * quantity;

    // ✅ Create booking first
    const booking = await prisma.booking.create({
      data: {
        Check_in_date: new Date(checkIn),
        Check_out_date: new Date(checkOut),
        Total_price: totalPrice,
        Booking_status: "PENDING",
        User_id: req.user.id,
      },
    });

    // ✅ Create bookingonroom separately
    await prisma.bookingonroom.create({
      data: {
        Booking_id: booking.Booking_id,
        Room_id: roomId,
        Quantity_room: quantity,
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking failed:", error);
    res.status(500).json({ message: "Booking failed" });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { User_id: req.user.id },
      include: {
        bookingonroom: {
          include: {
            room: true,
          },
        },
      },
      orderBy: {
        Booking_id: "desc",
      },
    });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

exports.payBooking = async (req, res) => {
  const bookingId = parseInt(req.params.id);

  try {
    const booking = await prisma.booking.findUnique({
      where: { Booking_id: bookingId },
    });
    if (!booking || booking.User_id !== req.user.id)
      return res.status(403).json({ message: "Access denied" });

    await prisma.booking.update({
      where: { Booking_id: bookingId },
      data: { Booking_status: "CONFIRMED" },
    });

    await prisma.payment.create({
      data: {
        Booking_id: bookingId,
        Amount: booking.Total_price,
        Payment_method: "MockCard",
        Payment_status: "PAID",
        Payment_date: new Date(),
      },
    });

    res.json({ message: "Payment successful!" });
  } catch (error) {
    console.error("Payment failed:", error);
    res.status(500).json({ message: "Payment failed" });
  }
};

exports.cancelBooking = async (req, res) => {
  const bookingId = parseInt(req.params.id);

  try {
    const booking = await prisma.booking.findUnique({
      where: { Booking_id: bookingId },
    });

    if (!booking || booking.User_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Access denied or booking not found" });
    }

    await prisma.booking.delete({
      where: { Booking_id: bookingId },
    });

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Cancel booking failed:", error);
    res.status(500).json({ message: "Cancel booking failed" });
  }
};
