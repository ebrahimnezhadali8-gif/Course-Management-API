const pool = require("../utilities/db");

class TeacherModel {
  static getTeacherByCourseAndStudent = async (teacherId, courseId) => {
    const [result] = await pool.query(
      `call get_teacher_course_and_student(?,?)`,
      [teacherId, courseId]
    );
    return result[0];
  };
}

module.exports = TeacherModel;
