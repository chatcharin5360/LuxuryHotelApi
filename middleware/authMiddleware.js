// const jwt = require("jsonwebtoken");
// const createError = require("../utils/createError");

// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1];

//   if (!token) return next(createError(401, "Access Denied"));

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     next(createError(403, "Invalid Token"));
//   }
// };

// module.exports = authMiddleware;

const { clerkClient } = require("@clerk/express");
const createError = require("../utils/createError");

module.exports = async (req, res, next) => {
    const cleck_id = req.auth.userId
    if (!cleck_id) {
      return createError(403, "something wrong")
    } 
    const userClerk = await clerkClient.users.getUser(cleck_id)
    console.log(userClerk);

    req.user = userClerk
    next()
    
}
