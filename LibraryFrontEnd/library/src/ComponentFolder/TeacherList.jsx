import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAutoDelete } from "react-icons/md";
import "../CssFolder/TableDetails.css";
import SideBar from "./SideBar";
import { toast } from "react-toastify";

function TeacherList() {
  const [alldata, setAllData] = useState([]);
  const navigate = useNavigate();

  //   BackEnd Data Connect to View All Teacher Details on the Page loading time
  useEffect(() => {
    axios
      .post("http://localhost:5000/user/findTeachers/")
      .then((response) => {
        setAllData(response.data.finddata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // View Books
  const handleView = (id) => {
    navigate("/teacherview/" + id);
  };

  //   Delete Teacher Details
  const deleteTeacher = (id) => {
    axios
      .post("http://localhost:5000/user/deleteUser/" + id)
      .then(() => {
        setAllData(alldata.filter((teacher) => teacher._id !== id));
        toast.success("Teacher Data Deleted Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Teacher Data Deleted Failed. Please try again.");
      });
  };
  return (
    <>
      <SideBar />
      {/* Table Create To View All Teacher Details */}
      {alldata.length > 0 ? (
        <>
          <div className="tabledetails">
            <h2>All Teacher Details</h2>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>ProfileImage</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>PhoneNo</th>
                  <th>View Teacher</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {alldata.map((teacher, index) => (
                  <tr key={teacher._id || index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`http://localhost:5000/${teacher?.image?.filename}`}
                        alt="profileimg"
                      />
                    </td>
                    <td>{teacher.name}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.department}</td>
                    <td>{teacher.phoneno}</td>
                    <td>
                      <button
                        type="button"
                        className="tableviewbtn"
                        onClick={() => handleView(teacher._id)}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <MdOutlineAutoDelete
                        style={{ color: "red", fontSize: 30 }}
                        onClick={() => deleteTeacher(teacher._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p
          style={{
            fontSize: 30,
            textAlign: "center",
            marginTop: "100px",
            marginBottom: "100px",
          }}
        >
          No Teacher Details Found. Please Try Again!
        </p>
      )}
    </>
  );
}

export default TeacherList;
