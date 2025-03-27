import React from "react";
import TeacherNav from "./TeacherNav";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../CssFolder/ViewAvailableBooks.css";

function TeacherViewAvailableBooks() {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/findBook/")
      .then((response) => {
        setAllBooks(response.data.finddata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // HandleBookRequests
  const handleBookReq = (book) => {
    const teacherId = localStorage.getItem("teacherId");
    const bookId = book?._id;

    if (!teacherId || !bookId) {
      alert("Error : Missing teacherId Or BookId");
      return;
    }

    if (teacherId === bookId) {
      alert("You Already Request this Book.");
      return;
    }

    //Sending Request to the BackEnd
    axios
      .post("http://localhost:5000/teacherBookRequest", { teacherId, bookId })
      .then((response) => {
        console.log(response.data.message);
        alert(response.data.message);
      })
      .catch((error) => {
        alert("You Already Request this Book.");
      });
  };
  return (
    <>
      <div className="maindivision">
        <TeacherNav />

        {allBooks.length > 0 ? (
          <div className="homediv">
            <Container>
              <h2 style={{ marginTop: "3%" }}>View Available Books</h2>

              <Row className="g-4">
                {allBooks.map((book, index) => (
                  <Col key={index} xs={12} sm={6} md={4} lg={3}>
                    <Card className="bookCard">
                      <div className="cardImg">
                        <Card.Img
                          variant="top"
                          src={`http://localhost:5000/${book?.image?.filename}`}
                          alt={book.title}
                          className="card-img"
                        />
                      </div>
                      <Card.Body>
                        <Card.Title className="cardTitle">
                          {book.bookName}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          Author: {book.autherName}
                          <br />
                          Published: {book.published}
                          <br />
                          <span className="priceTag">
                            Book Price : ${book.price}
                          </span>
                        </Card.Subtitle>

                        <Button
                          type="button"
                          className="viewButton"
                          onClick={() => handleBookReq(book)}
                        >
                          Request to Admin
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        ) : (
          <p className="no-books-message">
            No Books Available. Please Try Again!
          </p>
        )}

        <Footer />
      </div>
    </>
  );
}

export default TeacherViewAvailableBooks;
