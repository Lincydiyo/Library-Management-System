const express = require("express");
const route = express.Router();
const userController = require("../controller/userController");
const validate = require("../middleware/validation.middleware");
const {
  registerStudentSchema,
  registerTeacherSchema,
  loginStudentSchema,
  loginTeacherSchema,
  updateStudentSchema,
  updateTeacherSchema
} = require("../validations/user.validation");

route.post(
  "/signup",
  userController.upload,
  (req, res, next) => {
    const role = req.body.role;

    if (role === "student") {
      return validate(registerStudentSchema)(req, res, next);
    } else if (role === "teacher") {
      return validate(registerTeacherSchema)(req, res, next);
    } else {
      return res
        .status(400)
        .json({ message: "Invalid role provided in signup" });
    }
  },
  userController.userSignUp
);

//  Login Route
route.post(
  "/login",
  (req, res, next) => {
    const role = req.body.role;

    if (role === "student") {
      return validate(loginStudentSchema)(req, res, next);
    } else if (role === "teacher") {
      return validate(loginTeacherSchema)(req, res, next);
    } else {
      return res
        .status(400)
        .json({ message: "Invalid role provided in login" });
    }
  },
  userController.userLogin
);

// Update Route

route.post(
  "/updateUser/:id", 
  userController.upload, 
  (req, res, next) => {
    const role = req.body.role;

    if (role === "student") {
      return validate(updateStudentSchema)(req, res, next);
    } else if (role === "teacher") {
      return validate(updateTeacherSchema)(req, res, next);
    } else {
      return res
        .status(400)
        .json({ message: "Invalid role provided for update" });
    }
  },
  userController.updateUser
);

route.post("/findStudents", userController.findStudents);
route.post("/findTeachers", userController.findTeachers);
route.post("/findOneStudent/:id", userController.findOneStudent);
route.post("/findOneTeacher/:id", userController.findOneTeacher);
route.post("/deleteUser/:id", userController.deleteUser);
route.post("/forgotpassword", userController.forgotPassword);
route.post("/resetpassword/:id/:token", userController.resetPassword);

module.exports = route;
