const express = require("express");
const router = express.Router();
const studentController = require('../controller/student-controller')

router.get("/",studentController.getStudents);
router.post("/",studentController.postStudent);
router.put("/:id",studentController.putStudent);
router.delete("/:id",studentController.deleteStudent);

module.exports = router;
