import React, { useState } from "react";
import Navpage from "./Navpage";
import { Link, useNavigate } from "react-router-dom";
import "../CssFolder/Login.css";
import { TbLogin2 } from "react-icons/tb";
import axios from "axios";
import Footer from "./Footer";

function StudentLogin() {
  const [studentLogin, setStudentLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudentLogin({ ...studentLogin, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/studentLogin", studentLogin)
      .then((response) => {
        const id = response.data.data._id;
        const name = response.data.data.name;

        localStorage.setItem("studentId", id);
        localStorage.setItem("studentName", name);

        alert(response.data.message);
        navigate("/studentdashboard");
      })

      .catch((error) => {
        console.log(error);
        alert("Login Failed ❌. Please Check.");
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

              <button type="submit">
                Login <TbLogin2 style={{ fontSize: 25 }} />
              </button>
            </form>
            <div className="links">
              <span>
                Do not have an account?{" "}
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
    </>
  );
}

export default StudentLogin;
