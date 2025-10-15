const pool = require("../utilities/db");

class CourseModel {
  static getCourses = async () => {
    const [result] = await pool.query("call get_courses(null); ");
    return result[0];
  };
  static getCourse = async (id) => {
    const [result] = await pool.query("call get_courses(?)", [id]);
    return result[0];
  };
  static insertCourses = async (name, description) => {
    const result = await pool.query(`call add_course(?,?) `, [
      name,
      description,
    ]);
    return getCourses();
  };

  static updateCourses = async (id, name, description) => {
    const result = await pool.query(`call update_course(?,?,?)`, [
      id,
      name,
      description,
    ]);
    return getcourse(id);
  };

  static deleteCourses = async (id) => {
    const result = await pool.query(`call delete_course(?)`, [id]);
    return id;
  };
}

/*(async()=>{

    console.log("All courses ........")
    await CourseModel.getCourses().then((result)=> console.log(result));

    console.log("Course with specific id ..........")
    await CourseModel.getcourse(1).then((result)=> console.log(result));

    console.log('Add course ........')
    await CourseModel.insertCourses('java','Learning java').then((result)=> console.log(result));

    console.log("update course .......")
    await CourseModel.updateCourses(77 , 'c++' , 'Leaning c++ ...').then((result)=> console.log(result));

    console.log("delete course ......")
    await CourseModel.deleteCourses(91).then((result)=> console.log(result));
})();
*/
module.exports = CourseModel;
