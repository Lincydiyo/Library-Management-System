import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TeacherSideBar from "./TeacherSideBar";
import "../CssFolder/Edit.css";
import { ToastContainer, toast } from "react-toastify";

function OneTeacherProfile() {
  const [oneTeacher, setOneTeacher] = useState({});
  const [updateTeacher, setUpdateTeacher] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const id = localStorage.getItem("teacherId");

    //   FindOneTeacher
  useEffect(() => {
    axios
      .post(`http://localhost:5000/user/findOneTeacher/${id}`)
      .then((res) => {
        setOneTeacher(res.data.finddata);
        setUpdateTeacher(res.data.finddata);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const changeValue = (e) => {
    setUpdateTeacher({ ...updateTeacher, [e.target.name]: e.target.value });
  };

    // Image Update
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const updateHandle = () => {
    const { name, email, department, phoneno } = updateTeacher;

    if (!name?.trim() || !email?.trim() || !department?.trim() || !phoneno?.toString().trim()) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("department", department);
    formData.append("phoneno", phoneno);
    formData.append("role", "teacher");
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    axios
      .post(`http://localhost:5000/user/updateUser/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setUpdateTeacher(res.data.update);
        setTimeout(() => navigate("/teacherdashboard"), 3000);
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Update failed. Please try again.";
        setErrorMessage(msg);
      });
  };

  return (
    <>
      <TeacherSideBar />
      <section className="editDiv">
        {oneTeacher?.image?.filename && (
          <img
            src={`http://localhost:5000/${oneTeacher.image.filename}`}
            alt="profile"
            style={{
              height: "auto",
              width: "130px",
              borderRadius: "100px",
              marginBottom: "30px",
              objectFit: "fill",
            }}
          />
        )}

        <label htmlFor="name">
          UserName:
          <input
            type="text"
            name="name"
            id="name"
            value={updateTeacher.name || ""}
            onChange={changeValue}
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            id="email"
            value={updateTeacher.email || ""}
            onChange={changeValue}
          />
        </label>

        <label htmlFor="image">Profile Image:</label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />

        <label htmlFor="department">
          Department:
          <input
            type="text"
            name="department"
            id="department"
            value={updateTeacher.department || ""}
            onChange={changeValue}
          />
        </label>

        <label htmlFor="phoneno">
          Phone Number:
          <input
            type="number"
            name="phoneno"
            id="phoneno"
            value={updateTeacher.phoneno || ""}
            onChange={changeValue}
          />
        </label>

        {errorMessage && (
          <p style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>
            {errorMessage}
          </p>
        )}

        <button type="button" onClick={updateHandle}>
          Edit
        </button>
      </section>
      <ToastContainer />
    </>
  );
}

export default OneTeacherProfile;
