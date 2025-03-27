import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAutoDelete } from "react-icons/md";
import "../CssFolder/StudentList.css";
import Footer from "./Footer";
import { GiBookAura } from "react-icons/gi";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function TeacherList() {
  const [alldata, setAllData] = useState([]);
  const navigate = useNavigate();

  //   BackEnd Data Connect to View All Teacher Details on the Page loading time 
  useEffect(() => {
    axios
      .post("http://localhost:5000/findTeacher/")
      .then((response) => {
        setAllData(response.data.finddata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // View Books
  const handleView = (id) => {
    navigate("/teacherview/" + id);
  };

  //   Delete Teacher Details
  const deleteTeacher = (id) => {
    axios
      .post("http://localhost:5000/deleteTeacher/" + id)
      .then((response) => {
        setAllData(alldata.filter((teacher) => teacher._id !== id));
        alert("Teacher Data Deleted Successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Teacher Data Deleted Failed. Please try again.");
      });
  };
  return (
    <div className="maindivision">
      {/* Navbar Code */}
      <Navbar variant="dark" expand="lg" className="mainNav">
        <Container fluid>
          <Navbar.Brand className="navbarBrand">
            <GiBookAura style={{ fontSize: 50, marginRight: "10px" }} />
            <b> MyLibrary </b>
          </Navbar.Brand>

          {/* Responsive toggle */}
          <Navbar.Toggle />

          <Navbar.Collapse className="navbarCollapse">
            <Nav className="miniNav">
              <Nav.Link as={Link} to="/admindashboard">
                BackToAdminDashBoard
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Table Create To View All Teacher Details */}
      {alldata.length > 0 ? (
        <>
          <div className="tablediv">
            <Table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>ProfileImage</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>PhoneNo</th>
                  <th>View Teacher</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {alldata.map((teacher, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`http://localhost:5000/${teacher?.image?.filename}`}
                        alt="profileimg"
                      />
                    </td>
                    <td>{teacher.name}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.department}</td>
                    <td>{teacher.phoneno}</td>
                    <td>
                      <button
                        type="button"
                        className="tablebtn"
                        onClick={() => handleView(teacher._id)}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="tabledltbtn"
                        onClick={() => deleteTeacher(teacher._id)}
                      >
                        <MdOutlineAutoDelete
                          style={{ color: "red", fontSize: 30 }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      ) : (
        <p
          style={{
            fontSize: 30,
            textAlign: "center",
            marginTop: "100px",
            marginBottom: "100px",
          }}

        >
          No Teacher Details Found. Please Try Again!
        </p>
      )}
      <Footer />
    </div>
  );
}

export default TeacherList;
