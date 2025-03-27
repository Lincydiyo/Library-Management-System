import { React, useState, useEffect } from "react";
import { GiBookAura } from "react-icons/gi";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Footer from "./Footer";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { TiTick } from "react-icons/ti";
import { TiDelete } from "react-icons/ti";

function AdminViewStudentBookReq() {
  const [bookRequests, setBookRequests] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/findAllStudentRequest")
      .then((response) => {
        setBookRequests(response.data.RequestBook);
        console.log(response.data.RequestBook);
      })
      .catch((error) => {
        console.error("Error fetching book requests:", error);
      });
  }, []);

  // Handle Status
  const handleStatusChange = (requestId, status) => {
    axios
      .post("http://localhost:5000/studentUpdateBookRequestStatus", {
        requestId,
        status,
      })
      .then((response) => {
        alert(response.data.message); // Show success message
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
        alert("Failed to update status");
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
                <Nav.Link as={Link} to="/admindashboard">
                  BackToAdminDashBoard
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Table Create To View All StudentRequestBooks  */}
        {bookRequests.length > 0 ? (
          <>
            <div className="tablediv">
              <Table>
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
                            <button
                              onClick={() =>
                                handleStatusChange(request._id, "Approved")
                              }
                              className="btn btn-success"
                            >
                              <TiTick style={{ fontSize: "25px" }} />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(request._id, "Rejected")
                              }
                              className="btn btn-danger"
                              style={{ marginLeft: "10px" }}
                            >
                              <TiDelete style={{ fontSize: "25px" }} />
                            </button>
                          </>
                        )}
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
            No BookRequests Found. Please Try Again!
          </p>
        )}
        <Footer />
      </div>
    </>
  );
}

export default AdminViewStudentBookReq;
