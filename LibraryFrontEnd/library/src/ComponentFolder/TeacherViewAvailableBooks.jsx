import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../CssFolder/ViewAvailableBooks.css";
import TeacherSideBar from "./TeacherSideBar";
import { toast } from "react-toastify";

function TeacherViewAvailableBooks() {
  const [allBooks, setAllBooks] = useState([]);
  const [requestedBookIds, setRequestedBookIds] = useState([]);
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    if (!teacherId) return;

    // Fetch all available books
    axios
      .post("https://library-backend-plyq.onrender.com/book/findBook/")
      .then((response) => {
        setAllBooks(response.data.finddata);
      })
      .catch(() => {
        toast.error("Failed to load books.");
      });

    // Fetch teacher's existing book requests
    axios
      .post(
        "https://library-backend-plyq.onrender.com/teacherBookReqRoute/findParticularTeacherRequests",
        { teacherId }
      )
      .then((res) => {
        const alreadyRequested = res.data.RequestBook.filter(
          (req) => !req.returnDate
        ).map((req) => req.bookId._id);

        setRequestedBookIds(alreadyRequested);
      })
      .catch(() => {
        toast.error("Failed to fetch your requested books.");
      });
  }, [teacherId]);

  const handleBookReq = (book) => {
    const bookId = book?._id;

    if (!teacherId || !bookId) {
      toast.error("Missing Teacher ID or Book ID.");
      return;
    }

    axios
      .post("https://library-backend-plyq.onrender.com/teacherBookReqRoute/teacherBookRequest", {
        teacherId,
        bookId,
      })
      .then((response) => {
        toast.success(response.data.message);
        setRequestedBookIds((prev) => [...prev, bookId]);
      })
      .catch(() => {
        toast.warning("You have already requested this book.");
      });
  };

  return (
    <>
      <TeacherSideBar />
      {allBooks.length > 0 ? (
        <div className="availableBookCard">
          <Container>
            <h2>Available Books</h2>
            <Row className="g-4">
              {allBooks.map((book, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={4}>
                  <Card className="bookCard">
                    <div className="cardImg">
                      <Card.Img
                        variant="top"
                        src={`https://library-backend-plyq.onrender.com/${book?.image?.filename}`}
                        alt={book.bookName}
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
                          Book Price: ${book.price}
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
    </>
  );
}

export default TeacherViewAvailableBooks;
