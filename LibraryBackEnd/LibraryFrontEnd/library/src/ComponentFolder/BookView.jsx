import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../CssFolder/BookView.css";
import SideBar from "./SideBar";

function BookView() {
  const [oneBook, setOneBook] = useState({});
  const { id } = useParams();

  //  Fetch BackEnd Data to View OneBook Details
  useEffect(() => {
    axios
      .post("http://localhost:5000/book/findOneBook/" + id)
      .then((response) => {
        setOneBook(response.data.findbook);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <>
      <SideBar />
      <div className="mainBookDiv">
        {/* BookView Code */}
        <Card className="mainCard">
          <Card.Img
            variant="top"
            className="cardImage"
            src={`http://localhost:5000/${oneBook?.image?.filename}`}
          />

          <Card.Body>
            <Card.Title>Book Name: {oneBook?.bookName}</Card.Title>
            <Card.Subtitle>Author Name: {oneBook?.authorName}</Card.Subtitle>
            <Card.Text>Description: {oneBook?.description}</Card.Text>
          </Card.Body>

          <Card.Body>
            <h5 style={{ color: "red" }}>BookPrice: $ {oneBook?.price}</h5>
            <h5>PubishedDate: {oneBook?.published}</h5>
            <br />
            <Card.Link href="/bookdetails">Back To Book Details</Card.Link>
           
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default BookView;
