import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "../CssFolder/Login.css";
import Navpage from "./Navpage";
import Footer from "./Footer";

function StudentForgotPassword() {
  const [email, setEmail] = useState();
  const [role] = useState("student");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/user/forgotpassword", { email, role })
      .then((response) => {
        const resetLink = response.data.resetLink;

        if (resetLink) {
          toast.success(response.data.message);
          // const parts = resetLink.split("/");
          // const id = parts[parts.length - 2];
          // const token = parts[parts.length - 1];
        
        } else {
          toast.error("Reset link is invalid or missing. Please try again.");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          toast.error("Student not found. Please check your email.");
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      });
  };

  return (
    <>
      <div className="maindivision">
        <Navpage />
        <div className="homediv">
          <div className="login">
            <h2> Forgot Password</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </label>

              <button type="submit"> Send</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default StudentForgotPassword;
