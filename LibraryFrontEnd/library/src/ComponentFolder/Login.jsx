import React, { useState } from "react";
import "../CssFolder/Login.css";
import { useNavigate } from "react-router-dom";
import { TbLogin2 } from "react-icons/tb";
import Navpage from "./Navpage";
import Footer from "./Footer";

function Login() {
  const fixedEmail = "admin@gmail.com";
  const fixedPassword = "admin1234";
  const [adminlogin, setAdminLogin] = useState({
    email: "",
    password: "",
  });

  

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdminLogin({ ...adminlogin, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      adminlogin.email === fixedEmail &&
      adminlogin.password === fixedPassword
    ) {
      
      alert("Admin Login Successfull!");
      navigate("/admindashboard");
    } else {
      alert("Invalid Email and Password. Please try again.");
    }
  };

  return (
    <>
      <div className="maindivision">
        <Navpage />
        <div className="homediv">
          <div className="login">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <label>
                UserName
                <input
                  type="text"
                  placeholder="Enter Your Username"
                  name="email"
                  autoComplete="on"
                  id="email"
                  value={adminlogin.email}
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
                  value={adminlogin.password}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit">
                {" "}
                Login <TbLogin2 style={{ fontSize: 25 }} />
              </button>
            </form>
          </div>
          
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default Login;
