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
const postEnrollment = (req, res) => {
  const { studentId, courseId } = req.params;
  //check id student and id course
  if (!studentId || !courseId)
    return res.status(400).send("student_id and course_id are required.");
  // check course in table courses
  StudentModel.getstudent(studentId).then((result) => {
    if (!result) return res.status(409).send("Student not found.");
  });
  //check student in table students
  CourseModel.getCourse(courseId).then((result) => {
    if (!result) return res.status(409).send("Course not found.");
  });
  EnrollmentModel.insertEnrollment(studentId, parseInt(courseId)).then(
    (result) => {
      res.send(`added successfully!`);
    }
  );
};
const deleteEnrollment = (req, res) => {
  const { studentId, courseId } = req.params;
  if (!studentId || !courseId)
    return res.status(400).send("student_id and course_id are required.");
  EnrollmentModel.deleteEnrollment(studentId, parseInt(courseId)).then(
    (result) => {
      res.send("deleted successfully!");
    }
  );
};

module.exports = {
  getEnrollment,
  getEnrollmentStudent,
  postEnrollment,
  deleteEnrollment,
};
