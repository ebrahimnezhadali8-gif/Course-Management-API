const CourseModel = require("../models/course-model");
const coursesModule = require("../models/course-model");
const EnrollmentModel = require("../models/enrollment-model");
const Joi = require("joi");
const _ = require("lodash");

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
const postCourse = async (req, res) => {
  let { name, description } = req.body;
  //Checking the existence of the name or not less than three characters
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().allow("").max(255),
  };
  const validateResult = Joi.object(schema).validate(req.body);
  if (validateResult.error) {
    return res.send(validateResult.error.details[0].message);
  }
  const course = await coursesModule.getCourseName(name);
  if (course) return res.status(400).send("Course already registered");

  const result = await coursesModule.insertCourses(name, description);
  const newCourse = await coursesModule.getCourseName(name);
  res.send(_.pick(newCourse, ["name", "description", "date"]));
};
const putCourse = async (req, res) => {
  let { name, description } = req.body;
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().allow("").max(255),
  };
  const validateResult = Joi.object(schema).validate(req.body);
  if (validateResult.error) {
    return res.send(validateResult.error.details[0].message);
  }
  const course = await coursesModule.getCourse(parseInt(req.params.id));
  if (!course) return res.status(404).send("courses whith id not found");

  const result = await coursesModule.updateCourses(
    parseInt(req.params.id),
    name,
    description
  );
  const upCourse = await CourseModel.getCourse(parseInt(req.params.id));
  console.log(upCourse);
  res.send(_.pick(upCourse[0], ["name", "description", "date"]));
};
const deleteCourses = async (req, res) => {
  const course = await coursesModule.getCourse(parseInt(req.params.id));
  if (!course) return res.status(404).send("courses whith id not found");

  //check table Enrollments
  const enrollment = await EnrollmentModel.getEnrollmentStudent(req.params.id);
  if (enrollment[0])
    return res
      .status(409)
      .send("Cannot delete course. They are enrolled in a student.");

  const deleted = await coursesModule.deleteCourses(parseInt(req.params.id));

  res.send(`Course with id ${req.params.id} deleted `);
};
module.exports = {
  getcourse,
  getCourses,
  postCourse,
  putCourse,
  deleteCourses,
};
