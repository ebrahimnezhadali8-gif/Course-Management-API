require("dotenv").config();
const express = require("express");
const app = express();
const courseRouter = require("./router/course-router");
const studentRouter = require("./router/student-router");
const enrollmentRouter =require("./router/enrollment-router");

app.use(express.json());
app.use("/api/courses", courseRouter);
app.use("/api/students", studentRouter);
app.use("/api/enrollment" , enrollmentRouter);

app.get("/", (req, res) => {
  res.send("Course Management API is running...");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server listen in port ${port} ...!`);
});
