import React from "react";
import "../CssFolder/Home.css";
import Navpage from "./Navpage";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { GrUserAdmin } from "react-icons/gr";

function Home() {
  return (
    <>
      <Navpage />

      <div className="homediv">
        <h1>Welcome to the Library Management System</h1>
        <p>
          With our platform, you can easily manage your library. Whether you're
          a librarian or a member, you can easily find,borrow, and return books.
          Explore our library today!
        </p>

        <div className="icondiv">
          <GrUserAdmin className="iconimg" />
          <button type="button">
            <Link to="/adminprofile"> Admin</Link>
          </button>
        </div>
        <div className="icondiv">
          <GiTeacher className="iconimg" />
          <button type="button">
            <Link to="/teacherlogin"> Teacher</Link>
          </button>
        </div>
        <div className="icondiv">
          <PiStudentFill className="iconimg" />
          <button type="button">
            <Link to="/studentlogin"> Student</Link>
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
