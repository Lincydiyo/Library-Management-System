import React from "react";
import { Row, Col } from "react-bootstrap";
import TeacherNav from "./TeacherNav";
import Footer from "./Footer";
import "../CssFolder/LandingPage.css";
import { Link } from "react-router-dom";

function TeacherDashboard() {
  // State to manage teacher name dynamically
  const teacherName = localStorage.getItem("teacherName");
  return (
    <>
      <div className="maindivision">
        <TeacherNav />

        <div className="homediv">
          <h1>Hello👋 {teacherName}, Welcome to the Library.</h1>

          <Row xs={1} md={1} lg={1}>
            <Col>
            <div className="landingDiv">
              <section className="landingPage">
                <h3>Welcome to Your Dashboard</h3>
                <p>
                  Welcome to your teacher's library dashboard! Here, you can
                  easily access a variety of resources, discover new books,
                  assign readings to students, and manage your library
                  account—all in one place. Whether you need textbooks, research
                  papers, or novels, everything is just a click away.
                </p>{" "}
              </section>
              <section className="landingPage">
              <h3>Manage Your Academic Resources</h3>
              <p >
                Our library system is designed to help you manage your academic
                needs efficiently. You can quickly find textbooks, view reading
                recommendations, and explore resources relevant to your courses.
              </p>
              </section>
             <section className="landingPage">
             <h3>Explore a Vast Collection</h3>
              <p >
                Whether you're looking for new books to assign to your students
                or need reference material for your lessons, our library has
                everything you need. Explore our vast collection and manage your
                reading assignments with ease!
              </p>
             </section>
             </div>
            </Col>
          </Row>

          <button type="button" className="landingBtn">
            <Link to="/teacherViewAvailableBooks"> Browse Books</Link>
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default TeacherDashboard;
