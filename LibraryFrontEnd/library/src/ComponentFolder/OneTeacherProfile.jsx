import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TeacherSideBar from "./TeacherSideBar";
import "../CssFolder/Edit.css";
import { ToastContainer, toast } from "react-toastify";

function OneTeacherProfile() {
  const [oneTeacher, setOneTeacher] = useState([]);
  const [updateTeacher, setUpdateTeacher] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const id = localStorage.getItem("teacherId");
  const navigate = useNavigate();

  // FindOneTeacher
  const OneTeacher = () => {
    axios
      .post("http://localhost:5000/user/findOneTeacher/" + id)
      .then((response) => {
        setOneTeacher(response.data.finddata);
        setUpdateTeacher(response.data.finddata);
      })
      .catch((error) => console.log(error));
  };
  useEffect(OneTeacher, [id]);

  // ChangeValue
  const changeValue = (e) => {
    setUpdateTeacher({ ...updateTeacher, [e.target.name]: e.target.value });
  };

  // HandleUpdate
  const updateHandle = () => {
    axios
      .post(`http://localhost:5000/user/updateUser/${id}`, updateTeacher)
      .then((response) => {
        toast.success(response.data.message);
        setUpdateTeacher(response.data.update);

        setTimeout(() => {
          navigate("/teacherdashboard");
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
      <TeacherSideBar />
      {oneTeacher ? (
        <section className="editDiv">
          <img
            src={`http://localhost:5000/${oneTeacher?.image?.filename}`}
            alt="profileimg"
            style={{
              height: "auto",
              width: "130px",
              borderRadius: "100px",
              marginBottom: "30px",
              objectFit: "fill",
            }}
          />
          <label htmlFor="name">
            UserName:
            <input
              type="text"
              defaultValue={oneTeacher.name}
              id="name"
              name="name"
              autoComplete="on"
              onChange={changeValue}
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              defaultValue={oneTeacher.email}
              id="email"
              name="email"
              autoComplete="on"
              onChange={changeValue}
            />
          </label>

          <label htmlFor="department">
            Department:
            <input
              type="text"
              defaultValue={oneTeacher.department}
              id="department"
              name="department"
              autoComplete="on"
              onChange={changeValue}
            />
          </label>
          <label htmlFor="phoneno">
            Phone Number:
            <input
              type="number"
              defaultValue={oneTeacher.phoneno}
              id="phoneno"
              name="phoneno"
              autoComplete="on"
              onChange={changeValue}
            />
          </label>
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
          Teacher Not Found
        </p>
      )}
      <ToastContainer />
    </>
  );
}

export default OneTeacherProfile;
