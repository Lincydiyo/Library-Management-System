import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CssFolder/SideBar.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { GiBookAura } from "react-icons/gi";
import { useNavigate, Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoBookOutline } from "react-icons/io5";
import { FaUserEdit, FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GoIssueClosed } from "react-icons/go";

function TeacherSideBar() {
  const navigate = useNavigate();
  const [oneTeacher, setOneTeacher] = useState({});
  const id = localStorage.getItem("teacherId");

  useEffect(() => {
    axios
      .post(`http://localhost:5000/user/findOneTeacher/${id}`)
      .then((response) => {
        setOneTeacher(response.data.finddata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // LogOut Teacher
  const HandleLogOut = () => {
    localStorage.removeItem("teacherId");
    localStorage.removeItem("teacherName");
    localStorage.removeItem("teacherImage");
    localStorage.removeItem("token");
    navigate("/teacherlogin");
  };

  return (
    <>
      {/* Navbar for small screens with Offcanvas */}
      <Navbar expand="lg" className="mainNavbar">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="text-white">
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
                    src={`http://localhost:5000/${oneTeacher?.image?.filename}`}
                    alt="profileImg"
                    width={30}
                    height={30}
                  />
                  <h4>
                    Welcome, <br />
                    {oneTeacher?.name}
                  </h4>
                </div>

                <ul className="navlist">
                  <li>
                    <LuLayoutDashboard style={{ fontSize: "23px" }} />
                    <Link to="/teacherdashboard">Teacher Dashboard</Link>
                  </li>
                  <li>
                    <IoBookOutline style={{ fontSize: "23px" }} />
                    <Link to="/teacherViewAvailableBooks">Available Books</Link>
                  </li>
                  <li>
                    <GoIssueClosed style={{ fontSize: "23px" }} />
                    <Link to="/teacherIssuedBook">Issued Book</Link>
                  </li>
                  <li>
                    <FaUser style={{ fontSize: "23px" }} />
                    <Link to={`/viewTeacherProfile/${id}`}>View Profile</Link>
                  </li>
                  <li>
                    <FaUserEdit style={{ fontSize: "23px" }} />
                    <Link to="/editteacherprofile">Edit Profile</Link>
                  </li>
                  <li>
                    <BiLogOut style={{ fontSize: "23px" }} />
                    <Link to="/teacherlogin" onClick={HandleLogOut}>
                      Logout
                    </Link>
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
            src={`http://localhost:5000/${oneTeacher?.image?.filename}`}
            alt="profileImg"
            width={30}
            height={30}
          />
          <h4>
            Welcome, <br />
            {oneTeacher?.name}
          </h4>
        </div>

        <ul className="navlist">
          <li>
            <LuLayoutDashboard style={{ fontSize: "23px" }} />
            <Link to="/teacherdashboard">Teacher Dashboard</Link>
          </li>
          <li>
            <IoBookOutline style={{ fontSize: "23px" }} />
            <Link to="/teacherViewAvailableBooks">Available Books</Link>
          </li>
          <li>
            <GoIssueClosed style={{ fontSize: "23px" }} />
            <Link to="/teacherIssuedBook">Issued Book</Link>
          </li>
          <li>
            <FaUser style={{ fontSize: "23px" }} />
            <Link to={`/viewTeacherProfile/${id}`}>View Profile</Link>
          </li>
          <li>
            <FaUserEdit style={{ fontSize: "23px" }} />
            <Link to="/editteacherprofile">Edit Profile</Link>
          </li>
          <li>
            <BiLogOut style={{ fontSize: "23px" }} />
            <Link to="/teacherlogin" onClick={HandleLogOut}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default TeacherSideBar;
