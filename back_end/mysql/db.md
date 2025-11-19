# Course Management API

A learning project for backend development with Node.js, MySQL, and Stored Procedures.  
This system allows administrators to manage courses, teachers, and students.

---

## Features
+ User authentication (Admin / Teacher / Student)  
+ Course management  
+ Student enrollment  
+ Teacher assignment  
+ Role-based access control (RBAC)  
+ RESTful API following best practices  
+ Secure password hashing (bcrypt)  
+ Database logic powered by Stored Procedures

---

## Database Schema

Table (users , courses , student_course ,teacher_course)

+ users : All users with specific roles 
+ courses : Course information 
+ course_student :  M:N relationship for students 
+ course_teacher : M:N relationship for teachers 

---

## How to Run

```bash
git clone https://github.com/ebrahimnezhadali8-gif/Course-Management-API.git
cd Course-Management-API
npm install
npm start
