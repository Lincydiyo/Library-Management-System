import React, { useEffect, useState } from "react";
import "../CssFolder/TableDetails.css";
import { RiDeleteBinFill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { toast, ToastContainer } from "react-toastify";

function BookDetails() {
  const [bookDetail, setBookDetail] = useState([]);
  const navigate = useNavigate();

  // BackEnd Connect to View AllBook On the Page load
  useEffect(() => {
    axios
      .post("https://library-backend-plyq.onrender.com/book/findBook/")
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
  const handleEdit = (id) => {
    navigate("/editbook/" + id);
  };
  // Delete BookDetails
  const handleDelete = (id) => {
    axios
      .post("https://library-backend-plyq.onrender.com/book/deleteBook/" + id)
      .then((response) => {
        console.log("Response:", response);
        console.log("Response Data Message:", response?.data?.message);
        if (response.data?.message === "Book Deleted Successfully") {
          setBookDetail(bookDetail.filter((book) => book._id !== id));
          toast.success("Book Deleted Successfully ");
        } else {
          toast.error(" Book not deleted. Unexpected message.");
        }
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
        toast.error(" Failed to delete Book.");
      });
  };

  return (
    <>
      <SideBar />
      <ToastContainer />
      {bookDetail.length > 0 ? (
        <>
          <div className="tabledetails">
            <h2>All Book Details</h2>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Book Image</th>
                  <th>Book Name</th>
                  <th>Author Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Published Date</th>
                  <th>BookView</th>
                  <th>Edit Book</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {bookDetail.map((books, index) => (
                  <tr key={books._id || index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`https://library-backend-plyq.onrender.com/${books?.image?.filename}`}
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
                        className="tableviewbtn"
                        onClick={() => handleView(books._id)}
                      >
                        view
                      </button>
                    </td>
                    <td>
                      <CiEdit
                        style={{ color: "red", fontSize: 30 }}
                        onClick={() => handleEdit(books._id)}
                      />
                    </td>
                    <td>
                      <RiDeleteBinFill
                        style={{ color: "red", fontSize: 30 }}
                        onClick={() => handleDelete(books._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      )}
    </>
  );
}

export default BookDetails;
