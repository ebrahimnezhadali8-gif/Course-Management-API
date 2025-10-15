require('dotenv').config();
const express = require('express');
const app = express();
const courseRouter = require("./router/course-router");

app.use(express.json());
app.use("/api/courses" , courseRouter)

app.get('/',(req,res)=>{
    res.send("Course Management API is running...")
});
 
const port = process.env.PORT || 3000;
 
 app.listen(port , ()=>{
    console.log(`server listen in port ${port} ...!`)
 });