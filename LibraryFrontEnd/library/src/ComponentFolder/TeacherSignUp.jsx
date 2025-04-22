import React, { useState } from "react";
import Navpage from "./Navpage";
import "../CssFolder/SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";

function TeacherSignUp() {
  const [teachersignup, setTeacherSignUp] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
    department: "",
    phoneno: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setTeacherSignUp({
        ...teachersignup,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setTeacherSignUp({ ...teachersignup, [e.target.name]: e.target.value });
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", teachersignup.name);
    formData.append("email", teachersignup.email);
    formData.append("password", teachersignup.password);
    formData.append("image", teachersignup.image);
    formData.append("department", teachersignup.department);
    formData.append("phoneno", teachersignup.phoneno);

    axios
      .post("http://localhost:5000/teacher/teacherSignup/", formData)
      .then((response) => {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/teacherlogin");
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
          toast.error("Registration failed. Please try again.");
        }
      });
  };

  return (
    <>
      <div className="maindivision">
        <Navpage />
        <div className="homediv">
          <div className="signup">
            <h2>Teacher SignUp</h2>
            <form onSubmit={handleLogin}>
              <label>
                UserName
                <input
                  type="text"
                  placeholder="Enter Your Username"
                  name="name"
                  autoComplete="on"
                  value={teachersignup.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  autoComplete="on"
                  value={teachersignup.email}
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
                  autoComplete="on"
                  value={teachersignup.password}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Profile Image
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleChange}
                  required
                  className="fileInput"
                />
              </label>
              <label>
                Department
                <input
                  type="text"
                  placeholder="Enter Your Department"
                  name="department"
                  id="department"
                  autoComplete="on"
                  value={teachersignup.department}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Phone Number
                <input
                  type="number"
                  placeholder="Enter Your Phone Number"
                  name="phoneno"
                  autoComplete="on"
                  value={teachersignup.phoneno}
                  onChange={handleChange}
                  required
                />
              </label>{" "}
              {errorMessage && (
                <p style={{ color: "red", marginBottom: "10px" }}>
                  {errorMessage}
                </p>
              )}
              <button type="submit"> SignUp </button>
              <span>
                Already have an account? <a href="/teacherlogin">Login here</a>
              </span>
            </form>
          </div>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default TeacherSignUp;
