import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentSideBar from "./StudentSideBar";
import "../CssFolder/Edit.css";
import { ToastContainer, toast } from "react-toastify";

function OneStudentProfile() {
  const [oneStudent, setOneStudent] = useState([]);
  const [updateStudent, setUpdateStudent] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const id = localStorage.getItem("studentId");
  const navigate = useNavigate();

  //   FindOneStudent
  const OneStudent = () => {
    axios
      .post("http://localhost:5000/user/findOneStudent/" + id)
      .then((response) => {
        setOneStudent(response.data.finddata);
        setUpdateStudent(response.data.finddata);
      })
      .catch((error) => console.log(error));
  };
  useEffect(OneStudent, [id]);

  //   ChangeValue
  const changeValue = (e) => {
    setUpdateStudent({ ...updateStudent, [e.target.name]: e.target.value });
  };

  // HandleUpdate
  const updateHandle = () => {
    axios
      .post(`http://localhost:5000/user/updateUser/${id}`, updateStudent)
      .then((response) => {
        toast.success(response.data.message);
        setUpdateStudent(response.data.update);

        setTimeout(() => {
          navigate("/studentdashboard");
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
      <StudentSideBar />

      {oneStudent ? (
        <section className="editDiv">
          <img
            src={`http://localhost:5000/${oneStudent?.image?.filename}`}
            alt="profileimg"
            style={{
              height: "auto",
              width: "130px",
              borderRadius: "100px",
              marginBottom: "30px",
              objectFit: "fill",
            }}
          />

          <label htmlFor="name">UserName : </label>

          <input
            type="text"
            defaultValue={oneStudent.name}
            id="name"
            name="name"
            autoComplete="on"
            onChange={changeValue}
          />
          <label htmlFor="email">Email : </label>

          <input
            type="text"
            defaultValue={oneStudent.email}
            id="email"
            name="email"
            autoComplete="on"
            onChange={changeValue}
          />
          <label htmlFor="password">Password: </label>

          <input
            type="text"
            defaultValue={oneStudent.password}
            id="password"
            name="password"
            autoComplete="on"
            onChange={changeValue}
          />
          <label htmlFor="dob">DOB : </label>

          <input
            type="date"
            defaultValue={oneStudent.dob}
            id="dob"
            name="dob"
            autoComplete="on"
            onChange={changeValue}
          />
          <label htmlFor="department">Department : </label>

          <input
            type="text"
            defaultValue={oneStudent.department}
            id="department"
            name="department"
            autoComplete="on"
            onChange={changeValue}
          />
          <label htmlFor="phoneno">PhoneNumber : </label>

          <input
            type="text"
            defaultValue={oneStudent.phoneno}
            id="phoneno"
            name="phoneno"
            autoComplete="on"
            onChange={changeValue}
          />
          <label htmlFor="semester">Semester : </label>

          <input
            type="text"
            defaultValue={oneStudent.semester}
            id="semester"
            name="semester"
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

export default OneStudentProfile;
