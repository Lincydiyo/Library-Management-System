const express = require("express");
const route = express.Router();
const teacherController = require("../controller/teacherController");
const validate = require("../middleware/validation.middleware.js");

const {
  registerTeacherSchema,
  loginTeacherSchema,
  updateTeacherSchema,
} = require("../validations/teacher.validation.js");

route.post(
  "/teacherSignup",
  teacherController.upload,
  validate(registerTeacherSchema),
  teacherController.teacherSignUp
);
route.post(
  "/teacherLogin",
  validate(loginTeacherSchema),
  teacherController.teacherLogin
);
route.post(
  "/updateTeacher/:id",
  validate(updateTeacherSchema),
  teacherController.updateTeacher
);
route.post("/findTeacher", teacherController.findTeacher);
route.post("/deleteTeacher/:id", teacherController.deleteTeacher);
route.post("/findOneTeacher/:id", teacherController.findOneTeacher);


module.exports = route;
