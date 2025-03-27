import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import StudentNav from "./StudentNav";

function OneStudentProfile() {
  const [oneStudent, setOneStudent] = useState([]);
  const [updateStudent, setUpdateStudent] = useState([]);
  const id = localStorage.getItem("studentId");
  const navigate = useNavigate();

  //   FindOneStudent
  const OneStudent = () => {
    axios
      .post("http://localhost:5000/findOneStudent/" + id)
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
      .post("http://localhost:5000/updateStudent/" + id, updateStudent)
      .then((response) => {
        alert(response.data.message);
        setUpdateStudent(response.data.update);
        navigate("/studentdashboard");
      })
      .catch((error) => error);
  };
  
  return (
    <div className="maindivision">
      <StudentNav />
      <div className="homediv">
        {oneStudent ? (
          <section className="signup">
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

            <label htmlFor="name">
              UserName :{" "}
              <input
                type="text"
                placeholder={oneStudent.name}
                id="name"
                name="name"
                autoComplete="on"
                onChange={changeValue}
              />
            </label>
            <label htmlFor="email">
              Email :{" "}
              <input
                type="text"
                placeholder={oneStudent.email}
                id="email"
                name="email"
                autoComplete="on"
                onChange={changeValue}
              />
            </label>
            <label htmlFor="password">
              Password:
              <input
                type="text"
                placeholder={oneStudent.password}
                id="password"
                name="password"
                autoComplete="on"
                onChange={changeValue}
              />
            </label>
            <label htmlFor="dob">
              DOB :{" "}
              <input
                type="date"
                placeholder={oneStudent.dob}
                id="dob"
                name="dob"
                autoComplete="on"
                onChange={changeValue}
              />
            </label>
            <label htmlFor="department">
              Department :{" "}
              <input
                type="text"
                placeholder={oneStudent.department}
                id="department"
                name="department"
                autoComplete="on"
                onChange={changeValue}
              />
            </label>
            <label htmlFor="phoneno">
              PhoneNumber :{" "}
              <input
                type="number"
                placeholder={oneStudent.phoneno}
                id="phoneno"
                name="phoneno"
                autoComplete="on"
                onChange={changeValue}
              />
            </label>
            <label htmlFor="semester">
              Semester :{" "}
              <input
                type="text"
                placeholder={oneStudent.semester}
                id="semester"
                name="semester"
                autoComplete="on"
                onChange={changeValue}
              />
            </label>
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
      </div>
      <Footer />
    </div>
  );
}

export default OneStudentProfile;
