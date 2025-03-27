import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CssFolder/AddBook.css";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { GiBookAura } from "react-icons/gi";
import Container from "react-bootstrap/Container";
import Footer from "./Footer";

function AddBook() {
  const [bookAdd, setBookAdd] = useState({
    bookName: "",
    authorName: "",
    price: "",
    description: "",
    published: "",
    image: null,
  });
  const navigate = useNavigate();

  // Handle Change Code
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setBookAdd({ ...bookAdd, [e.target.name]: e.target.files[0] });
    } else {
      setBookAdd({ ...bookAdd, [e.target.name]: e.target.value });
    }
  };

  // Handle Add Book Code
  const handleAddBook = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bookName", bookAdd.bookName);
    formData.append("authorName", bookAdd.authorName);
    formData.append("price", bookAdd.price);
    formData.append("description", bookAdd.description);
    formData.append("published", bookAdd.published);
    formData.append("image", bookAdd.image);

    axios
      .post("http://localhost:5000/bookRegister", formData)
      .then((result) => {
        alert(result.data.Message);
        navigate("/bookdetails");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="maindivision">
        {/* Navbar Code  */}
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
          {/* Form To AddBook  */}
          <form className="addbookdiv" onSubmit={handleAddBook}>
            <h2>Add Books to Library</h2>

            <input
              type="text"
              name="bookName"
              id="bookName"
              placeholder="Enter book name"
              value={bookAdd.bookName}
              onChange={handleChange}
              required
              autoComplete="on"
            />
            <input
              type="text"
              name="authorName"
              id="authorName"
              placeholder="Enter author name"
              value={bookAdd.authorName}
              onChange={handleChange}
              required
              autoComplete="on"
            />
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Enter Book Price"
              value={bookAdd.price}
              onChange={handleChange}
              required
              autoComplete="on"
            />
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Enter the Description"
              value={bookAdd.description}
              onChange={handleChange}
              required
              autoComplete="on"
            />
            <input
              type="date"
              name="published"
              id="published"
              value={bookAdd.published}
              onChange={handleChange}
              required
              autoComplete="on"
            />
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              required
              className="fileInput"
            />

            <button type="submit">Add Book</button>
            <a href="/admindashboard" className="goback">
              Go Back
            </a>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default AddBook;
