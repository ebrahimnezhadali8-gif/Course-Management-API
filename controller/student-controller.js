const StudentModel = require("../models/student-model");
const EnrollmentModel = require("../models/enrollment-model");
const Joi = require("joi");
const _ = require("lodash");

const getStudents = (req, res) => {
  StudentModel.getStudents().then((result) => {
    res.send(result);
  });
};
const postStudent = async (req, res) => {
  const { name, email } = req.body;
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
  };
  const validateResult = Joi.object(schema).validate(req.body);
  if (validateResult.error)
    return res.send(validateResult.error.details[0].message);

  const student = await StudentModel.getStudentEmail(email);
  console.log(student);
  if (student) return res.status(400).send("email already registered");

  const result = await StudentModel.insertStudent(name, email);
  const newStudent = await StudentModel.getStudentEmail(email);
  res.send(_.pick(newStudent, ["name", "email", "date"]));
};
const putStudent = async (req, res) => {
  let { name, email } = req.body;
  //checking name
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().allow("").optional(),
  };
  const validateResult = Joi.object(schema).validate(req.body);
  if (validateResult.error)
    return res.send(validateResult.error.details[0].message);
  // check id
  const student = await StudentModel.getStudent(parseInt(req.params.id));
  if (!student) return res.status(404).send("student whith id not found");

  const result = await StudentModel.updateStudent(req.params.id, name, email);

  const upStudent = await StudentModel.getStudent(parseInt(req.params.id));
  res.send(_.pick(upStudent, ["name", "email", "date"]));
};
const deleteStudent = async (req, res) => {
  const student = await StudentModel.getStudent(req.params.id);
  if (!student) return res.status(404).send("student whith id not found");

  //check table Enrollments
  const enrollment = await EnrollmentModel.getEnrollmentStudent(req.params.id);
  if (enrollment[0]) {
    return res
      .status(409)
      .send("Cannot delete student. They are enrolled in a course.");
  }
  const deleted = await StudentModel.deleteStudent(req.params.id);
  res.send(`student with id : ${req.params.id} deleted`);
};

module.exports = {
  getStudents,
  postStudent,
  putStudent,
  deleteStudent,
};
