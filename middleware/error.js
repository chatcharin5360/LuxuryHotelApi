const handleErrors = (err, req, res, next) => {
  console.error(err); // เพิ่ม Log
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Something went wrong" });
};
module.exports = handleErrors;
