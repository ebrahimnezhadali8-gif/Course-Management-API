const StudentModel = require("../models/student-model");
const EnrollmentModel = require("../models/enrollment-model");
// function test form email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

const getStudents = (req, res) => {
  StudentModel.getStudents().then((result) => {
    res.send(result);
  });
};
const postStudent = (req, res) => {
  const { name, email } = req.body;
  //Checking the existence of the name or not less than three characters
  if (!name || name.length < 3) {
    return res.status(404).send("name and email is required!");
  }
  // checking
  const emailValue = validateEmail(email);
  if (!emailValue) {
    return res.status(404).send("name and email is required!");
  }
  StudentModel.insertStudent(name, email).then((result) => {
    res.send(`Added student successfully name :${name} email:${email}`);
  });
};
const putStudent = (req, res) => {
  let { name, email } = req.body;
  //checking name
  if (name === undefined || name === "") {
    name = null;
  } else if (name.length < 3) {
    return res.status(400).send("Name must be at least 3 characters!");
  }
  //checking email
  if (email === undefined || email === "") {
    email = null;
  } else if (!validateEmail(email)) {
    return res.status(400).send("Invalid email format!");
  }

  StudentModel.updateStudent(req.params.id, name, email).then((result) => {
    res.send(result);
  });
};
const deleteStudent = (req, res) => {
  StudentModel.getstudent(req.params.id).then((result) => {
    if (!result) return res.status(404).send("student whith id not found");
  });
  //check table Enrollments
  EnrollmentModel.getEnrollmentStudent(req.params.id).then((result) => {
    if (result)
      return res
        .status(409)
        .send("Cannot delete student. They are enrolled in a course.");
  });
  StudentModel.deleteStudent(req.params.id).then((result) => {
    res.send(`student with id : ${req.params.id} deleted`);
  });
};

module.exports = {
  getStudents,
  postStudent,
  putStudent,
  deleteStudent,
};
