import { useNavigate } from "react-router-dom";
import { GiBookAura } from "react-icons/gi";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "../CssFolder/Nav.css"

function TeacherNav() {

  const navigate = useNavigate();

  // LogOut Teacher
  const HandleLogOut = () => {
    localStorage.removeItem("teacherId");
    localStorage.removeItem("teacherName");
    navigate("/teacherlogin");
  };
  return (
    <>
      <Navbar variant="dark" expand="lg" className="mainNav">
        <Container fluid>
          <Navbar.Brand className="navbarBrand">
            <GiBookAura style={{ fontSize: 50, marginRight: "10px" }} />
            <b> Library </b>
          </Navbar.Brand>

          {/* Responsive toggle */}
          <Navbar.Toggle  />

          <Navbar.Collapse className="navbarCollapse">
            <Nav className="miniNav">
              <Nav.Link as={Link} to="/teacherdashboard">
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/teacherViewAvailableBooks">
              AvailableBooks
              </Nav.Link>

            

              {/*My Profile Dropdown */}
              <NavDropdown title="My Profile" className="navbarDropdown">
                <NavDropdown.Item as={Link} to={`/viewTeacherProfile/${localStorage.getItem('teacherId')}`}>
                  View Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/editteacherprofile">
                  Edit Profile
                </NavDropdown.Item>

                
              </NavDropdown>
              <Nav.Link onClick={HandleLogOut}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TeacherNav;
