const express = require("express");
const route = express.Router();
const studentController = require("../controller/studentController");
const validate = require("../middleware/validation.middleware.js");


const {
  registerStudentSchema,
  loginStudentSchema,
  updateStudentSchema,
} = require("../validations/student.validation.js");

route.post(
  "/studentSignup",
  studentController.upload,
  validate(registerStudentSchema),
  studentController.studentSignUp
);
route.post(
  "/studentLogin",
  validate(loginStudentSchema),
  studentController.studentLogin
);
route.post(
  "/updateStudent/:id",
  validate(updateStudentSchema),
  studentController.updateStudent
);
route.post("/findStudent", studentController.findStudent);
route.post("/deleteStudent/:id", studentController.deleteStudent);
route.post("/findOneStudent/:id", studentController.findOneStudent);

module.exports = route;
