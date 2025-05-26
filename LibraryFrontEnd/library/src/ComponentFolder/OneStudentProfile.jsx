import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentSideBar from "./StudentSideBar";
import "../CssFolder/Edit.css";
import { ToastContainer, toast } from "react-toastify";

function OneStudentProfile() {
  const [oneStudent, setOneStudent] = useState({});
  const [updateStudent, setUpdateStudent] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const id = localStorage.getItem("studentId");

  //   FindOneStudent
  useEffect(() => {
    axios
      .post(`https://library-backend-plyq.onrender.com/user/findOneStudent/${id}`)
      .then((res) => {
        setOneStudent(res.data.finddata);
        setUpdateStudent(res.data.finddata);
      })
      .catch((err) => console.log(err));
  }, [id]);

  //   ChangeValue
  const changeValue = (e) => {
    setUpdateStudent({ ...updateStudent, [e.target.name]: e.target.value });
  };

  // Image Update
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // HandleUpdate
  const updateHandle = () => {
    const { name, email, dob, department, phoneno, semester } = updateStudent;
    if (
      !name?.trim() ||
      !email?.trim() ||
      !dob?.trim() ||
      !department?.trim() ||
      !semester?.trim() ||
      !phoneno?.toString().trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("dob", dob);
    formData.append("department", department);
    formData.append("phoneno", phoneno);
    formData.append("semester", semester);
    formData.append("role", "student");
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    axios
      .post(`https://library-backend-plyq.onrender.com/user/updateUser/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        setUpdateStudent(response.data.update);
        setTimeout(() => {
          navigate("/studentdashboard");
        }, 3000);
      })
      .catch((error) => {
        const msg =
          error.response?.data?.message || "Update failed. Please try again.";
        setErrorMessage(msg);
      });
  };

  return (
    <>
      <StudentSideBar />

      {oneStudent ? (
        <section className="editDiv">
          <img
            src={`https://library-backend-plyq.onrender.com/${oneStudent?.image?.filename}`}
            alt="profileimg"
            style={{
              height: "auto",
              width: "130px",
              borderRadius: "100px",
              marginBottom: "30px",
              objectFit: "fill",
            }}
          />

          <label htmlFor="name">UserName : </label>

          <input
            type="text"
            value={updateStudent.name || ""}
            id="name"
            name="name"
            autoComplete="on"
            onChange={changeValue}
          />
          <label htmlFor="email">Email : </label>

          <input
            type="text"
            value={updateStudent.email || ""}
            id="email"
            name="email"
            autoComplete="on"
            onChange={changeValue}
          />

          <label htmlFor="dob">DOB : </label>

          <input
            type="date"
            defaultValue={
              updateStudent.dob
                ? new Date(updateStudent.dob).toISOString().split("T")[0]
                : ""
            }
            id="dob"
            name="dob"
            autoComplete="on"
            onChange={changeValue}
          />

          <label htmlFor="image">Profile Image: </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />

          <label htmlFor="department">Department : </label>

          <input
            type="text"
            value={updateStudent.department || ""}
            id="department"
            name="department"
            autoComplete="on"
            onChange={changeValue}
          />
          <label htmlFor="semester">Semester : </label>

          <select
            name="semester"
            id="semester"
            value={updateStudent.semester || ""}
            autoComplete="on"
            onChange={changeValue}
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
         
          <label htmlFor="phoneno">PhoneNumber : </label>

          <input
            type="text"
            value={updateStudent.phoneno || ""}
            id="phoneno"
            name="phoneno"
            autoComplete="on"
            onChange={changeValue}
          />

          {errorMessage && (
            <p
              style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}
            >
              {errorMessage}
            </p>
          )}
          <button type="button" onClick={updateHandle}>
            Edit
          </button>
        </section>
      ) : (
        <p
          style={{
            fontSize: 30,
            textAlign: "center",
            marginTop: "100px",
            marginBottom: "100px",
          }}
        >
          Student Not Found
        </p>
      )}
      <ToastContainer />
    </>
  );
}

export default OneStudentProfile;
