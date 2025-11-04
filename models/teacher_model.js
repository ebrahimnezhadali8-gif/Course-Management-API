const pool = require("../utilities/db");

class TeacherModel {
  static getTeacherByCourseAndStudent = async (teacherId, courseId) => {
    const [result] = await pool.query(
      `call get_teacher_course_and_student(?,?)`,
      [teacherId, courseId]
    );
    return result[0];
  };
  //id teacher with id course
  static getTeacherInCourse = async (teacherId, courseId) => {
    const [result] = await pool.query(`call get_teacher_by_course(?,?)`, [
      teacherId,
      courseId,
    ]);
    return result[0];
  };
  static insertTeacherCourse = async (teacherId, courseId) => {
    const result = await pool.query(`call create_teacher_course(?,?)`, [
      teacherId,
      courseId,
    ]);
    return result;
  };
  static deleteTeacherCourse = async (teacherId, courseId) => {
    const result = await pool.query(`call delete_teacher_course(?,?)`, [
      teacherId,
      courseId,
    ]);
    return result;
  };
}

module.exports = TeacherModel;
