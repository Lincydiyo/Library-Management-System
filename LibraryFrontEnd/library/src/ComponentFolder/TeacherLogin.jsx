import React, { useState } from "react";
import Navpage from "./Navpage";
import "../CssFolder/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { TbLogin2 } from "react-icons/tb";
import axios from "axios";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";

function TeacherLogin() {
  const [teacherLogin, setTeacheLogin] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    setTeacheLogin({ ...teacherLogin, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/user/login", {
        ...teacherLogin,
        role: "teacher",
      })
      .then((response) => {
        const { _id, name, image, token } = response.data.data;
        // const id = response.data.data._id;
        // const name = response.data.data.name;
        // const image = response.data.data.image.filename;
        localStorage.setItem("teacherId", _id);
        localStorage.setItem("teacherName", name);
        localStorage.setItem("teacherImage", image.filename);
        localStorage.setItem("token", token)
        
        // console.log("teacher", id);

        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/teacherdashboard");
        }, 3000);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Login failed. Please try again.");
          toast.error("Login failed. Please try again.");
        }
      });
  };
  return (
    <>
      <div className="maindivision">
        <Navpage />
        <div className="homediv">
          <div className="login">
            <h2>Teacher Login</h2>
            <form onSubmit={handleLogin}>
              <label>
                Email
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  name="email"
                  id="email"
                  autoComplete="on"
                  value={teacherLogin.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  id="password"
                  autoComplete="on"
                  value={teacherLogin.password}
                  onChange={handleChange}
                  required
                />
              </label>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

              <button type="submit">
                Login <TbLogin2 style={{ fontSize: 25 }} />
              </button>
            </form>
            <div className="links">
              <span>
                Do not have an account? <a href="/teachersignup">SignUp here</a>
              </span>
              <Link to="/adminlogin" className="goback">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default TeacherLogin;
