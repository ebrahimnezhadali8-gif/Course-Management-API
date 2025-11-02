const express = require("express");
const router = express.Router();
const courseController = require("../controller/course-controller");
const auth = require("../middlware/auth");

router.get("/:id", courseController.getcourse);
router.get("/", courseController.getCourses);
router.post(
  "/",
  auth.auth,
  auth.roleAuth("admin"),
  courseController.postCourse
);
router.put(
  "/:id",
  auth.auth,
  auth.roleAuth("admin"),
  courseController.putCourse
);
router.delete(
  "/:id",
  auth.auth,
  auth.roleAuth("admin"),
  courseController.deleteCourses
);

module.exports = router;
