const CourseModel = require("../models/course-model");
const coursesModule = require("../models/course-model");
const EnrollmentModel = require("../models/enrollment-model");
const Joi = require("joi");
const _ = require("lodash");
const { trycatchHandler } = require("../utilities/trycatch_handler");
const AppError = require("../utilities/app_error");

const getcourse = trycatchHandler(async (req, res) => {
  //Checking the existence of the course
  const result = await coursesModule.getCourse(parseInt(req.params.id));
  if (!result[0]) throw new AppError(104, "this is not couse in id", 404);
  res.send(result);
});
const getCourses = trycatchHandler(async (req, res) => {
  const result = await coursesModule.getCourses();
  res.send(result);
});
const postCourse = trycatchHandler(async (req, res) => {
  let { name, description } = req.body;
  //Checking the existence of the name or not less than three characters
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().allow("").max(255),
  };
  const validateResult = Joi.object(schema).validate(req.body);
  if (validateResult.error) throw validateResult.error;

  const course = await coursesModule.getCourseName(name);
  if (course) throw new AppError(109, "Course already registered", 409);

  const result = await coursesModule.insertCourses(name, description);
  const newCourse = await coursesModule.getCourseName(name);
  res.status(201).send(_.pick(newCourse, ["name", "description", "date"]));
});
const putCourse = trycatchHandler(async (req, res) => {
  let { name, description } = req.body;
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().allow("").max(255),
  };
  const validateResult = Joi.object(schema).validate(req.body);
  if (validateResult.error) throw validateResult.error;

  const course = await coursesModule.getCourse(parseInt(req.params.id));
  if (!course[0]) throw new AppError(104, "courses whith id not found", 404);

  const result = await coursesModule.updateCourses(
    parseInt(req.params.id),
    name,
    description
  );
  const upCourse = await CourseModel.getCourse(parseInt(req.params.id));
  res.status(200).send(_.pick(upCourse[0], ["name", "description", "date"]));
});
const deleteCourses = trycatchHandler(async (req, res) => {
  const course = await coursesModule.getCourse(parseInt(req.params.id));
  if (!course[0]) throw new AppError(104, "courses whith id not found", 404);

  //check table Enrollments
  const enrollment = await EnrollmentModel.getEnrollmentCourse(req.params.id);

  if (enrollment)
    throw new AppError (1200 , "Students chose this course"  , 500)
  const deleted = await coursesModule.deleteCourses(parseInt(req.params.id));

  res.status(200).send(`Course with id ${req.params.id} deleted `);
});
module.exports = {
  getcourse,
  getCourses,
  postCourse,
  putCourse,
  deleteCourses,
};
