const coursesModule = require("../models/course-model");

const getcourse = (req, res) => {
  coursesModule.getCourse(parseInt(req.params.id)).then((result) => {
    if (!result) res.status(404).send("courses whith id not found");
    res.send(result);
  });
  //const course =courses.find(c => c.id === Number(req.params.id))//parseInt
};
module.exports = {
  getcourse,
};
