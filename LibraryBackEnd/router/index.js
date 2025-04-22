const express = require("express");
const route = express.Router();

const bookRoutes = require("./bookRoute");
const studentRoutes = require("./studentRoute");
const teacherRoutes = require("./teacherRoute");
const studentBookReqRoute=require("./studentBookReqRoute")
const teacherBookReqRoute=require("./teacherBookReqRoute")

route.use("/book", bookRoutes);
route.use("/student", studentRoutes);
route.use("/teacher", teacherRoutes);
route.use("/studentBookReqRoute",studentBookReqRoute)
route.use("/teacherBookReqRoute",teacherBookReqRoute)

module.exports = route;
