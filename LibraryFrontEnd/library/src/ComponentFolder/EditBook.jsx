import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../CssFolder/Edit.css";
import SideBar from "./SideBar";
import { ToastContainer, toast } from "react-toastify";

function EditBook() {
  const [oneBook, setOneBook] = useState({});
  const { id } = useParams();
  const [updateBook, setUpdateBook] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  //  Fetch BackEnd Data to View OneBook Details
  useEffect(() => {
    axios
      .post("http://localhost:5000/book/findOneBook/" + id)
      .then((response) => {
        setOneBook(response.data.findbook);
        setUpdateBook(response.data.findbook);
      })
      .catch((error) => console.log(error));
  }, [id]);
  //   ChangeValue
  const changeValue = (e) => {
    setUpdateBook({ ...updateBook, [e.target.name]: e.target.value });
  };

  // HandleUpdate
  const updateHandle = () => {
    axios
      .post("http://localhost:5000/book/updateBooks/" + id, updateBook)
      .then((response) => {
        toast.success(response.data.message);
        setUpdateBook(response.data.update);
        setTimeout(() => {
          navigate("/admindashboard");
        }, 3000);
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Update failed. Please try again.");
        }
      });
  };

  return (
    <>
      <SideBar />
      {updateBook ? (
        <section className="editDiv">
          <img
            src={`http://localhost:5000/${oneBook?.image?.filename}`}
            alt="BookImage"
            style={{
              height: "auto",
              width: "130px",
              marginBottom: "30px",
              objectFit: "fill",
            }}
          />

          <label htmlFor="bookName">BookName : </label>

          <input
            type="text"
            defaultValue={oneBook?.bookName}
            id="bookName"
            name="bookName"
            autoComplete="on"
            onChange={changeValue}
          />
          <label htmlFor="authorName">Author Name: : </label>

          <input
            type="text"
            defaultValue={oneBook?.authorName}
            id="authorName"
            name="authorName"
            autoComplete="on"
            onChange={changeValue}
          />
          <label htmlFor="description">Description: </label>

          <input
            type="text"
            defaultValue={oneBook?.description}
            id="description"
            name="description"
            autoComplete="on"
            onChange={changeValue}
          />
          <label htmlFor="price">BookPrice: </label>

          <input
            type="number"
            defaultValue={oneBook?.price}
            id="price"
            name="price"
            autoComplete="on"
            onChange={changeValue}
          />
          <label htmlFor="published">PubishedDate: </label>

          <input
            type="date"
            defaultValue={oneBook?.published}
            id="published"
            name="published"
            autoComplete="on"
            onChange={changeValue}
          />
          {errorMessage && (
            <p
              style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}
            >
              {errorMessage}
            </p>
          )}
          <button type="button" onClick={updateHandle}>
            Edit
          </button>
          <Card.Link href="/bookdetails">Back To Book Details</Card.Link>
          <Card.Link href="/addbook">Add Books</Card.Link>
        </section>
      ) : (
        <p
          style={{
            fontSize: 30,
            textAlign: "center",
            marginTop: "100px",
            marginBottom: "100px",
          }}
        >
          Student Not Found
        </p>
      )}
      <ToastContainer />
    </>
  );
}

export default EditBook;
