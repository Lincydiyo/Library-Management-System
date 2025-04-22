import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFolder/Nav.css";
import axios from "axios";
import "../CssFolder/TableDetails.css";
import { MdOutlineAutoDelete } from "react-icons/md";
import SideBar from "./SideBar";
import {  toast } from "react-toastify";

function StudentList() {
  const [alldata, setAllData] = useState([]);
  const navigate = useNavigate();

  //   BackEnd Data Connect to View All Students Details on the Page loading time

  useEffect(() => {
    axios
      .post("http://localhost:5000/student/findStudent/")
      .then((response) => {
        setAllData(response.data.finddata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // View Student
  const handleView = (id) => {
    navigate("/studentview/" + id);
  };

  //   Delete Student Details
  const deleteStudent = (id) => {
    axios
      .post("http://localhost:5000/student/deleteStudent/" + id)
      .then(() => {
        setAllData(alldata.filter((student) => student._id !== id));
        toast.success("Student Data Deleted Successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Student Data Deleted Failed. Please try again.");
      });
  };
  return (
    <>
      <SideBar />
      {alldata.length > 0 ? (
        <div className="tabledetails">
          <h2>All Student Details</h2>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>ProfileImage</th>
                <th>Name</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Department</th>
                <th>PhoneNo</th>
                <th>View Student</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {alldata.map((student, index) => (
                <tr key={student._id || index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/${student?.image?.filename}`}
                      alt="profileimg"
                    />
                  </td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.dob}</td>
                  <td>{student.department}</td>
                  <td>{student.phoneno}</td>
                  <td>
                    <button
                      type="button"
                      className="tableviewbtn"
                      onClick={() => handleView(student._id)}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <MdOutlineAutoDelete
                      style={{ color: "red", fontSize: 30 }}
                      onClick={() => deleteStudent(student._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data-message">
          No Students Details Found. Please Try Again!
        </p>
      )}
    </>
  );
}

export default StudentList;
