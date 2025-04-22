import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

// Admin Routes
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import AddBook from "./AddBook";
import AdminProfile from "./AdminProfile";
import BookDetails from "./BookDetails";
import BookView from "./BookView";
import StudentList from "./StudentList";
import TeacherList from "./TeacherList";
import AdminViewStudentBookReq from "./AdminViewStudentBookReq";
import AdminViewTeacherBookReq from "./AdminViewTeacherBookReq";
import StudentView from "./StudentView";
import TeacherView from "./TeacherView";

// Student Routes
import StudentLogin from "./StudentLogin";
import StudentRegistration from "./StudentRegistration";
import StudentDboard from "./StudentDboard";
import OneStudentProfile from "./OneStudentProfile";
import ViewStudentProfile from "./ViewStudentProfile";
import StudentViewAvailableBooks from "./StudentViewAvailableBooks";

// Teacher Routes
import TeacherLogin from "./TeacherLogin";
import TeacherSignUp from "./TeacherSignUp";
import TeacherDashboard from "./TeacherDashboard";
import OneTeacherProfile from "./OneTeacherProfile";
import ViewTeacherProfile from "./ViewTeacherProfile";
import TeacherViewAvailableBooks from "./TeacherViewAvailableBooks";
import EditBook from "./EditBook";
import StudentIssuedBook from "./StudentIssuedBook";
import TeacherIssuedBook from "./TeacherIssuedBook";

function RouteHandle() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/adminlogin" element={<Login />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/bookdetails" element={<BookDetails />} />
          <Route path="/bookview/:id" element={<BookView />} />
          <Route path="/studentlist" element={<StudentList />} />
          <Route path="/teacherlist" element={<TeacherList />} />
          <Route path="/studentview/:id" element={<StudentView />} />
          <Route path="/teacherview/:id" element={<TeacherView />} />
          <Route path="/studentBookReq" element={<AdminViewStudentBookReq />} />
          <Route path="/teacherBookReq" element={<AdminViewTeacherBookReq />} />
          <Route path="/editbook/:id" element={<EditBook />} />

          {/* Student Routes */}
          <Route path="/studentlogin" element={<StudentLogin />} />
          <Route
            path="/studentregistration"
            element={<StudentRegistration />}
          />
          <Route path="/studentdashboard" element={<StudentDboard />} />
          <Route path="/editstudentprofile" element={<OneStudentProfile />} />
          <Route
            path="/viewStudentProfile/:id"
            element={<ViewStudentProfile />}
          />
          <Route
            path="/studentViewAvailableBooks"
            element={<StudentViewAvailableBooks />}
          />
          <Route path="/studentIssuedBook" element={<StudentIssuedBook />} />

          {/* Teacher Routes */}
          <Route path="/teacherlogin" element={<TeacherLogin />} />

          <Route path="/teachersignup" element={<TeacherSignUp />} />
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />
          <Route path="/editteacherprofile" element={<OneTeacherProfile />} />
          <Route
            path="/viewTeacherProfile/:id"
            element={<ViewTeacherProfile />}
          />
          <Route
            path="/teacherViewAvailableBooks"
            element={<TeacherViewAvailableBooks />}
          />
          <Route path="/teacherIssuedBook" element={<TeacherIssuedBook />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouteHandle;
