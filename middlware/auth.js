require("dotenv").config();
const AppError = require("../utilities/app_error");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) throw new AppError(101, "Access denied", 401);

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = decode;
    next();
  } catch (error) {
    return res.status(400).send("token is invalid");
  }
};

const roleAuth = (...role) => {
  return (req, res, next) => {
    if (!req.userData) throw new AppError(101, "user not auth", 401);

    if (!role.includes(req.userData.role))
      throw new AppError(103, "Access defind", 403);

    next();
  };
};

module.exports = { auth, roleAuth };
