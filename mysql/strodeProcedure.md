# Description of the procedures


# courses
+ get_courses() :   Getting the list of courses with a course id entry that displays all courses if it is null;
+ craete_course() :  Adding a new lesson by the admin with the entries name and description where the description can be null;
+ update_course()  : Courses are updated by the admin, which has id and name and description entries, which may not be name and description, + and the previous value remains, and each of them can be changed;
+ delete_course()  :  Deleting a lesson by admin ;

---

# student
+ get_student_by_course()  :  Get students with a specific course with course_id and student_id ;
+ get_courses_student() : Getting the list courses in one student ;
+ enroll_student_to_course() :  Register a door for the student ;
+ delete_student_course() : Delete a course for a student ;

---

# teacher
+ get_teacher_course_and_student() :  Getting the list of courses of a teacher or all teachers along with the students of those courses ;
+ get_teacher_by_course() : Getting list courses in one teacher ;
+ create_teacher_course() :  Registration of a lesson for the teacher ;
+ delete_teacher_course() :  Delete a course for a teacher ;

---

# user
+ get_user_by_email() :  Get a user by email ;
+ get_user_id() :  Get a user with id ;
+ get_users() :  Getting list users ;
+ create_user() : Add a new user or register ;
+ update_user_me() :  Update user information (name, email and password) by himself ;
+ update_user_admin() :  Update role user by admin ;
+ delete_user() : Delete user by admin

---
# Important note: 
Of course, deleting is not recommended. In order to avoid deleting important information, it is tried not to be deleted in the project, and other methods are used.