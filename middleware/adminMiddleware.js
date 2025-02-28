const createError = require("../utils/createError");

const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return next(createError(403, "Access denied. Admins only."));
  }
  next();
};

module.exports = verifyAdmin;
