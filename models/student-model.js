const pool = require("../utilities/db");
const { v4: uuidv4 } = require("uuid");

class StudentModel {
  //GET ALL STUDENTS
  static getStudents = async () => {
    const [result] = await pool.query(`call get_students()`);
    return result[0];
  };
  // GET STUDENT WITH ID SPECIAL
  static getstudent = async (id) => {
    const [result] = await pool.query(`select * from students where id = ?`, [
      id,
    ]);
    return result;
  };
  // ADDED STUDENT
  static insertStudent = async (name, email) => {
    const id = uuidv4(); //create uuid
    const emailValue = email ? email : null;
    const result = await pool.query(`call add_student(?,?,?)`, [
      id,
      name,
      email,
    ]);
    return { id, name, email: emailValue };
  };
  //UPDATE STUDENT
  static updateStudent = async (id, name, email) => {
    const result = await pool.query(`call update_student(?,?,?)`, [
      id,
      name,
      email,
    ]);
    return this.getstudent(id);
  };
  //DELETE STUDENT
  static deleteStudent = async (id) => {
    const result = await pool.query(`call delete_student(?)`, [id]);
    return result;
  };
}

module.exports = StudentModel;
