const CourseModel = require("../models/course-model");
const UserModel = require("../models/user_model");
const StudentModel = require("../models/student_course");
const AppError = require("../utilities/app_error");
const { trycatchHandler } = require("../utilities/trycatch_handler");
const Joi = require("joi");
const TeacherModel = require("../models/teacher_model");

// show list courses one studen
const getStudentCourses = trycatchHandler(async (req, res) => {
  const role = req.userData.role;
  let studentId;

  if (role === "student") {
    studentId = req.userData.id;
  } else if (role === "admin") {
    studentId = req.query.student_id;
  } else {
    throw new AppError(403, "Access denied", 403);
  }

  const result = await StudentModel.getStudentCourses(studentId);
  if (!result[0]) throw new AppError(104, "not found student in course", 404);

  res.status(200).send(result);
});
const enrollStudentToCourse = trycatchHandler(async (req, res) => {
  const role = req.userData.role;
  const schema = {
    course_id: Joi.number().integer().required(),
    student_id: Joi.string().optional(),
  };
  const validate = Joi.object(schema).validate(req.body);
  if (validate.error) throw validate.error;

  const { course_id, student_id } = validate.value;
  let endStudentId;

  if (role === "student") {
    endStudentId = req.userData.id;
  } else if (role === "admin") {
    endStudentId = student_id;
    if (!endStudentId)
      throw new AppError(400, "student id is required for admin", 400);
  } else {
    throw new AppError(403, "Access denied", 403);
  }
  // check course
  const course = await CourseModel.getCourse(course_id);
  if (!course[0]) throw new AppError(104, "Course not found", 404);

  //check student
  const student = await UserModel.getUserMe(endStudentId);
  if (!student[0]) throw new AppError(104, "not found user", 404);

  //check student and course
  const studentCourse = await StudentModel.getStudentByCourse(
    endStudentId,
    course_id
  );
  if (studentCourse[0])
    throw new AppError(
      101,
      "this is student with course already registered!",
      401
    );
  const result = await StudentModel.insertStudentCourse(
    endStudentId,
    course_id
  );
  res
    .status(201)
    .send(
      `course : ${course[0].name} by student : ${student[0].name} registered`
    );
});
// deleted student in course
const deleteStudentInCourse = trycatchHandler(async (req, res) => {
  const { course_id, student_id } = req.params;
  //check id course and id student
  if (!course_id || !student_id)
    throw new AppError(100, "not found course or student", 400);

  //check student by course in table
  const studentCourse = await StudentModel.getStudentByCourse(
    student_id,
    course_id
  );
  if (!studentCourse[0])
    throw new AppError(104, "course or student not found table", 404);

  const result = await StudentModel.deleteStudentInCourse(
    student_id,
    course_id
  );
  res.status(200).send(`deleted course by student`);
});

module.exports = {
  getStudentCourses,
  enrollStudentToCourse,
  deleteStudentInCourse,
};
