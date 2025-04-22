import { React, useState, useEffect } from "react";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { TiDelete } from "react-icons/ti";
import "../CssFolder/TableDetails.css";
import SideBar from "./SideBar";
import {  toast } from "react-toastify";

function AdminViewStudentBookReq() {
  const [bookRequests, setBookRequests] = useState([]);

  useEffect(() => {
    fetchBookRequests();
  }, []);

  const fetchBookRequests = () => {
    axios
      .post("http://localhost:5000/studentBookReqRoute/findAllStudentRequest")
      .then((response) => {
        const allRequests = response.data.RequestBook || [];

        //  Filter out returned books
        const filteredRequests = allRequests.filter((req) => !req.returnDate);

        setBookRequests(filteredRequests);
      })
      .catch((error) => {
        console.error("Error fetching book requests:", error);
      });
  };

  // Handle Status
  const handleStatusChange = (requestId, status) => {
    axios
      .post(
        "http://localhost:5000/studentBookReqRoute/studentUpdateBookRequestStatus",
        {
          requestId,
          status,
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        setBookRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId
              ? { ...request, status: response.data.updatedRequest.status }
              : request
          )
        );
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        toast.error("Failed to update status");
      });
  };

  return (
    <>
      <SideBar />
      {/* Table Create To View All StudentRequestBooks  */}
      {bookRequests.length > 0 ? (
        <>
          <div className="tabledetails">
            <h2>Student Book Request</h2>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>StudentName</th>
                  <th>BookImage</th>
                  <th>BookName</th>
                  <th>RequestDate</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {bookRequests.map((request, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>
                      {request.studentId ? request.studentId.name : "Unknown"}
                    </td>
                    <td>
                      <img
                        src={`http://localhost:5000/${request.bookId?.image?.filename}`}
                        alt="bookimg"
                      />
                    </td>
                    <td>
                      {request.bookId ? request.bookId.bookName : "Unknown"}
                    </td>
                    <td>
                      {new Date(request.requestDate).toLocaleDateString()}
                    </td>

                    <td>{request.status}</td>
                    <td>
                      {request.status === "Pending" && (
                        <>
                          <TiTick
                            style={{ fontSize: "35px", color: "green" }}
                            onClick={() =>
                              handleStatusChange(request._id, "Approved")
                            }
                          />

                          <TiDelete
                            style={{ fontSize: "35px", color: "red" }}
                            onClick={() =>
                              handleStatusChange(request._id, "Rejected")
                            }
                          />
                        </>
                      )}
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
          No BookRequests Found. Please Try Again!
        </p>
      )}
    </>
  );
}

export default AdminViewStudentBookReq;
