const createError = require("../utils/createError");

const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return next(createError(403, "Access Denied. Admins only."));
  }
  next();
};

module.exports = isAdmin;
