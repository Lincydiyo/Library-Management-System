import React from "react";
import "../CssFolder/AdminProfile.css";
import Navpage from "./Navpage";
import { Link } from "react-router-dom";
import { TbLogin2 } from "react-icons/tb";
import Footer from "./Footer"

function AdminProfile() {
  return (
    <>
      <div className="maindivision">
        <Navpage />

        <div className="homediv">
          <div className="adminprofile">
            <h2>WELCOME</h2>
            <h4>
              Welcome to Online Library Management System You can access various
              feautures after Login.
            </h4>

            {/* <button type="button">
              <Link to="/adminsignup">
                SignUp <SiGnuprivacyguard style={{ fontSize: 25 }} />
              </Link>
            </button> */}
            <button type="button">
              <Link to="/adminlogin">
                Login <TbLogin2 style={{ fontSize: 25 }} />
              </Link>
            </button>
            <a href="/" className="goback">
              Go Back
            </a>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default AdminProfile;
