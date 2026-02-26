import React from "react";
import { Link } from "react-router-dom";
import "../CssFolder/SideBar.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GiBookAura, GiTeacher } from "react-icons/gi";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoMdAddCircleOutline } from "react-icons/io";
import { PiStudentFill, PiListDashesFill } from "react-icons/pi";
import { FaBookReader } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

function SideBar({ adminName }) {
  return (
    <>
      {/* Navbar for small screens */}
      <Navbar expand="lg" className="mainNavbar">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="text-white">
            <GiBookAura style={{ fontSize: 40, marginRight: "10px" }} />
            <b>Library</b>
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
                    {adminName || "Admin"}
                  </h4>
                </div>
                <ul className="navlist">
                  <li>
                    <LuLayoutDashboard style={{ fontSize: "23px" }} />
                    <Link to="/admindashboard">Admin Dashboard</Link>
                  </li>
                  <li>
                    <IoMdAddCircleOutline style={{ fontSize: "23px" }} />
                    <Link to="/addbook">Add Books</Link>
                  </li>
                  <li>
                    <PiStudentFill style={{ fontSize: "23px" }} />
                    <Link to="/studentlist">Student List</Link>
                  </li>
                  <li>
                    <GiTeacher style={{ fontSize: "23px" }} />
                    <Link to="/teacherlist">Teacher List</Link>
                  </li>
                  <li>
                    <PiListDashesFill style={{ fontSize: "23px" }} />
                    <Link to="/bookdetails">Book Details</Link>
                  </li>
                  <li>
                    <FaBookReader style={{ fontSize: "23px" }} />
                    <Link to="/studentBookReq">Student Book Request</Link>
                  </li>
                  <li>
                    <FaBookReader style={{ fontSize: "23px" }} />
                    <Link to="/teacherBookReq">Teacher Book Request</Link>
                  </li>
                  <li>
                    <BiLogOut style={{ fontSize: "23px" }} />
                    <Link to="/adminlogin">Logout</Link>
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
          <h4>Welcome, {adminName || "Admin"}</h4>
        </div>
        <ul className="navlist">
          <li>
            <LuLayoutDashboard style={{ fontSize: "23px" }} />
            <Link to="/admindashboard">Admin Dashboard</Link>
          </li>
          <li>
            <IoMdAddCircleOutline style={{ fontSize: "23px" }} />
            <Link to="/addbook">Add Books</Link>
          </li>
          <li>
            <PiStudentFill style={{ fontSize: "23px" }} />
            <Link to="/studentlist">Student List</Link>
          </li>
          <li>
            <GiTeacher style={{ fontSize: "23px" }} />
            <Link to="/teacherlist">Teacher List</Link>
          </li>
          <li>
            <PiListDashesFill style={{ fontSize: "23px" }} />
            <Link to="/bookdetails">Book Details</Link>
          </li>
          <li>
            <FaBookReader style={{ fontSize: "23px" }} />
            <Link to="/studentBookReq">Student Book Request</Link>
          </li>
          <li>
            <FaBookReader style={{ fontSize: "23px" }} />
            <Link to="/teacherBookReq">Teacher Book Request</Link>
          </li>
          <li>
            <BiLogOut style={{ fontSize: "23px" }} />
            <Link to="/adminlogin">Logout</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
