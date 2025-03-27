import React, { useState } from "react";
import Navpage from "./Navpage";
import "../CssFolder/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { TbLogin2 } from "react-icons/tb";
import axios from "axios";
import Footer from './Footer';


function TeacherLogin() {
  const [teacherLogin, setTeacheLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setTeacheLogin({ ...teacherLogin, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/teacherLogin", teacherLogin)
      .then((response) => {
        const id = response.data.data._id;
        const name = response.data.data.name;
        localStorage.setItem("teacherId", id);
        localStorage.setItem("teacherName", name);
        // console.log("teacher", id);

        alert(response.data.message);
        navigate("/teacherdashboard");
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
        <Footer/>
      </div>
    </>
  );
}

export default TeacherLogin;
