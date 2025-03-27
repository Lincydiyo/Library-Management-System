import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GiBookAura } from "react-icons/gi";
import Footer from "./Footer";
import Card from "react-bootstrap/Card";
import "../CssFolder/StudentView.css";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function StudentView() {
  const [oneStudent, setOneStudent] = useState({});
  const { id } = useParams();

  const findOneStudent = () => {
    axios
      .post("http://localhost:5000/findOneStudent/" + id)
      .then((response) => {
        setOneStudent(response.data.finddata);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(findOneStudent, [id]);

  return (
    <>
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
        <div className="homediv">

          {/* StudentView Code */}
          <Card className="OnePersonViewCard">
            <Row>
              <Col xs={12} md={5} lg={5}>
                <Card.Img
                  variant="top"
                
                  src={`http://localhost:5000/${oneStudent?.image?.filename}`}
                />{" "}
                
              </Col>
              <Col xs={12} md={7} lg={7} className="Cardbody">
                <Card.Body>
                <h3> Name: {oneStudent?.name}</h3>
                  <h5>Email: {oneStudent.email}</h5>
                  <h5>Date Of Birth: {oneStudent.dob}</h5>
                  <h5>Department: {oneStudent?.department}</h5>
                  <h5>Semester: {oneStudent.semester}</h5>
                  <h6>Phoneno: {oneStudent.phoneno}</h6>

                  <br />
                  <Card.Link href="/studentlist">
                    Back To Student List
                  </Card.Link>
                </Card.Body>
              </Col>{" "}
            </Row>
          </Card>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default StudentView;
