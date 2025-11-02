const EnrollmentModel = require("../models/enrollment-model");
const CourseModel = require("../models/course-model");
const { trycatchHandler } = require("../utilities/trycatch_handler");
const AppError = require("../utilities/app_error");

const getEnrollment = trycatchHandler(async (req, res) => {
  const result = await EnrollmentModel.getEnrollments();
  res.send(result);
});

const getEnrollmentStudent = trycatchHandler(async (req, res) => {
  const result = await EnrollmentModel.getEnrollmentStudent(req.params.id);
  if (!result[0]) throw new AppError(104, "This not is student", 404);
  res.send(result);
});

const postEnrollment = trycatchHandler(async (req, res) => {
  const { studentId, courseId } = req.params;
  //check id student and id course
  if (!studentId || !courseId)
    throw new AppError(100, "student_id and course_id are required.", 400);
  // check course in table courses
  const student = await StudentModel.getStudent(studentId);
  if (!student) throw new AppError(104, "Student not found.", 404);

  //check student in table students
  const course = await CourseModel.getCourse(courseId);
  if (!course[0]) throw new AppError(104, "Course not found.", 404);

  //check student with course table Enrollment
  const enrollment = await EnrollmentModel.getEnrollmentCourseStudent(
    studentId,
    parseInt(courseId)
  );
  if (enrollment[0])
    throw new AppError(109, "studend with Course registered.", 409);
  //add enrollment
  const result = await EnrollmentModel.insertEnrollment(
    studentId,
    parseInt(courseId)
  );
  const newEnrollment = await EnrollmentModel.getEnrollmentCourseStudent(
    studentId,
    parseInt(courseId)
  );
  res.status(201).send(newEnrollment[0]);
});
const deleteEnrollment = trycatchHandler(async (req, res) => {
  const { studentId, courseId } = req.params;
  if (!studentId || !courseId)
    throw new AppError(100, "student_id and course_id are required.", 400);

  //check student with course table Enrollment
  const enrollment = await EnrollmentModel.getEnrollmentCourseStudent(
    studentId,
    parseInt(courseId)
  );
  if (!enrollment[0]) throw new AppError(104, "enrollment not is found", 404);

  const deleted = await EnrollmentModel.deleteEnrollment(
    studentId,
    parseInt(courseId)
  );

  res
    .status(200)
    .send(
      `deleted successfully student name : ${enrollment[0].name} in course : ${enrollment[0].course}!`
    );
});

module.exports = {
  getEnrollment,
  getEnrollmentStudent,
  postEnrollment,
  deleteEnrollment,
};
