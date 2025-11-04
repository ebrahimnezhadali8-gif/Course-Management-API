const pool = require("../utilities/db");
const { v4: uuidv4 } = require("uuid");

class UserModel {
  static getUserEmail = async (email) => {
    const [result] = await pool.query(`call get_user_by_email(?)`, [email]);
    return result[0];
  };
  static getUserMe = async (id) => {
    const [result] = await pool.query(`call get_user_id(?)`, [id]);
    return result[0];
  };
  static getUsers = async () => {
    const [result] = await pool.query(`call get_users()`);
    return result[0];
  };
  static insertUser = async (name, email, role, password) => {
    const id = uuidv4(); //create uuid
    const result = await pool.query(`call create_user(?,?,?,?,?)`, [
      id,
      name,
      email,
      role,
      password,
    ]);
    return result;
  };
  static updateUserMe = async (id, name, email, password) => {
    const result = await pool.query(`call update_user_me(?,?,?,?)`, [
      id,
      name,
      email,
      password,
    ]);
    return result;
  };
  static updateUserAdmin = async (id, role) => {
    const result = await pool.query(`call update_user_admin(?,?)`, [id, role]);
    return result;
  };
  static deleteUser = async (id) => {
    const result = await pool.query(`call delete_user(?)`, [id]);
    return result;
  };
}

module.exports = UserModel;
