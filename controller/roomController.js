const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createError = require("../utils/createError");

exports.getRooms = async (req, res, next) => {
    try {
      const rooms = await prisma.room.findMany({
        select: {
          Room_id: true,
          Room_type: true,
          Picture_id: true,
          Description: true,
          Price_per_night: true,
        },
      });
  
      const formattedRooms = rooms.map((room) => ({
        ...room,
        Picture_id: room.Picture_id.startsWith("/") ? room.Picture_id : `/image/Landing/${room.Picture_id}`,
      }));
  
      res.json(formattedRooms);
    } catch (error) {
      next(createError(500, "Error fetching rooms"));
    }
  };
  

exports.addRoom = async (req, res, next) => {
  const { Room_type, Picture_id, Description, Price_per_night } = req.body;

  if (!Room_type || !Price_per_night) {
    return next(createError(400, "Room_type and Price_per_night are required"));
  }

  try {
    const newRoom = await prisma.room.create({
      data: {
        Room_type,
        Picture_id: Picture_id || null,
        Description: Description || null,
        Price_per_night: parseFloat(Price_per_night),
      }
    });

    res.status(201).json(newRoom);
  } catch (error) {
    console.error("❌ Error adding room:", error);
    next(error);
  }
};

exports.updateRoom = async (req, res, next) => {
  const { Room_id } = req.params;
  const { Room_type, Picture_id, Description, Price_per_night } = req.body;

  try {
    const updatedRoom = await prisma.room.update({
      where: { Room_id: parseInt(Room_id) },
      data: {
        Room_type,
        Picture_id: Picture_id || null,
        Description: Description || null,
        Price_per_night: parseFloat(Price_per_night),
      },
    });

    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error("❌ Error updating room:", error);
    next(createError(500, "Error updating room"));
  }
};

exports.deleteRoom = async (req, res, next) => {
  const { Room_id } = req.params;

  try {
    await prisma.room.delete({
      where: { Room_id: parseInt(Room_id) },
    });

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting room:", error);
    next(createError(500, "Error deleting room"));
  }
};
