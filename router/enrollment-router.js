const express = require("express");
const router = express.Router();
const enrollmentController = require("../controller/enrollment-controller");

router.get("/", enrollmentController.getEnrollment);
router.get("/:id", enrollmentController.getEnrollmentStudent);
router.post(
  "/students/:studentId/courses/:courseId",
  enrollmentController.postEnrollment
);
router.delete(
  "/students/:studentId/courses/:courseId",
  enrollmentController.deleteEnrollment
);

module.exports = router;
