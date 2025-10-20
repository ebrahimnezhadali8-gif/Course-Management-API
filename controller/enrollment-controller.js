const EnrollmentModel = require("../models/enrollment-model");
const StudentModel = require("../models/student-model");
const CourseModel = require("../models/course-model");

const getEnrollment = (req, res) => {
  EnrollmentModel.getEnrollments().then((result) => {
    res.send(result);
  });
};
const getEnrollmentStudent = (req, res) => {
  EnrollmentModel.getEnrollmentStudent(req.params.id).then((result) => {
    if (!result) return res.status(404).send("This not is student");
    res.send(result);
  });
};
const postEnrollment = async (req, res) => {
  const { studentId, courseId } = req.params;
  //check id student and id course
  if (!studentId || !courseId)
    return res.status(400).send("student_id and course_id are required.");
  // check course in table courses
  const student = await StudentModel.getStudent(studentId);
  if (!student) return res.status(404).send("Student not found.");

  //check student in table students
  const course = await CourseModel.getCourse(courseId);
  if (!course) return res.status(404).send("Course not found.");

  //check student with course table Enrollment
  const enrollment = await EnrollmentModel.getEnrollmentCourseStudent(
    studentId,
    parseInt(courseId)
  );
  console.log(enrollment);
  if (enrollment[0])
    return res.status(404).send("studend with Course registered.");
  //add enrollment
  const result = await EnrollmentModel.insertEnrollment(
    studentId,
    parseInt(courseId)
  );
  const newEnrollment = await EnrollmentModel.getEnrollmentCourseStudent(
    studentId,
    parseInt(courseId)
  );
  res.send(newEnrollment[0]);
};
const deleteEnrollment = async (req, res) => {
  const { studentId, courseId } = req.params;
  if (!studentId || !courseId)
    return res.status(400).send("student_id and course_id are required.");

  //check student with course table Enrollment
  const enrollment = await EnrollmentModel.getEnrollmentCourseStudent(
    studentId,
    parseInt(courseId)
  );
  if (!enrollment[0])
    return res.status(404).send("studend with Course not found.");

  const deleted = await EnrollmentModel.deleteEnrollment(
    studentId,
    parseInt(courseId)
  );

  res.send(`deleted successfully student name : ${enrollment[0].name} in course : ${enrollment[0].course}!`);
};

module.exports = {
  getEnrollment,
  getEnrollmentStudent,
  postEnrollment,
  deleteEnrollment,
};
