import { GiBookAura } from "react-icons/gi";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function Navpage() {
  return (
    <>
      <Navbar variant="dark" expand="lg" className="mainNav">
        <Container fluid>
          <Navbar.Brand className="navbarBrand">
            <GiBookAura style={{ fontSize: 50, marginRight: "10px" }} />
            <b> Library </b>
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse className="navbarCollapse">
            <Nav className="miniNav">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>

              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
}

export default Navpage;
