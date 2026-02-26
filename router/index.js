const express = require("express");
const route = express.Router();

const bookRoutes = require("./bookRoute");
const userRoutes = require("./userRoute");
const studentBookReqRoute=require("./studentBookReqRoute")
const teacherBookReqRoute=require("./teacherBookReqRoute")

route.use("/book", bookRoutes);
route.use("/user",userRoutes)
route.use("/studentBookReqRoute",studentBookReqRoute)
route.use("/teacherBookReqRoute",teacherBookReqRoute)

module.exports = route;
