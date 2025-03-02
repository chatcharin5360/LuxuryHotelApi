const createError = require("../utils/createError");

const checkAdmin = (req, res, next) => {
  try {
    const { role } = req.auth; // Clerk Middleware จะเพิ่ม `req.auth`

    if (role !== "ADMIN") {
      return next(createError(403, "Access denied. Admins only!"));
    }

    next();
  } catch (error) {
    next(createError(500, "Failed to verify admin status"));
  }
};

module.exports = { checkAdmin };
