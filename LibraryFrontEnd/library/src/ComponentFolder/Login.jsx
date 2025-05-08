import React, { useState } from "react";
import "../CssFolder/Login.css";
import { useNavigate } from "react-router-dom";
import { TbLogin2 } from "react-icons/tb";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navpage from "./Navpage";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const fixedEmail = "admin@gmail.com";
  const fixedPassword = "admin1234";

  const [adminlogin, setAdminLogin] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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
      toast.success("Admin Login Successful!");
      setTimeout(() => {
        navigate("/admindashboard");
      }, 3000);
    } else {
      toast.error("Invalid Email or Password. Please try again.");
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
              <label>Username</label>
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

              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  name="password"
                  id="password"
                  autoComplete="on"
                  value={adminlogin.password}
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

              <button type="submit">
                Login <TbLogin2 style={{ fontSize: 25 }} />
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
