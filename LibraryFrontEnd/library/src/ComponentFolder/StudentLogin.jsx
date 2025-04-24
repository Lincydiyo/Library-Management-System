import React, { useState } from "react";
import Navpage from "./Navpage";
import { Link, useNavigate } from "react-router-dom";
import "../CssFolder/Login.css";
import { TbLogin2 } from "react-icons/tb";
import axios from "axios";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";

function StudentLogin() {
  const [studentLogin, setStudentLogin] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudentLogin({ ...studentLogin, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/user/login", {
        ...studentLogin,
        role: "student",
      })
      .then((response) => {
        const { _id, name, image, token } = response.data.data;
        localStorage.setItem("studentId", _id);
        localStorage.setItem("studentName", name);
        localStorage.setItem("studentImage", image.filename);
        localStorage.setItem("token", token);

        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/studentdashboard");
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
            <h2>Student Login</h2>
            <form onSubmit={handleLogin}>
              <label>
                Email
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  id="email"
                  autoComplete="on"
                  value={studentLogin.email}
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
                  value={studentLogin.password}
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
                Do not have an account?
                <a href="/studentregistration">SignUp here</a>
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

export default StudentLogin;
