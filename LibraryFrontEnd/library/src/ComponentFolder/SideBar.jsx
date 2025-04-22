import React from "react";
import "../CssFolder/SideBar.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GiBookAura } from "react-icons/gi";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoMdAddCircleOutline } from "react-icons/io";
import { PiStudentFill, PiListDashesFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { FaBookReader } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

function SideBar({ adminName }) {
  return (
    <>
      {/* Navbar for small screens with Offcanvas */}
      <Navbar expand="lg" className="mainNavbar">
        <Container fluid>
          <Navbar.Brand href="#" className="text-white">
            <GiBookAura style={{ fontSize: 40, marginRight: "10px" }} />
            <b> Library </b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            className="bg-dark text-white"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel" className="text-white">
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <div className="sidebar">
                <div className="profileSection">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/009/383/461/original/man-face-clipart-design-illustration-free-png.png"
                    alt="profileImg"
                  />
                  <h4>
                    Welcome, <br />
                    {adminName ? adminName : "Admin"}
                  </h4>
                </div>

                <ul className="navlist">
                  <li>
                    <LuLayoutDashboard style={{ fontSize: "23px" }} />
                    <a href="/admindashboard">Admin Dashboard</a>
                  </li>
                  <li>
                    <IoMdAddCircleOutline style={{ fontSize: "23px" }} />
                    <a href="/addbook">Add Books</a>
                  </li>
                  <li>
                    <PiStudentFill style={{ fontSize: "23px" }} />
                    <a href="/studentlist">Student List</a>
                  </li>
                  <li>
                    <GiTeacher style={{ fontSize: "23px" }} />
                    <a href="/teacherlist">Teacher List</a>
                  </li>
                  <li>
                    <PiListDashesFill style={{ fontSize: "23px" }} />
                    <a href="/bookdetails">Book Details</a>
                  </li>
                 
                  <li>
                    <FaBookReader style={{ fontSize: "23px" }} />
                    <a href="/studentBookReq">Student Book Request</a>
                  </li>
                  <li>
                    <FaBookReader style={{ fontSize: "23px" }} />
                    <a href="/teacherBookReq">Teacher Book Request</a>
                  </li>
                  <li>
                    <BiLogOut style={{ fontSize: "23px" }} />
                    <a href="/adminlogin">Logout</a>
                  </li>
                </ul>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* Sidebar for large screens */}
      <div className="sidebar d-none d-lg-block">
        <div className="profileSection">
          <img
            src="https://static.vecteezy.com/system/resources/previews/009/383/461/original/man-face-clipart-design-illustration-free-png.png"
            alt="profileImg"
          />
          <h4>Welcome, {adminName ? adminName : "Admin"}</h4>
        </div>

        <ul className="navlist">
          <li>
            <LuLayoutDashboard style={{ fontSize: "23px" }} />
            <a href="/admindashboard">Admin Dashboard</a>
          </li>
          <li>
            <IoMdAddCircleOutline style={{ fontSize: "23px" }} />
            <a href="/addbook">Add Books</a>
          </li>
          <li>
            <PiStudentFill style={{ fontSize: "23px" }} />
            <a href="/studentlist">Student List</a>
          </li>
          <li>
            <GiTeacher style={{ fontSize: "23px" }} />
            <a href="/teacherlist">Teacher List</a>
          </li>
          <li>
            <PiListDashesFill style={{ fontSize: "23px" }} />
            <a href="/bookdetails">Book Details</a>
          </li>
          
          <li>
            <FaBookReader style={{ fontSize: "23px" }} />
            <a href="/studentBookReq">Student Book Request</a>
          </li>
          <li>
            <FaBookReader style={{ fontSize: "23px" }} />
            <a href="/teacherBookReq">Teacher Book Request</a>
          </li>
          <li>
            <BiLogOut style={{ fontSize: "23px" }} />
            <a href="/adminlogin">Logout</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;

