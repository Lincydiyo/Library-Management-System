import React from "react";
import "../CssFolder/AdminDashboard.css";
import Navpage from "./Navpage";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function AdminDashboard({ adminName }) {
  return (
    <>
      <div className="maindivision">
        <Navpage />

        <div className="homediv">
          <div className="dashboard">
            <h2>Welcome, {adminName ? adminName : "Admin"}</h2>
            <button type="button">
              <Link to="/addbook">Add Book</Link>
            </button>
            <button type="button">
              <Link to="/bookdetails">Book Details</Link>
            </button>
            <button type="button"> Issued Book</button>
            <button type="button">
              <Link to="/studentlist">Student List</Link>
            </button>
            <button type="button">
              <Link to="/teacherlist">Teacher List</Link>
            </button>
            <button type="button">
              <Link to="/studentBookReq">Student BookRequests </Link>
            </button>
            <button type="button">
              <Link to="/teacherBookReq">Teacher BookRequests </Link>
            </button>
       
            <a href="/" className="goback">
              Go Back
            </a>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}

export default AdminDashboard;
