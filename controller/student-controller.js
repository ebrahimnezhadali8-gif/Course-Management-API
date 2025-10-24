const StudentModel = require("../models/student-model");
const EnrollmentModel = require("../models/enrollment-model");
const Joi = require("joi");
const _ = require("lodash");
const { trycatchHandler } = require("../utilities/trycatch_handler");
const AppError = require("../utilities/app_error");

const getStudents = trycatchHandler(async (req, res) => {
  const result = await StudentModel.getStudents();
  const students = result.map((student) =>
    _.pick(student, ["name", "email", "date"])
  );
  res.send(students);
});

const postStudent = trycatchHandler(async (req, res) => {
  const { name, email } = req.body;
  const schema = {
    name: Joi.string().trim().min(3).max(50).required(),
    email: Joi.string().email().required(),
  };
  const validateResult = Joi.object(schema).validate(req.body);
  if (validateResult.error) throw validateResult.error;

  const student = await StudentModel.getStudentEmail(email);
  if (student) throw new AppError(109, "email already registered", 409);

  const result = await StudentModel.insertStudent(name, email);
  const newStudent = await StudentModel.getStudentEmail(email);
  res.status(201).send(_.pick(newStudent, ["name", "email", "date"]));
});
const putStudent = trycatchHandler(async (req, res) => {
  let { name, email } = req.body;
  //checking name
  const schema = {
    name: Joi.string().trim().min(3).max(50).required(),
    email: Joi.string().email().allow("").optional(),
  };
  const validateResult = Joi.object(schema).validate(req.body);
  if (validateResult.error) throw validateResult.error;
  // check id
  const student = await StudentModel.getStudent(parseInt(req.params.id));
  console.log(student);
  if (!student) throw new AppError(104, "student whith id not found", 404);

  const result = await StudentModel.updateStudent(req.params.id, name, email);

  const upStudent = await StudentModel.getStudent(parseInt(req.params.id));
  res.status(200).send(_.pick(upStudent, ["name", "email", "date"]));
});
const deleteStudent = trycatchHandler(async (req, res) => {
  const student = await StudentModel.getStudent(req.params.id);
  if (!student) throw new AppError(104, "student whith id not found", 404);

  //check table Enrollments
  const enrollment = await EnrollmentModel.getEnrollmentStudent(req.params.id);
  if (enrollment[0])
    throw new AppError(
      104,
      "Cannot delete student. They are enrolled in a course.",
      404
    );
  const deleted = await StudentModel.deleteStudent(req.params.id);
  res.status(200).send(`student with id : ${req.params.id} deleted`);
});

module.exports = {
  getStudents,
  postStudent,
  putStudent,
  deleteStudent,
};
