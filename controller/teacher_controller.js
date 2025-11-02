const TeacherModel = require("../models/teacher_model");
const AppError = require("../utilities/app_error");
const { trycatchHandler } = require("../utilities/trycatch_handler");

// show course with student to teacher and admin
const getTeacherByCourseAndStudent = trycatchHandler(async (req, res) => {
  const role = req.userData.role;
  const courseId = req.query.courseId ? parseInt(req.query.courseId) : null;
  const teacherIdQuery = req.query.teacherId || null;
  let teacherId = null;

  if (role === "teacher") {
    teacherId = req.userData.id;
  } else if (role === "admin") {
    teacherId = teacherIdQuery;
  } else {
    throw new AppError(403, "Access denied", 403);
  }

  const result = await TeacherModel.getTeacherByCourseAndStudent(
    teacherId,
    courseId
  );
  if (!result || result.length === 0)
    throw new AppError(104, "No courses or students found", 404);

  res.status(200).json({
    message: "Courses and students fetched successfully",
    count: result.length,
    data: result,
  });
});

module.exports = {
  getTeacherByCourseAndStudent,
};
