const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
}).promise();

const getCourses = async()=>{
    const [result] = await pool.query('call get_courses(null); ');
    return result[0]
}
const getcourse = async(id)=>{
    const [result] = await pool.query('call get_courses(?)' , [id]);
    return result[0]
}
const insertCourses = async(name ,description )=>{
    const result = await pool.query(`call add_course(?,?) `, [name , description]);
    return getCourses()
}

const updateCourses = async(id , name , description)=>{
    const result = await pool.query(`call update_course(?,?,?)`,[id , name , description])
    return getcourse(id)
}

const deleteCourses = async(id)=>{
    const result = await pool.query(`call delete_course(?)` , [id]);
    return id;
}
(async()=>{

    console.log("All courses ........")
    await getCourses().then((result)=> console.log(result));

    console.log("Course with specific id ..........")
    await getcourse(1).then((result)=> console.log(result));

    console.log('Add course ........')
    await insertCourses('java','Learning java').then((result)=> console.log(result));

    console.log("update course .......")
    await updateCourses(77 , 'c++' , 'Leaning c++ ...').then((result)=> console.log(result));

    console.log("delete course ......")
    await deleteCourses(3).then((result)=> console.log(result));
})();

