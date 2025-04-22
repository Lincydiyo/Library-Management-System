import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../CssFolder/ViewAvailableBooks.css";
import StudentSideBar from "./StudentSideBar";
import { ToastContainer, toast } from "react-toastify";

function StudentViewAvailableBooks() {
  const [allBooks, setAllBooks] = useState([]);
  const [requestedBookIds, setRequestedBookIds] = useState([]);
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    if (!studentId) return;
    // Fetch All available books
    axios
      .post("http://localhost:5000/book/findBook/")
      .then((response) => setAllBooks(response.data.finddata))
      .catch(() => console.log("Failed to load books"));

    // Fetch Student already requested books
    axios
      .post(
        "http://localhost:5000/studentBookReqRoute/findParticularStudentRequests",
        {
          studentId,
        }
      )
      .then((res) => {
        const alreadyRequested = res.data.RequestBook.filter(
          (req) => !req.returnDate
        ).map((req) => req.bookId._id);
        setRequestedBookIds(alreadyRequested);
      })
      .catch(() => console.log("Failed to fetch student requests"));
  }, [studentId]);

  // HandleBookRequests
  const handleBookReq = (book) => {
    const bookId = book?._id;

    if (!studentId || !bookId) {
      alert("Error: Missing Student ID or Book ID");
      return;
    }

    axios
      .post("http://localhost:5000/studentBookReqRoute/studentBookRequest", {
        studentId,
        bookId,
      })
      .then((response) => {
        toast.success(response.data.message);
        setRequestedBookIds((prev) => [...prev, bookId]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <StudentSideBar />
      {allBooks.length > 0 ? (
        <div className="availableBookCard">
          <Container>
            <h2> Available Books</h2>
            <Row className="g-4">
              {allBooks.map((book, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={4}>
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
                        disabled={requestedBookIds.includes(book._id)}
                      >
                        {requestedBookIds.includes(book._id)
                          ? "Already Requested"
                          : "Request to Admin"}
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
      <ToastContainer />
    </>
  );
}

export default StudentViewAvailableBooks;
