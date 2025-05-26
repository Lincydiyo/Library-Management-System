import { React, useState, useEffect } from "react";
import axios from "axios";
import TeacherSideBar from "../ComponentFolder/TeacherSideBar";
import {  toast } from "react-toastify";

function TeacherIssuedBook() {
  const [issuedBooks, setIssuedBooks] = useState([]);

  useEffect(() => {
    fetchIssuedBooks();
  }, []);
  const fetchIssuedBooks = () => {
    const teacherId = localStorage.getItem("teacherId");

    axios
      .post(
        "https://library-backend-plyq.onrender.com/teacherBookReqRoute/findParticularTeacherRequests",
        {
          teacherId,
        }
      )
      .then((response) => {
        setIssuedBooks(response.data.RequestBook);
      })
      .catch((error) => {
        console.error("Error fetching teacher requests:", error);
      });
  };

  const handleReturn = (requestId) => {
    axios
      .post("https://library-backend-plyq.onrender.com/teacherBookReqRoute/teacherReturnBook", {
        requestId,
      })
      .then((response) => {
        toast.success(response.data.message);
        // Remove the returned book from the current list
        fetchIssuedBooks();
      })
      .catch((error) => {
        console.error("Return error:", error);
      });
  };
  return (
    <>
      <TeacherSideBar />
      <div className="tabledetails">
        <h2>Issued Books</h2>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Book Name</th>
              <th>Book Image</th>
              <th>Issue Date</th>
              <th>Return Date</th>
              <th>Fine</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {issuedBooks.filter(
              (issued) => issued.status === "Approved" && !issued.returnDate
            ).length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", color: "gray" }}>
                  No Book Issued
                </td>
              </tr>
            ) : (
              issuedBooks
                .filter(
                  (issued) => issued.status === "Approved" && !issued.returnDate
                )
                .map((issued, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {issued.bookId ? issued.bookId.bookName : "Unknown"}
                    </td>
                    <td>
                      <img
                        src={`https://library-backend-plyq.onrender.com/${issued.bookId?.image?.filename}`}
                        alt="bookimg"
                        style={{ width: "50px", height: "70px" }}
                      />
                    </td>
                    <td>{new Date(issued.requestDate).toLocaleDateString()}</td>
                    <td>
                      {new Date(
                        new Date(issued.requestDate).getTime() +
                          1 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString()}
                    </td>
                    <td>{issued.fine || 0}</td>
                    <td>{issued.status}</td>
                    <td>
                      <button
                        type="button"
                        className="tableviewbtn"
                        onClick={() => handleReturn(issued._id)}
                      >
                        Return Book
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TeacherIssuedBook;
