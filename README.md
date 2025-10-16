# Course-Management-API

This project is a Node.js + Express + MySQL mini application for managing courses and students. It demonstrates how to build a modular backend structure with RESTful APIs and MySQL stored procedures.

---

Features >>
Course Management :
_ Add, update, delete, and view courses
_ Each course has a name, description, and creation date
Student Management:
_ Add and view students
_ Each student has a unique UUID, name, and email
Enrollments:
_ Students can be enrolled in courses using a MySQL stored procedure
_ Retrieve all courses a student is enrolled in

---

Tech Stack >>
Backend: Node.js, Express.js
Database: MySQL
ORM: MySQL2 with Promise Pool
Environment Config: dotenv
Architecture: Modular (router, controller, utilities, models )
Unique ID Generator: uuid

---

Goal >>
The goal of this project is to learn backend structure, MySQL stored procedures, and API design in a practical way.
Later, it can be expanded into a full system for managing students, teachers, and courses
