import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../CssFolder/Login.css";
import Navpage from "./Navpage";
import Footer from "./Footer";
import { useParams } from "react-router-dom";

function StudentResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    axios
      .post(`https://library-backend-plyq.onrender.com/user/resetpassword/${id}/${token}`, {
        password: newPassword,
      })
      .then((res) => {
        toast.success("Password reset  successfully");
        setTimeout(() => {
          navigate("/studentlogin");
        }, 2000);
      })
      .catch((err) => {
        console.error("Error: ", err);
        toast.error("Error resetting password.");
      });
  };

  return (
    <>
      <div className="maindivision">
        <Navpage />
        <div className="homediv">
          <div className="login">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
              <label>
                New Password
                <input
                  type="password"
                  placeholder="Enter Password"
                  autoComplete="off"
                  name="newPassword"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </label>
              <label>
                Confirm Password
                <input
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="off"
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default StudentResetPassword;
