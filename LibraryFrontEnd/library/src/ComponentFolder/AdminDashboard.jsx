import React, { useEffect, useState } from "react";
import "../CssFolder/Dashboard.css";
import SideBar from "./SideBar";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { IoBookOutline } from "react-icons/io5";
import axios from "axios";

function AdminDashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);

  // Total Students
  useEffect(() => {
    axios
      .post("http://localhost:5000/user/findStudents/")
      .then((response) => {
        setTotalStudents(response.data.finddata.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Total Teachers
  useEffect(() => {
    axios
      .post("http://localhost:5000/user/findTeachers/")
      .then((response) => {
        setTotalTeachers(response.data.finddata.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Total Books
  useEffect(() => {
    axios
      .post("http://localhost:5000/book/findBook/")
      .then((respose) => {
        setTotalBooks(respose.data.finddata.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <SideBar />
      <div className="dashboardDiv">
        <h2>Admin Dashboard</h2>

        <div className="dashboardCardContainer">
          <div className="dashboardIconDiv">
            <PiStudentFill style={{ color: "#007bff", fontSize: "30px" }} />
            <h4>Total Students</h4>
            <p>{totalStudents}</p>
          </div>

          <div className="dashboardIconDiv">
            <GiTeacher style={{ color: "#28a745", fontSize: "30px" }} />
            <h4>Total Teachers</h4>
            <p>{totalTeachers}</p>
          </div>

          <div className="dashboardIconDiv">
            <IoBookOutline style={{ color: "#ffc107", fontSize: "30px" }} />
            <h4>Total Books</h4>
            <p>{totalBooks}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
