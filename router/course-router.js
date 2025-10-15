const express = require('express');
const router = express.Router();
const courseController = require('../controller/course-controller');

router.get("/:id" ,courseController.getcourse);

router.get("/" , );

router.post("/" , );

router.put("/:id" , );

router.delete("/:id");

module.exports = router