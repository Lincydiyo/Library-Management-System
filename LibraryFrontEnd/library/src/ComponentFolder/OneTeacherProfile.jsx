import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import TeacherNav from "./TeacherNav";

function OneTeacherProfile() {
  const [oneTeacher, setOneTeacher] = useState([]);
  const [updateTeacher, setUpdateTeacher] = useState([]);
  const id = localStorage.getItem("teacherId");
  const navigate = useNavigate();

  // FindOneTeacher
  const OneTeacher = () => {
    axios
      .post("http://localhost:5000/findOneTeacher/" + id)
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
      .post("http://localhost:5000/updateTeacher/" + id, updateTeacher)
      .then((response) => {
        alert(response.data.message);
        setUpdateTeacher(response.data.update);
        navigate("/teacherdashboard");
      })
      .catch((error) => error);
  };
  return (
    <div className="maindivision">
      <TeacherNav />
      <div className="homediv">
        {oneTeacher ? (
          <section className="signup">
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
                placeholder={oneTeacher.name}
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
                placeholder={oneTeacher.email}
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
                placeholder={oneTeacher.password}
                id="password"
                name="password"
                autoComplete="on"
                onChange={changeValue}
              />
            </label>
            <label htmlFor="department">
              Department:
              <input
                type="text"
                placeholder={oneTeacher.department}
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
                placeholder={oneTeacher.phoneno}
                id="phoneno"
                name="phoneno"
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
            Teacher Not Found
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default OneTeacherProfile;
