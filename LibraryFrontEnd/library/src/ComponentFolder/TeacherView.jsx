import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "../CssFolder/ProfileView.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideBar from "./SideBar";

function TeacherView() {
  const [oneTeacher, setOneTeacher] = useState({});
  const { id } = useParams();

  const findOneTeacher = () => {
    axios
      .post("http://localhost:5000/teacher/findOneTeacher/" + id)
      .then((response) => {
        setOneTeacher(response.data.finddata);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(findOneTeacher, [id]);
  return (
    <>
      <SideBar />
      <div className="MainProfileDiv">
        {/* TeacherView Code  */}
        <Card className="OnePersonViewCard">
          <Row>
            <Col xs={12} md={5} lg={5}>
              <Card.Img
                variant="top"
                src={`http://localhost:5000/${oneTeacher?.image?.filename}`}
              />
            </Col>
            <Col xs={12} md={7} lg={7} className="Cardbody">
              <Card.Body className="Cardbody">
                <h3>Name: {oneTeacher?.name}</h3>
                <h5>Email: {oneTeacher.email}</h5>
                <h5>Department: {oneTeacher?.department}</h5>
                <h6>Phoneno: {oneTeacher.phoneno}</h6>
                <br />
                <Card.Link href="/teacherlist">Back To Teacher List</Card.Link>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default TeacherView;
