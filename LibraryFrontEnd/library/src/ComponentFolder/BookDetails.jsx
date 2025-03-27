import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import "../CssFolder/BookDetails.css";
import { RiDeleteBinFill } from "react-icons/ri";
import Table from "react-bootstrap/esm/Table";
import axios from "axios";
import { GiBookAura } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function BookDetails() {
  const [bookDetail, setBookDetail] = useState([]);
  const navigate = useNavigate();

  // BackEnd Connect to View AllBook On the Page load
  useEffect(() => {
    axios
      .post("http://localhost:5000/findBook/")
      .then((respose) => {
        setBookDetail(respose.data.finddata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // View Books
  const handleView = (id) => {
    navigate("/bookview/" + id);
  };

  // Delete BookDetails
  const handleDelete = (id) => {
    axios
      .post("http://localhost:5000/deleteBook/" + id)
      .then((response) => {
        setBookDetail(bookDetail.filter((book) => book._id !== id));
        alert("Book Deleted Successfully");
      })
      .catch((error) => {
        console.error("Error deleting Book:", error);
        alert("Failed to delete Book. Please try again.");
      });
  };
  
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
                <Nav.Link as={Link} to="/addbook">
                  Add Book
                </Nav.Link>

                <Nav.Link as={Link} to="/admindashboard">
                  BackToAdminDashBoard
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {bookDetail.length > 0 ? (
          <>
            <div className="bookdetails">
              <Table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Book Image</th>
                    <th>Book Name</th>
                    <th>Author Name</th>
                    <th>price</th>
                    <th>Description</th>
                    <th>Published Date</th>
                    <th>BookView</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {bookDetail.map((books, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                       
                        <img
                          src={`http://localhost:5000/${books?.image?.filename}`}
                          alt="bookimg"
                        />
                      </td>
                      <td>{books.bookName}</td>
                      <td>{books.authorName}</td>
                      <td>{books.price}</td>
                      <td>{books.description}</td>
                      <td>{books.published}</td>
                      <td>
                        <button
                          type="button"
                          className="viewButton"
                          onClick={() => handleView(books._id)}
                        >
                          view
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="dltButton"
                          onClick={() => handleDelete(books._id)}
                        >
                          <RiDeleteBinFill
                            style={{ color: "red", fontSize: 30 }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        ) : (
          <p
            style={{
              fontSize: 30,
              textAlign: "center",
              marginTop: "100px",
              marginBottom: "100px",
            }}
          >
            No Books Details Found. Please Try Again!
          </p>
        )}{" "}
        <Footer />
      </div>
    </>
  );
}

export default BookDetails;
