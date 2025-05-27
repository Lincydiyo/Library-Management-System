import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFolder/AddBook.css";
import axios from "axios";
import SideBar from "./SideBar";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

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
    const formattedDate = moment(bookAdd.published).format("DD-MM-YYYY");
    const formData = new FormData();
    formData.append("bookName", bookAdd.bookName);
    formData.append("authorName", bookAdd.authorName);
    formData.append("price", bookAdd.price);
    formData.append("description", bookAdd.description);
    formData.append("published", formattedDate);
    formData.append("image", bookAdd.image);

    axios
      .post("http://localhost:5000/book/bookRegister", formData)
      .then((result) => {
        toast.success(result.data.message, {
          onClose: () => navigate("/bookdetails"),
        });
      })

      .catch((error) => {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Registration failed. Please try again.");
        }
      });
  };

  return (
    <>
      <SideBar />
      {/* Form To AddBook  */}
      <form className="addbookdiv" onSubmit={handleAddBook}>
        <h2>Add Books to Library</h2>
        <label htmlFor="bookName">BookName: </label>
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
        <label htmlFor="authorName">Author Name:  </label>

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
        <label htmlFor="price">BookPrice: </label>

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
        <label htmlFor="description">Description: </label>

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
        <label htmlFor="published">Pubished Date: </label>

        <input
          type="date"
          name="published"
          id="published"
          value={bookAdd.published}
          onChange={handleChange}
          required
          autoComplete="on"
        />
        <label htmlFor="image">Book Image: </label>

        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="fileInput"
        />

        <button type="submit">Add Book</button>
        <a href="/admindashboard">Go Back</a>
      </form>
      <ToastContainer />
    </>
  );
}

export default AddBook;
