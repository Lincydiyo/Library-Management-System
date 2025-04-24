const BookController=require("./bookSchema");
const User=require("./userSchema")
const StudentBookRequest=require("./studentBookReqSchema");
const TeacherBookRequest=require("./teacherBookReqSchema");


module.exports={
    BookController,
    User,
    StudentBookRequest,
    TeacherBookRequest
}