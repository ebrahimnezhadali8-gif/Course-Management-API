const coursesModule = require("../models/course-model");

const getcourse = (req, res) => {
//Checking the existence of the course
  coursesModule.getCourse(parseInt(req.params.id)).then((result) => {
    if (!result) res.status(404).send("courses whith id not found");
    res.send(result);
  });
};
const getCourses = (req, res) => {
  coursesModule.getCourses().then((result) => {
    res.send(result);
  });
};
const postCourse = (req, res) => {
  const {name ,description} = req.body;
//Checking the existence of the name or not less than three characters
  if (!name || name.length < 3) {
    return res.status(404).send("name is required!");
  }
  coursesModule.getCourseName(name).then((result)=>{
    if(!result) return res.status(404).send("courses whith id not found");
  })
  if (!description) description = "";

  coursesModule.insertCourses(name, description).then((result) => {
    res.send(`Course added successfully name:${name} and description:${description}`);
  });
};
const putCourse = (req,res)=>{
  const {name ,description} = req.body;
  if (!name || name.length < 3) {
    return res.status(404).send("name is required!");
  }
  coursesModule.getCourseName(name).then((result)=>{
    if(!result) return res.status(404).send("courses whith id not found");
  });
  if (!description) description = "";
  coursesModule.updateCourses(parseInt(req.params.id),name , description).then((result)=>{
    res.send(result);
  })
}
const deleteCourses = (req,res)=>{
  coursesModule.getCourse(parseInt(req.params.id)).then((result)=>{
    if(!result) return res.status(404).send("courses whith id not found");
  })
  coursesModule.deleteCourses(parseInt(req.params.id)).then((result)=>{
    res.send(`Course with id ${req.params.id} deleted `)
  })
}
module.exports = {
  getcourse,
  getCourses,
  postCourse,
  putCourse,
  deleteCourses
};
