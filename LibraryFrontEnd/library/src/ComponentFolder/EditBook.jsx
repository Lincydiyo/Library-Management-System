import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../CssFolder/Edit.css";
import SideBar from "./SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditBook() {
  const [oneBook, setOneBook] = useState({});
  const { id } = useParams();
  const [updateBook, setUpdateBook] = useState({});
  const navigate = useNavigate();

  // Convert YYYY-MM-DD to DD-MM-YYYY
  const toDisplayFormat = (dateString) => {
    const [year, month, day] = dateString?.split("-");
    return `${day}-${month}-${year}`;
  };

  // Convert DD-MM-YYYY to YYYY-MM-DD (for input[type="date"])
  const toInputDateFormat = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };

  // Fetch one book
  useEffect(() => {
    axios
      .post(`https://library-backend-plyq.onrender.com/book/findOneBook/${id}`)
      .then((response) => {
        const book = response.data.findbook;

        const formattedBook = {
          ...book,
          published: toDisplayFormat(
            new Date(book.published).toISOString().split("T")[0]
          ),
        };

        setOneBook(formattedBook);
        setUpdateBook(formattedBook);
      })
      .catch((error) => console.log(error));
  }, [id]);

  // Handle changes
  const changeValue = (e) => {
    let { name, value } = e.target;

    if (name === "published") {
      const [year, month, day] = value.split("-");
      value = `${day}-${month}-${year}`;
    }

    setUpdateBook({ ...updateBook, [name]: value });
  };

  // Handle update
  const updateHandle = () => {
    axios
      .post(`https://library-backend-plyq.onrender.com/book/updateBooks/${id}`, updateBook)
      .then((response) => {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/bookdetails");
        }, 3000);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Update failed. Please try again."
        );
      });
  };

  return (
    <>
      <SideBar />
      <ToastContainer />
      {updateBook ? (
        <section className="editDiv">
          <img
            src={`https://library-backend-plyq.onrender.com/${oneBook?.image?.filename}`}
            alt="BookImage"
            style={{
              height: "auto",
              width: "130px",
              marginBottom: "30px",
              objectFit: "fill",
            }}
          />

          <label htmlFor="bookName">Book Name:</label>
          <input
            type="text"
            value={updateBook.bookName || ""}
            name="bookName"
            onChange={changeValue}
          />

          <label htmlFor="authorName">Author Name:</label>
          <input
            type="text"
            value={updateBook.authorName || ""}
            name="authorName"
            onChange={changeValue}
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            value={updateBook.description || ""}
            name="description"
            onChange={changeValue}
          />

          <label htmlFor="price">Book Price:</label>
          <input
            type="number"
            value={updateBook.price || ""}
            name="price"
            onChange={changeValue}
          />

          <label htmlFor="published">Published Date:</label>
          <input
            type="date"
            value={toInputDateFormat(updateBook.published) || ""}
            name="published"
            onChange={changeValue}
          />

          <button type="button" onClick={updateHandle}>
            Edit
          </button>

          <Card.Link href="/bookdetails">Back To Book Details</Card.Link>
          <Card.Link href="/addbook">Add Books</Card.Link>
        </section>
      ) : (
        <p style={{ fontSize: 30, textAlign: "center", margin: "100px 0" }}>
          Book Not Found
        </p>
      )}
    </>
  );
}

export default EditBook;
