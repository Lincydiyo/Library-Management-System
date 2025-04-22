import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFolder/AddBook.css";
import axios from "axios";
import SideBar from "./SideBar";
import { ToastContainer, toast } from "react-toastify";

function AddBook() {
  const [bookAdd, setBookAdd] = useState({
    bookName: "",
    authorName: "",
    price: "",
    description: "",
    published: "",
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

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
      .post("http://localhost:5000/book/bookRegister", formData)
      .then((result) => {
        toast.success(result.data.Message);
        setTimeout(() => {
          navigate("/bookdetails");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          setErrorMessage(
            error.response.data.Message || "Something went wrong."
          );
        } else {
          setErrorMessage("Server not responding.");
        }
      });
  };

  return (
    <>
      <SideBar />
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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button type="submit">Add Book</button>
        <a href="/admindashboard">Go Back</a>
      </form>
      <ToastContainer />
    </>
  );
}

export default AddBook;
