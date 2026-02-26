import  { useState } from "react";
import Navpage from "./Navpage";
import { useNavigate } from "react-router-dom";
import "../CssFolder/SignUp.css";
import axios from "axios";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

function StudentRegistration() {
  const [studentSignup, setStudentSignUp] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
    dob: "",
    department: "",
    semester: "",
    phoneno: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setStudentSignUp({
        ...studentSignup,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setStudentSignUp({ ...studentSignup, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", "student");
    formData.append("name", studentSignup.name);
    formData.append("email", studentSignup.email);
    formData.append("password", studentSignup.password);
    formData.append("image", studentSignup.image);
    formData.append("dob", studentSignup.dob);
    formData.append("department", studentSignup.department);
    formData.append("semester", studentSignup.semester);
    formData.append("phoneno", studentSignup.phoneno);

    axios
      .post("http://localhost:5000/user/signup".trim(), formData)
      .then((response) => {
        toast.success(response.data.message, {
          onClose: () => navigate("/studentlogin"),
        });
      })

      .catch((error) => {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
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
            <h2>Student Registration</h2>
            <form onSubmit={handleSubmit}>
              <label>
                UserName
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="name"
                  id="name"
                  autoComplete="on"
                  value={studentSignup.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  id="email"
                  autoComplete="on"
                  value={studentSignup.email}
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
                  autoComplete="current-password"
                  value={studentSignup.password}
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
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="fileInput"
                />
              </label>
              <label>
                Date of Birth
                <input
                  type="date"
                  placeholder="Enter Date of Birth"
                  name="dob"
                  id="dob"
                  autoComplete="on"
                  value={studentSignup.dob}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Department
                <input
                  type="text"
                  placeholder="Enter Department"
                  name="department"
                  id="department"
                  autoComplete="on"
                  value={studentSignup.department}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Semester
                <select
                  name="semester"
                  id="semester"
                  value={studentSignup.semester}
                  autoComplete="on"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Semester</option>
                  <option value="1st sem">First Semester</option>
                  <option value="2nd sem">Second Semester</option>
                  <option value="3rd sem">Third Semester</option>
                  <option value="4th sem">Fourth Semester</option>
                  <option value="5th sem">Fifth Semester</option>
                  <option value="6th sem">Sixth Semester</option>
                </select>
              </label>

              <label>
                Phone No
                <input
                  type="number"
                  placeholder="Enter Phone Number"
                  name="phoneno"
                  id="phoneno"
                  autoComplete="on"
                  value={studentSignup.phoneno}
                  onChange={handleChange}
                  required
                />
              </label>

              <button type="submit">Register</button>
            </form>

            <span>
              Already have an account? <Link to="/studentlogin">Login here</Link>
            </span>
          </div>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default StudentRegistration;
