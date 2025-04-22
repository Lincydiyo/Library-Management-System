const express = require("express");
const route = express.Router();
const studentBookReqController = require("../controller/studentBookReqController");
const validate = require("../middleware/validation.middleware.js");
const {
  studentBookReqValidations,
} = require("../validations/studentReq.validation.js");

// Student Book Request
route.post(
  "/studentBookRequest",
  validate(studentBookReqValidations),
  studentBookReqController.studentReq
);
route.post(
  "/findAllStudentRequest",
  studentBookReqController.findAllStudentReq
);
route.post(
  "/studentUpdateBookRequestStatus",
  studentBookReqController.studentUpdateBookRequestStatus
);
route.post("/studentReturnBook", studentBookReqController.returnBook);
route.post(
  "/findParticularStudentRequests",
  studentBookReqController.findParticularStudentRequests
);

module.exports = route;
