const express = require("express");
const route = express.Router();
const studentDetails = require("../controller/studentController");
const teacherDetails = require("../controller/teacherController");
const bookDetails = require("../controller/bookController");
const studentBookReq = require("../controller/studentBookReqController");
const teacherBookReq = require("../controller/teacherBookReqController");

// StudentSignUp
route.post(
  "/studentSignup",
  studentDetails.upload,
  studentDetails.studentSignUp
);
// StudentLogin
route.post("/studentLogin", studentDetails.studentLogin);
// FindStudent
route.post("/findStudent", studentDetails.findStudent);
// DeleteStudent
route.post("/deleteStudent/:id", studentDetails.deleteStudent);
// FindOneStudent
route.post("/findOneStudent/:id", studentDetails.findOneStudent);
// UpdateStudent
route.post("/updateStudent/:id", studentDetails.updateStudent);
// TeacherSignUp
route.post(
  "/teacherSignup",
  teacherDetails.upload,
  teacherDetails.teacherSignUp
);
// TeacherLogin
route.post("/teacherLogin", teacherDetails.teacherLogin);
// FindTeacher
route.post("/findTeacher", teacherDetails.findTeacher);
// DeleteTeacher
route.post("/deleteTeacher/:id", teacherDetails.deleteTeacher);
// FindOneTeacher
route.post("/findOneTeacher/:id", teacherDetails.findOneTeacher);
// UpdateTeacher
route.post("/updateTeacher/:id", teacherDetails.updateTeacher);
// BookRegistration
route.post("/bookRegister", bookDetails.upload, bookDetails.bookRegister);
// FindBook
route.post("/findBook", bookDetails.findBook);
// FindOneBook
route.post("/findOneBook/:id", bookDetails.findOneBook);
// Delete Book
route.post("/deleteBook/:id", bookDetails.deleteBook);

// Student Book Request
route.post("/studentBookRequest", studentBookReq.studentReq);
route.post("/findAllStudentRequest", studentBookReq.findAllStudentReq);
route.post(
  "/studentUpdateBookRequestStatus",
  studentBookReq.studentUpdateBookRequestStatus
);

// Teacher Book Request
route.post("/teacherBookRequest", teacherBookReq.teacherReq);
route.post("/findAllTeacherRequest", teacherBookReq.findAllTeacherReq);
route.post(
  "/teacherUpdateBookRequestStatus",
  teacherBookReq.teacherUpdateBookRequestStatus
);

module.exports = route;
