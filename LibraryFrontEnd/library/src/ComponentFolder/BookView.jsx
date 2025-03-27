import React, { useEffect, useState } from "react";
import { GiBookAura } from "react-icons/gi";
import Footer from "./Footer";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../CssFolder/BookView.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function BookView() {
  const [oneBook, setOneBook] = useState({});
  const { id } = useParams();

  //  Fetch BackEnd Data to View OneBook Details
  useEffect(() => {
    axios
      .post("http://localhost:5000/findOneBook/" + id)
      .then((response) => {
        setOneBook(response.data.findbook);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
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
          {/* BookView Code */}
          <Card className="mainCard">
            <Card.Img
              variant="top"
              className="cardImage"
              src={`http://localhost:5000/${oneBook?.image?.filename}`}
            />

            <Card.Body>
              <Card.Title>Book Name: {oneBook?.bookName}</Card.Title>
              <Card.Subtitle>Author Name: {oneBook?.authorName}</Card.Subtitle>
              <Card.Text>Description: {oneBook?.description}</Card.Text>
            </Card.Body>

            <Card.Body>
              <h5>BookPrice: {oneBook?.price}</h5>
              <h5>PubishedDate: {oneBook?.published}</h5>
              <br />
              <Card.Link href="/bookdetails">Back To Book Details</Card.Link>
              <Card.Link href="/addbook">Add Books</Card.Link>
            </Card.Body>
          </Card>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default BookView;
