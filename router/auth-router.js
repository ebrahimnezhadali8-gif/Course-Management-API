const express = require("express");
const router = express.Router();
const authController = require("../controller/auth_controller");
const auth = require("../middlware/auth");

router.post("/login", authController.login);
router.post(
  "/register",
  auth.auth,
  auth.roleAuth("admin"),
  authController.register
);

module.exports = router;
