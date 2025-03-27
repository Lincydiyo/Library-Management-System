import React from "react";
import Navpage from "./Navpage";
import Footer from "./Footer";
import "../CssFolder/About.css";
import UserRegImg from "../ImageFolder/userRegisterImg.jpg";
import BorrowBookImg from "../ImageFolder/BorrowBookImg.jpg";
import ReturnBookImg from "../ImageFolder/ReturnBookImg.svg";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import about1 from "../ImageFolder/about1.jpg";
import about2 from "../ImageFolder/about2.jpg";
import about3 from "../ImageFolder/about3.jpg";

function About() {
  return (
    <>
      <div className="maindivision">
        <Navpage />

        <Container>
          <h2 className="aboutheading"> About the Library Management System</h2>

          <Carousel data-bs-theme="dark">
            <Carousel.Item>
              <Row xs={1} md={1} lg={2}>
                <Col>
                  <img className="carouselImg" src={about1} alt="First slide" />
                </Col>
                <Col>
                  <p className="aboutPara">
                    Welcome to our Library Management System! We are dedicated
                    to providing easy access to a vast collection of books and
                    resources for students, professionals, and book lovers. Our
                    system is designed to streamline the process of borrowing,
                    returning, and managing library materials.
                  </p>
                </Col>
              </Row>
            </Carousel.Item>

            <Carousel.Item>
              <Row xs={1} md={1} lg={2}>
                <Col>
                  <img className="carouselImg" src={about2} alt="Third slide" />
                </Col>
                <Col>
                  <p className="aboutPara">
                    Our mission is to make information accessible and learning
                    enjoyable through a seamless and user-friendly digital
                    interface. Whether you're looking for textbooks, novels, or
                    research papers, our system helps you find exactly what you
                    need in no time.
                  </p>
                </Col>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row xs={1} md={1} lg={2}>
                <Col>
                  <img className="carouselImg" src={about3} alt="Third slide" />
                </Col>
                <Col>
                  <p className="aboutPara">
                    Thank you for choosing our Library Management System. We
                    hope you enjoy exploring our extensive collection and using
                    our platform to fulfill all your reading and educational
                    needs.
                  </p>
                </Col>
              </Row>
            </Carousel.Item>
          </Carousel>
        </Container>

        <Container>
          <h2 className="aboutheading">How its Work</h2>

          <div className="howWork">
            <div className="step">
              <img src={UserRegImg} alt="RegisterImage" />

              <h3>User Registration</h3>
              <p>Users can sign up and start borrowing books instantly.</p>
            </div>
            <div className="step">
              <img src={BorrowBookImg} alt="BookBorrowImg" />

              <h3>Book Borrowing</h3>
              <p>
                Books can be borrowed with a single click and are tracked for
                due dates.
              </p>
            </div>
            <div className="step">
              <img src={ReturnBookImg} alt="BookReturnImg" />

              <h3>Book Return</h3>
              <p>
                Once returned, books are updated automatically and overdue
                alerts are generated.
              </p>
            </div>
          </div>
        </Container>

        <Footer />
      </div>
    </>
  );
}

export default About;
