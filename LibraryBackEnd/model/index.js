const BookController=require("./bookSchema");
const StudentController=require("./studentSchema");
const TeacherController=require("./teacherSchema");
const StudentBookRequest=require("./studentBookReqSchema");
const TeacherBookRequest=require("./teacherBookReqSchema");


module.exports={
    BookController,
    StudentController,
    TeacherController,
    StudentBookRequest,
    TeacherBookRequest
}