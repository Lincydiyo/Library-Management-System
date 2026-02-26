const express = require("express");
const route = express.Router();
const teacherBookReqController = require("../controller/teacherBookReqController");
const validate = require("../middleware/validation.middleware.js");
const {
  teacherBookReqValidations,
} = require("../validations/teacherReq.validation.js");

// Teacher Book Request
route.post(
  "/teacherBookRequest",
  validate(teacherBookReqValidations),
  teacherBookReqController.teacherReq
);
route.post(
  "/findAllTeacherRequest",
  teacherBookReqController.findAllTeacherReq
);
route.post(
  "/teacherUpdateBookRequestStatus",
  teacherBookReqController.teacherUpdateBookRequestStatus
);
route.post("/teacherReturnBook", teacherBookReqController.returnBook);
route.post(
  "/findParticularTeacherRequests",
  teacherBookReqController.findParticularTeacherRequests
);

module.exports = route;
