import "../CssFolder/ProfileView.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TeacherSideBar from "./TeacherSideBar";

function ViewTeacherProfile() {
  const [profile, setProfile] = useState({});
  const { id } = useParams();

  //  Fetch OneTeacherData from the backend
  useEffect(() => {
    axios
      .post("http://localhost:5000/teacher/findOneTeacher/" + id)
      .then((response) => {
        setProfile(response.data.finddata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <TeacherSideBar />

      <div className="MainProfileDiv">
        {/* TeacherView Code  */}
        <Card className="OnePersonViewCard">
          <Row>
            <Col xs={12} md={5} lg={5}>
              <Card.Img
                variant="top"
                src={`http://localhost:5000/${profile?.image?.filename}`}
              />
            </Col>
            <Col xs={12} md={7} lg={7} className="Cardbody">
              <Card.Body className="Cardbody">
                <h3>Name: {profile?.name}</h3>
                <h5>Email: {profile.email}</h5>
                <h5>Department: {profile?.department}</h5>
                <h6>Phoneno: {profile.phoneno}</h6>
                <br />
                <Card.Link href="/editteacherprofile">EditProfile</Card.Link>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default ViewTeacherProfile;
