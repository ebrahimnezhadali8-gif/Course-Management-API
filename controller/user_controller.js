const Joi = require("joi");
const _ = require("lodash");
const { trycatchHandler } = require("../utilities/trycatch_handler");
const { USER_ROOL } = require("../utilities/role");
const AppError = require("../utilities/app_error");
const UserModel = require("../models/user_model");

// show profil peson
const getUserMe = trycatchHandler(async (req, res) => {
  const id = req.userData.id;

  const user = await UserModel.getUserMe(id);
  if (!user[0]) throw new AppError(104, "not found user", 404);
  res.send(user[0]);
});

// show users to admin
const getUsers = trycatchHandler(async (req, res) => {
  const result = await UserModel.getUsers();
  if (!result[0]) throw new AppError(104, "not found users", 404);
  res.send(result);
});

// update profile person
const putUserMe = trycatchHandler(async (req, res) => {
  const id = req.userData.id;
  // check input
  const schema = {
    name: Joi.string().trim().min(3).max(50).optional(),
    email: Joi.string().trim().email().optional(),
    password: Joi.string().min(5).max(50).optional(),
  };
  const validateResult = Joi.object(schema).validate(req.body);
  if (validateResult.error) throw validateResult.error;

  const { name, email, password } = validateResult.value;

  // check in user
  const user = await UserModel.getUserMe(id);
  if (!user[0]) throw new AppError(104, "not found user", 404);

  //update table user
  const result = await UserModel.updateUserMe(id, name, email, password);
  const newUser = await UserModel.getUserMe(id);
  res.status(200).json({
    message: "Profile updated successfully",
    data: newUser[0],
  });
});

// update role prson by admin
const putUserAdmin = trycatchHandler(async (req, res) => {
  //check input
  const schema = {
    role: Joi.string()
      .trim()
      .valid(...USER_ROOL)
      .default("student"),
  };
  const validateResult = Joi.object(schema).validate(req.body);
  if (validateResult.error) throw validateResult.error;

  const { role } = validateResult.value;
  const id = req.params.id;
  // check user
  const user = await UserModel.getUserMe(id);
  if (!user[0]) throw new AppError(104, "not found user", 404);

  // update role
  const result = await UserModel.updateUserAdmin(id, role);
  const newuser = await UserModel.getUserMe(id);
  res
    .status(200)
    .send(
      `user name :${newuser[0].name} , role :${newuser[0].role} update sucesfull!`
    );
});

//delete user by admin
const deleteUser = trycatchHandler(async (req, res) => {
  const { id } = req.params;
  // check id
  if (!id) throw new AppError(400, "User ID is required", 400);
  // check user
  const user = await UserModel.getUserMe(id);
  if (!user[0]) throw new AppError(104, "not found user", 404);

  //deletd user
  const deleted = await UserModel.deleteUser(id);
  res.status(200).json({
    message: "User deleted successfully",
  });
});

module.exports = {
  getUserMe,
  getUsers,
  putUserMe,
  putUserAdmin,
  deleteUser,
};
