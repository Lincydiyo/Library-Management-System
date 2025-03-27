import React, { useState } from "react";
import Navpage from "./Navpage";
import "../CssFolder/SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function TeacherSignUp() {
  const [teachersignup, setTeacherSignUp] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
    department: "",
    phoneno: "",
  });
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
      .post("http://localhost:5000/teacherSignup/", formData)
      .then((response) => {
        alert(response.data.message);
        navigate("/teacherlogin");
      })
      .catch((error) => {
        console.log(error);
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
              </label>
              <button type="submit"> SignUp </button>
              <span>
                Already have an account? <a href="/teacherlogin">Login here</a>
              </span>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default TeacherSignUp;
