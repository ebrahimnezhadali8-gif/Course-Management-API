const express = require("express");
const router = express.Router();
const auth = require("../middlware/auth");
const userController = require("../controller/user_controller");

// profile person
router.get("/me", auth.auth, userController.getUserMe);
router.get("/", auth.auth, auth.roleAuth("admin"), userController.getUsers);
router.put("/me", auth.auth, userController.putUserMe);
router.put(
  "/:id",
  auth.auth,
  auth.roleAuth("admin"),
  userController.putUserAdmin
);
router.delete(
  "/:id",
  auth.auth,
  auth.roleAuth("admin"),
  userController.deleteUser
);

module.exports = router;
