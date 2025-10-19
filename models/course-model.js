const pool = require("../utilities/db");

class CourseModel {
//GET ALL COURSES
  static getCourses = async () => {
    const [result] = await pool.query("call get_courses(null); ");
    return result[0];
  };
//GET COURSE WITH ID SPECIAL
  static getCourse = async (id) => {
    const [result] = await pool.query("call get_courses(?)", [id]);
    return result[0];
  };
//GET COURSE WITH NAME SPECIAL
  static getCourseName = async (name) => {
    const [result] = await pool.query(`select * from courses where name =?`, [
      name,
    ]);
    return result[0];
  };
//ADD COURSE
  static insertCourses = async (name, description) => {
    const result = await pool.query(`call add_course(?,?) `, [
      name,
      description,
    ]);
  };
//UPDATE COURSE (NAME AND DESCRIPTION)
  static updateCourses = async (id, name, description) => {
    const result = await pool.query(`call update_course(?,?,?)`, [
      id,
      name,
      description,
    ]);
    return this.getCourse(id);
  };
//DELETE COURSE 
  static deleteCourses = async (id) => {
    const result = await pool.query(`call delete_course(?)`, [id]);
    return id;
  };
}

module.exports = CourseModel;
