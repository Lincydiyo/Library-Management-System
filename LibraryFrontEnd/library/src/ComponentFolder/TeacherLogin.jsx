import React, { useState } from "react";
import Navpage from "./Navpage";
import "../CssFolder/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setTeacheLogin({ ...teacherLogin, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("https://library-backend-plyq.onrender.com/user/login", {
        ...teacherLogin,
        role: "teacher",
      })
      .then((response) => {
        const { _id, name, image, token } = response.data.data;

        localStorage.setItem("teacherId", _id);
        localStorage.setItem("teacherName", name);
        localStorage.setItem("teacherImage", image.filename);
        localStorage.setItem("token", token);

        toast.success(response.data.message, {
          onClose: () => navigate("/teacherdashboard"),
        });
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
              <label>Password </label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  name="password"
                  id="password"
                  autoComplete="on"
                  value={teacherLogin.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

              <button type="submit">
                Login <TbLogin2 style={{ fontSize: 25 }} />
              </button>
            </form>
            <div className="links">
              <span className="lastSpan">
                Do not have an account?
                <Link to="/teachersignup">SignUp here</Link>
              </span>
              <Link to="/teacherforgotpassword" className="goback">
                Forgot password
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
