const CourseModel = require("../models/course-model");
const TeacherModel = require("../models/teacher_model");
const UserModel = require("../models/user_model");
const AppError = require("../utilities/app_error");
const { trycatchHandler } = require("../utilities/trycatch_handler");
const Joi = require("joi");

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

//add course in teacher
const putTeacherCourse = trycatchHandler(async (req, res) => {
  const role = req.userData.role;
  const schema = {
    course_id: Joi.number().integer().required(),
    teacher_id: Joi.string().optional(),
  };
  const validate = Joi.object(schema).validate(req.body);
  if (validate.error) throw validate.error;

  const { course_id, teacher_id } = validate.value;
  let endTeacherId;

  if (role === "teacher") {
    endTeacherId = req.userData.id;
  } else if (role === "admin") {
    endTeacherId = teacher_id;
    if (!endTeacherId)
      throw new AppError(400, "teacher id is required for admin", 400);
  } else {
    throw new AppError(403, "Access denied", 403);
  }
  // check course
  const course = await CourseModel.getCourse(course_id);
  if (!course[0]) throw new AppError(104, "Course not found", 404);

  //check teacher
  const teacher = await UserModel.getUserMe(endTeacherId);
  if (!teacher[0]) throw new AppError(104, "not found user", 404);

  //check teacher and course
  const teacherCourse = await TeacherModel.getTeacherInCourse(
    endTeacherId,
    course_id
  );
  if (teacherCourse[0])
    throw new AppError(
      101,
      "this is teacher with course already registered!",
      401
    );
  const result = await TeacherModel.insertTeacherCourse(
    endTeacherId,
    course_id
  );
  res
    .status(201)
    .send(
      `course : ${course[0].name} by teacher : ${teacher[0].name} registered`
    );
});
//deleted studet in courses
const deleteTeacherCourse = trycatchHandler(async (req, res) => {
  const { course_id, teacher_id } = req.params;
  //check id course and id teacher
  if (!course_id || !teacher_id)
    throw new AppError(100, "not found course or teacher", 400);

  //check teacher by course in table
  const teacherCourse = await TeacherModel.getTeacherInCourse(
    teacher_id,
    course_id
  );
  if (!teacherCourse[0])
    throw new AppError(101, "not found teacher with course", 401);

  const deleted = await TeacherModel.deleteTeacherCourse(teacher_id, course_id);
  res.status(200).send("deleted course by student");
});
module.exports = {
  getTeacherByCourseAndStudent,
  putTeacherCourse,
  deleteTeacherCourse
};
