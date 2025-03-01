const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// สร้างห้องพัก (เฉพาะ Admin)
exports.createRoom = async (req, res, next) => {
  try {
    const { Hotel_id, Room_type, Picture_id, Description, Price_per_night } =
      req.body;

    const newRoom = await prisma.room.create({
      data: {
        Hotel_id,
        Room_type,
        Picture_id,
        Description,
        Price_per_night,
      },
    });

    res
      .status(201)
      .json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    next(error);
  }
};

// อัปเดตห้องพัก (เฉพาะ Admin)
exports.updateRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { Room_type, Picture_id, Description, Price_per_night } = req.body;

    const updatedRoom = await prisma.room.update({
      where: { Room_id: Number(id) },
      data: {
        Room_type,
        Picture_id,
        Description,
        Price_per_night,
      },
    });

    res
      .status(200)
      .json({ message: "Room updated successfully", room: updatedRoom });
  } catch (error) {
    next(error);
  }
};

// ลบห้องพัก (เฉพาะ Admin)
exports.deleteRoom = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.room.delete({
      where: { Room_id: Number(id) },
    });

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    next(error);
  }
};
