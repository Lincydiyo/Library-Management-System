import React from "react";
import { Row, Col } from "react-bootstrap";
import StudentNav from "./StudentNav";
import Footer from "./Footer";
import "../CssFolder/LandingPage.css";
import { Link } from "react-router-dom";


function StudentDboard() {
  // State to manage student name dynamically
  const studentName = localStorage.getItem("studentName");

  return (
    <div className="maindivision">
      <StudentNav />
      <div className="homediv">
        <h1>Hello👋 {studentName}, Welcome to the Library.</h1>

          <Row xs={1} md={1} lg={1}>
            <Col>
              <div className="landingDiv">
                <section className="landingPage">
                  <h3>Welcome to Your Personal Library Dashboard</h3>
                  <p >
                    Welcome to your personal library dashboard! Here, you can
                    easily access a variety of resources, discover new books,
                    browse, borrow, and manage your library account—all in one
                    place. Whether you need textbooks, research papers, or
                    novels, everything is just a click away. We're here to help
                    you succeed with your academic and reading journey!
                  </p>
                </section>
                <section className="landingPage">
                  <h3>Efficient Academic Resource Management</h3>
                  <p >
                    Our library system is designed to help you manage your
                    academic needs efficiently. You can quickly find textbooks,
                    view reading recommendations, and explore a variety of
                    resources.
                  </p>
                </section>
                <section className="landingPage">
                  <h3>Explore Our Vast Collection</h3>
                  <p >
                    Whether you're looking for your next favorite read or need
                    reference material for your studies, our library has
                    everything you need. Explore our vast collection and start
                    your learning journey today!
                  </p>
                </section>
              </div>
            </Col>
          </Row>
      
        <button type="button" className="landingBtn">
            <Link to="/studentViewAvailableBooks"> Browse Books</Link>
          </button>
      </div>
      <Footer />
    </div>
  );
}

export default StudentDboard;
