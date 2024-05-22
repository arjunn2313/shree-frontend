import React, { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { TbShoppingBagCheck } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";
import { PiCodesandboxLogoThin } from "react-icons/pi";
import { GoDatabase } from "react-icons/go";
import { GiCash } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { GrAnnounce } from "react-icons/gr";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaBars } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

function AdminOffNavbr() {
  const [show, setShow] = useState(false);
const location = useLocation()
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
          <Offcanvas.Title>
            {" "}
            <FaBars size={20} onClick={handleShow} />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="sideBar d-none d-xl-block">
            <div className="sidebar-child1">
              <div>
                <Link
                  to="/admin"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <span
                    className={
                      location.pathname === "/admin"
                        ? "active-link"
                        : "menu-item"
                    }
                  >
                    <span>
                      <MdOutlineDashboard className="fs-4" />
                    </span>
                    <span className="fs-6">Dashboard</span>
                  </span>
                </Link>
              </div>

              <div>
                <Link
                  to="upload-product"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <span
                    className={
                      location.pathname === "/admin/upload-product"
                        ? "active-link"
                        : "menu-item"
                    }
                  >
                    <span>
                      <TbShoppingBagCheck className="fs-4" />
                    </span>

                    <span>Upload Products</span>
                  </span>
                </Link>
              </div>

              <div>
                <Link
                  to="orders"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <span
                    className={
                      location.pathname === "/admin/orders"
                        ? "active-link"
                        : "menu-item"
                    }
                  >
                    <span>
                      <PiCodesandboxLogoThin className="fs-4" />
                    </span>
                    <span>Orders</span>
                  </span>
                </Link>
              </div>

              <div>
                <Link
                  to="delivery-and-tracking"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <span
                    className={
                      location.pathname === "/admin/delivery-and-tracking"
                        ? "active-link"
                        : "menu-item"
                    }
                  >
                    <span>
                      <CiDeliveryTruck className="fs-4" />
                    </span>
                    <span>Delivery Tracking</span>
                  </span>
                </Link>
              </div>

              <div>
                <Link
                  to="stock"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <span
                    className={
                      location.pathname === "/admin/stock"
                        ? "active-link"
                        : "menu-item"
                    }
                  >
                    <span>
                      <GoDatabase className="fs-4" />
                    </span>
                    <span>Stocks</span>
                  </span>
                </Link>
              </div>

              <div>
                <Link
                  to="expense"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <span
                    className={
                      location.pathname === "/admin/expense"
                        ? "active-link"
                        : "menu-item"
                    }
                  >
                    <span>
                      <GiCash className="fs-4" />
                    </span>
                    <span>Expense</span>
                  </span>
                </Link>
              </div>

              <div>
                <Link
                  to="reviewsandratings"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <span
                    className={
                      location.pathname === "/admin/reviewsandratings"
                        ? "active-link"
                        : "menu-item"
                    }
                  >
                    <span>
                      <IoIosPeople className="fs-4" />
                    </span>
                    <span>Reviews & Ratings</span>
                  </span>
                </Link>
              </div>

              <div>
                <Link
                  to="advertisement"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <span
                    className={
                      location.pathname === "/admin/advertisement"
                        ? "active-link"
                        : "menu-item"
                    }
                  >
                    <span>
                      <GrAnnounce className="fs-4" />
                    </span>
                    <span>Advertisement </span>
                  </span>
                </Link>
              </div>

              <div>
                <Link
                  to="logout"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <span
                    className={
                      location.pathname === "/admin/advertisement"
                        ? "active-link"
                        : "menu-item"
                    }
                  >
                    <span>
                      <IoLogOutOutline className="fs-4" />
                    </span>
                    <span>Log Out</span>
                  </span>
                </Link>
              </div>
            </div>

            {/* <div>
        <Link to='logout' style={{color:'inherit',textDecoration:'none'}}>
        <span className='menu-item'>
           <span><IoLogOutOutline className='fs-4'/></span> 
            <span>Log Out</span>
            </span>
            </Link>
        </div> */}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AdminOffNavbr;
