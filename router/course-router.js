const express = require("express");
const router = express.Router();
const courseController = require("../controller/course-controller");

router.get("/:id", courseController.getcourse);
router.get("/", courseController.getCourses);
router.post("/", courseController.postCourse);
router.put("/:id", courseController.putCourse);
router.delete("/:id", courseController.deleteCourses);

module.exports = router;
