const express = require("express");
const router = express.Router();
const teacher_controller = require("../controller/teacher_controller");
const auth = require("../middlware/auth");

// /courses/student?teacherId=id teacher&courseId=id course
router.get(
  "/courses/student",
  auth.auth,
  auth.roleAuth("admin", "teacher"),
  teacher_controller.getTeacherByCourseAndStudent
);

module.exports = router;
