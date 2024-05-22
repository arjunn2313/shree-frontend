import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaBars } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

function OffNavbr() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "rgba(0, 82, 38, 1)" : "",
      padding: isActive ? "3px" : "2px",
      fontSize: isActive ? "17px" : "17px",
      fontWeight: isActive ? "600" : "500",
    };
  };
  return (
    <>
      <FaBars size={20} onClick={handleShow} className="d-block d-md-none" />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>   <FaBars size={20} onClick={handleShow} /></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul
            className="list-unstyled pt-4"
            style={{ cursor: "pointer" }}
          >
            <NavLink to="/" onClick={handleClose} style={navLinkStyles}>
              <li>Home</li>
            </NavLink>

            <NavLink to="/products-list" onClick={handleClose} style={navLinkStyles}>
              <li>Products</li>
            </NavLink>
            <NavLink to="/faqs" onClick={handleClose} style={navLinkStyles}>
              <li>Faqs</li>
            </NavLink>
            <NavLink to="/contact" onClick={handleClose} style={navLinkStyles}>
              <li>Contact us</li>
            </NavLink>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffNavbr;
