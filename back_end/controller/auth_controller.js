require("dotenv").config();
const UserModel = require("../models/user_model");
const { trycatchHandler } = require("../utilities/trycatch_handler");
const { USER_ROOL } = require("../utilities/role");
const Joi = require("joi");
const AppError = require("../utilities/app_error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = trycatchHandler(async (req, res) => {
  const schema = {
    name: Joi.string().trim().min(3).max(50).required(),
    email: Joi.string().trim().email().required(),
    role: Joi.string()
      .trim()
      .valid(...USER_ROOL)
      .default("student"),
    password: Joi.string().min(5).max(50).required(),
  };
  const validateResult = Joi.object(schema).validate(req.body);
  if (validateResult.error) throw validateResult.error;

  const { name, email, role, password } = validateResult.value;

  const user = await UserModel.getUserEmail(email);
  if (user[0]) throw new AppError(109, "user already registered", 409);

  const hashPassword = await bcrypt.hash(password, 10);
  await UserModel.insertUser(name, email, role, hashPassword);
  const newUser = await UserModel.getUserEmail(email);
  res.send(newUser);
});
const login = trycatchHandler(async (req, res) => {
  const schema = {
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(5).max(50).required(),
  };
  const validateResult = Joi.object(schema).validate(req.body);
  if (validateResult.error) throw validateResult.error;

  const { email, password } = validateResult.value;
  const user = await UserModel.getUserEmail(email);
  if (!user[0]) throw new AppError(101, "email or password is invend", 401);

  const validPassword = await bcrypt.compare(password, user[0].password);
  if (!validPassword)
    throw new AppError(101, "email or password is invend", 401);

  const token = jwt.sign(
    { id: user[0].id, role: user[0].role, email: user[0].email },
    process.env.SECRET_KEY,
    { expiresIn: "2h" } // Time Token
  );
  res.status(200).send({
  message: `Welcome ${user[0].name}`,
  token: token,
  role: user[0].role,
});
});

module.exports = {
  register,
  login,
};
