require("dotenv").config();
const express = require("express");
const app = express();
const courseRouter = require("./router/course-router");
const authRouter = require("./router/auth-router");
const errorHandler = require("./middlware/error_handler");
const userRoute = require("./router/user_router");
const teacherRoute = require("./router/teacher_router");
const studentRouter = require("./router/student_course");

app.use(express.json());
app.use("/api/courses", courseRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRoute);
app.use("/api/teacher", teacherRoute);
app.use("/api/student", studentRouter);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Course Management API is running...");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server listen in port ${port} ...!`);
});
