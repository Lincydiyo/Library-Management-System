import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "../CssFolder/ProfileView.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideBar from "./SideBar";

function StudentView() {
  const [oneStudent, setOneStudent] = useState({});
  const { id } = useParams();

  const findOneStudent = () => {
    axios
      .post("https://library-backend-plyq.onrender.com/user/findOneStudent/" + id)
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
      {/* Navbar Code */}
      <SideBar />
      <div className="MainProfileDiv">
        {/* StudentView Code */}
        <Card className="OnePersonViewCard">
          <Row>
            <Col xs={12} md={5} lg={5}>
              <Card.Img
                variant="top"
                src={`https://library-backend-plyq.onrender.com/${oneStudent?.image?.filename}`}
              />
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
                <Card.Link href="/studentlist">Back To Student List</Card.Link>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default StudentView;
