const express = require("express");
const router = express.Router();
const teacherController = require("../controller/teacher_controller");
const auth = require("../middlware/auth");

// /courses/student?teacherId=id teacher&courseId=id course
router.get(
  "/course/student",
  auth.auth,
  auth.roleAuth("admin", "teacher"),
  teacherController.getTeacherByCourseAndStudent
);
router.post(
  "/course",
  auth.auth,
  auth.roleAuth("admin", "teacher"),
  teacherController.putTeacherCourse
);
router.delete(
  "/:teacher_id/course/:course_id",
  auth.auth,
  auth.roleAuth("admin"),
  teacherController.deleteTeacherCourse
);

module.exports = router;
