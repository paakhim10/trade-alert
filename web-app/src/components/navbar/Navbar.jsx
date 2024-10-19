import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import "./Navbar.css";

const Header = () => {
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState("navbar-home-link"); // State to track active link

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault(); // Prevent default link behavior
    navigate("/"); // Navigate to home page first

    // Delay scroll to allow time for the navigation to complete
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // 100ms delay for smooth transition
  };

  const handleActiveLink = (id) => {
    setActiveLink(id); // Update active link state
  };

  // Use effect to initially set the Home link as active
  useEffect(() => {
    const homeLink = document.getElementById("navbar-home-link");
    if (homeLink) {
      homeLink.classList.add("active");
    }
  }, []);

  // Function to add 'active' class to clicked link and remove from previous link
  useEffect(() => {
    const links = document.querySelectorAll(".nav-link");

    links.forEach((link) => {
      if (link.id === activeLink) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }, [activeLink]); // This effect runs when the `activeLink` state changes

  return (
    <>
      <Navbar key="md" expand="md" className="bg-body-danger" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <img src={logo} alt="Brand Logo" />
            <h1>Trade Alert</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-md`}
                className="text-color-primary"
              >
                <img src={logo} alt="Brand Logo" style={{ height: "50px" }} />
                Trade Alert
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link
                  as={NavLink}
                  to="/"
                  id="navbar-home-link"
                  onClick={() => handleActiveLink("navbar-home-link")}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  onClick={(e) => {
                    handleScrollToSection(e, "about");
                    handleActiveLink("navbar-about-link");
                  }}
                  id="navbar-about-link"
                >
                  About Us
                </Nav.Link>
                <Nav.Link
                  onClick={(e) => {
                    handleScrollToSection(e, "news-partner");
                    handleActiveLink("navbar-news-link");
                  }}
                  id="navbar-news-link"
                >
                  Our News Partner
                </Nav.Link>
                <Nav.Link
                  onClick={(e) => {
                    handleScrollToSection(e, "contact");
                    handleActiveLink("navbar-contact-link");
                  }}
                  id="navbar-contact-link"
                >
                  Contact Us
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/auth"
                  id="navbar-auth-link"
                  onClick={() => handleActiveLink("navbar-auth-link")}
                >
                  Register/Login
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
