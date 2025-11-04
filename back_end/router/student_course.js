const express = require("express");
const router = express.Router();
const auth = require("../middlware/auth");
const studentController = require("../controller/student_controller");

router.get(
  "/course",
  auth.auth,
  auth.roleAuth("admin", "student"),
  studentController.getStudentCourses
);
router.post(
  "/course",
  auth.auth,
  auth.roleAuth("admin", "student"),
  studentController.enrollStudentToCourse
);
router.delete(
  "/:student_id/course/:course_id",
  auth.auth,
  auth.roleAuth("admin", "teacher"),
  studentController.deleteStudentInCourse
);

module.exports = router;
