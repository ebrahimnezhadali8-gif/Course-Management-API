const pool = require("../utilities/db");

class EnrollmentModel {
  // GET ALL ENROLLMENTS
  static getEnrollments = async () => {
    const [result] = await pool.query(`call get_enrollments()`);
    return result[0];
  };
  // GET ENROLLMENTS WITH ID STUDENT SPECIAL
  static getEnrollmentStudent = async (id) => {
    const [result] = await pool.query(`call get_enrollments_student(?)`, [id]);
    return result[0];
  };
  //GET ENROLLMENTS WITH ID COURSE SPECIAL
  static getEnrollmentCourse = async (id) => {
    const [result] = await pool.query(`call get_student_id(?)`, [id]);
    return result[0];
  };
  //
  static getEnrollmentCourseStudent = async (studentId, coursesId) => {
    const [result] = await pool.query(
      `call get_enrollments_student_course(?,?) `,
      [studentId, coursesId]
    );
    return result[0];
  };
  //ADD ENROLLMENTS
  static insertEnrollment = async (studentId, coursesId) => {
    const result = await pool.query(`call add_enroll(?,?)`, [
      studentId,
      coursesId,
    ]);
    return { studentId, coursesId };
  };
  //DELETE ENROLLMENTS
  static deleteEnrollment = async (studentId, coursesId) => {
    const result = await pool.query(`call delete_enrollment(?,?)`, [
      studentId,
      coursesId,
    ]);
    return { studentId, coursesId };
  };
}

module.exports = EnrollmentModel;
