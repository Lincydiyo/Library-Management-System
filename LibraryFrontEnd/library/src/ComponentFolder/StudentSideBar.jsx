import React from "react";
import "../CssFolder/SideBar.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { GiBookAura } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoBookOutline } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GoIssueClosed } from "react-icons/go";

function StudentSideBar() {
  const navigate = useNavigate();
  const studentName = localStorage.getItem("studentName");
  const studentImage = localStorage.getItem("studentImage");
  // LogOut Student
  const HandleLogOut = () => {
    localStorage.removeItem("studentId");
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentImage");
    localStorage.removeItem("token");
    navigate("/studentlogin");
  };
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
                    src={`http://localhost:5000/${studentImage}`}
                    alt="profileImg"
                    width={30}
                    height={30}
                  />
                  <h4>
                    Welcome, <br />
                    {studentName}
                  </h4>
                </div>
                <ul className="navlist">
                  <li>
                    <LuLayoutDashboard style={{ fontSize: "23px" }} />
                    <a href="/studentdashboard">Student Dashboard</a>
                  </li>
                  <li>
                    <IoBookOutline style={{ fontSize: "23px" }} />
                    <a href="/studentViewAvailableBooks">Available Books</a>
                  </li>
                  <li>
                    <GoIssueClosed style={{ fontSize: "23px" }} />
                    <a href="/studentIssuedBook">Issued Book</a>
                  </li>
                  <li>
                    <FaUser style={{ fontSize: "23px" }} />
                    <a
                      href={`/viewStudentProfile/${localStorage.getItem(
                        "studentId"
                      )}`}
                    >
                      View Profile
                    </a>
                  </li>
                  <li>
                    <FaUserEdit style={{ fontSize: "23px" }} />
                    <a href="/editstudentprofile">Edit Profile</a>
                  </li>
                  <li>
                    <BiLogOut style={{ fontSize: "23px" }} />
                    <a href="/studentlogin" onClick={HandleLogOut}>
                      Logout
                    </a>
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
            src={`http://localhost:5000/${studentImage}`}
            alt="profileImg"
            width={30}
            height={30}
          />
          <h4>
            Welcome, <br />
            {studentName}
          </h4>
        </div>
        <ul className="navlist">
          <li>
            <LuLayoutDashboard style={{ fontSize: "23px" }} />
            <a href="/studentdashboard">Student Dashboard</a>
          </li>
          <li>
            <IoBookOutline style={{ fontSize: "23px" }} />
            <a href="/studentViewAvailableBooks">Available Books</a>
          </li>
          <li>
            <GoIssueClosed style={{ fontSize: "23px" }} />
            <a href="/studentIssuedBook">Issued Book</a>
          </li>
          <li>
            <FaUser style={{ fontSize: "23px" }} />
            <a
              href={`/viewStudentProfile/${localStorage.getItem("studentId")}`}
            >
              View Profile
            </a>
          </li>
          <li>
            <FaUserEdit style={{ fontSize: "23px" }} />
            <a href="/editstudentprofile">Edit Profile</a>
          </li>
          <li>
            <BiLogOut style={{ fontSize: "23px" }} />
            <a href="/studentlogin" onClick={HandleLogOut}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default StudentSideBar;
