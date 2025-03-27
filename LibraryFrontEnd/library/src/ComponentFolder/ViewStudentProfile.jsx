import React, { useEffect, useState } from "react";
import StudentNav from "./StudentNav";
import Footer from "./Footer";
import "../CssFolder/StudentView.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function ViewStudentProfile() {
  const [Profile, setProfile] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .post("http://localhost:5000/findOneStudent/" + id)
      .then((response) => {
        setProfile(response.data.finddata);
      
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <div className="maindivision">
     
        <StudentNav />
        <div className="homediv">
          {/* StudentView Code */}
        <Card className="OnePersonViewCard">
        <Row>
              <Col xs={12} md={5} lg={5}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/${Profile?.image?.filename}`}
                />{" "}
              </Col>
              <Col xs={12} md={7} lg={7} className="Cardbody">
                <Card.Body className="Cardbody">
                  <h3>Name: {Profile?.name}</h3>
                  <h5>Email: {Profile.email}</h5>
                  <h5>Department: {Profile?.department}</h5>
                  <h6>Phoneno: {Profile.phoneno}</h6>
                  <br />
                  <Card.Link href="/editstudentprofile">
                    EditProfile
                  </Card.Link>
                </Card.Body>
              </Col>
            </Row>
            </Card>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ViewStudentProfile;
