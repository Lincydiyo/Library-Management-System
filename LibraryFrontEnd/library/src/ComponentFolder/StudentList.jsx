import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFolder/Nav.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "../CssFolder/StudentList.css";
import { MdOutlineAutoDelete } from "react-icons/md";
import Footer from "./Footer";
import { GiBookAura } from "react-icons/gi";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function StudentList() {
  const [alldata, setAllData] = useState([]);
  const navigate = useNavigate();

  //   BackEnd Data Connect to View All Students Details on the Page loading time

  useEffect(() => {
    axios
      .post("http://localhost:5000/findStudent/")
      .then((response) => {
        setAllData(response.data.finddata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // View Student
  const handleView = (id) => {
    navigate("/studentview/" + id);
  };

  //   Delete Student Details
  const deleteStudent = (id) => {
    axios
      .post("http://localhost:5000/deleteStudent/" + id)
      .then((response) => {
        setAllData(alldata.filter((student) => student._id !== id));
        alert("Student Data Deleted Successfully!");
      })
      .catch((error) => {
        console.log(error);
        alert("Student Data Deleted Failed. Please try again.");
      });
  };

  return (
    <div className="maindivision">
      {/* Navbar  */}
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
      {/* Table Create To View All Student Details */}
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
                  <th>DOB</th>
                  <th>Department</th>
                  <th>PhoneNo</th>
                  <th>View Student</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {alldata.map((student, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`http://localhost:5000/${student?.image?.filename}`}
                        alt="profileimg"
                      />
                    </td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.dob}</td>
                    <td>{student.department}</td>
                    <td>{student.phoneno}</td>
                    <td>
                      <button
                        type="button"
                        className="tablebtn"
                        onClick={() => handleView(student._id)}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="tabledltbtn"
                        onClick={() => deleteStudent(student._id)}
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
          No Students Details Found. Please Try Again!
        </p>
      )}
      <Footer />
    </div>
  );
}

export default StudentList;
