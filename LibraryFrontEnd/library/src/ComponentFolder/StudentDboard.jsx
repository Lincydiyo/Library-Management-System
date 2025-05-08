import React, { useEffect, useState } from "react";
import StudentSideBar from "./StudentSideBar";
import "../CssFolder/Dashboard.css";
import { IoBookOutline } from "react-icons/io5";
import axios from "axios";

function StudentDboard() {
  const [borrowedBooks, setBorrowedBooks] = useState(0);
  const [pendingBooks, setPendingBooks] = useState(0);
  const [rejectedBooks, setRejectedBooks] = useState(0);

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");

    axios
      .post("http://localhost:5000/studentBookReqRoute/findParticularStudentRequests", {
        studentId,
      })
      .then((response) => {
        const allRequests = response.data.RequestBook || [];

        const borrowed = allRequests.filter(
          (r) => r.status === "Approved" && !r.returnDate
        ).length;
        const pending = allRequests.filter(
          (r) => r.status === "Pending"
        ).length;
        const rejected = allRequests.filter(
          (r) => r.status === "Rejected"
        ).length;

        setBorrowedBooks(borrowed);
        setPendingBooks(pending);
        setRejectedBooks(rejected);
      })
      .catch((error) => {
        console.log("Error fetching dashboard data:", error);
      });
  }, []);

  return (
    <>
      <StudentSideBar />
      <div className="dashboardDiv">
        <h2>Student Dashboard</h2>
        <div className="dashboardCardContainer">
          <div className="dashboardIconDiv">
            <IoBookOutline style={{ color: "green", fontSize: "30px" }} />
            <h4>Borrowed Books</h4>
            <p>{borrowedBooks}</p>
          </div>
          <div className="dashboardIconDiv">
            <IoBookOutline style={{ color: "#ffc107", fontSize: "30px" }} />
            <h4>Pending Book Requests</h4>
            <p>{pendingBooks}</p>
          </div>
          <div className="dashboardIconDiv">
            <IoBookOutline style={{ color: "red", fontSize: "30px" }} />
            <h4>Rejected Books</h4>
            <p>{rejectedBooks}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentDboard;
