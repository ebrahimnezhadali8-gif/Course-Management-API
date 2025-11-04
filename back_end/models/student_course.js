const pool = require("../utilities/db");

class StudentModel {
  static getStudentByCourse = async (studentId, courseId) => {
    const [result] = await pool.query(`call get_student_by_course(?,?)`, [
      studentId,
      courseId,
    ]);
    return result[0];
  };
  static getStudentCourses = async (studentId) => {
    const [result] = await pool.query(`call get_courses_student(?)`, [
      studentId,
    ]);
    return result[0];
  };
  static insertStudentCourse = async (studentId, courseId) => {
    const result = await pool.query(`call enroll_student_to_course(?,?)`, [
      studentId,
      courseId,
    ]);
    return result;
  };
  static deleteStudentInCourse = async (studentId, courseId) => {
    const result = await pool.query(`call delete_student_course(?,?)`, [
      studentId,
      courseId,
    ]);
    return result;
  };
}

module.exports = StudentModel;
