import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FiUser } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LiaUserEditSolid } from "react-icons/lia";
import { IoMdHeart } from "react-icons/io";
import { TbBoxSeam } from "react-icons/tb";
import { AiOutlineLogin } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { api, config } from "../../api/api";
import { logOut } from "../../redux/reducer";
import { getUserCart } from "../../services/user/userSlice";
 
 

export default function NavBar() {
 
  const [isUser, setIsUser] = useState({});
  const [open, setOpen] = useState(false);
  const quantity = useSelector((state) =>state?.auth?.userCart);
  const dispatch = useDispatch();
  const token = localStorage.token
  const navigate = useNavigate();
  const userNavRef = useRef(null);

  useEffect(()=>{
    dispatch(getUserCart())
  },[quantity])

 
  useEffect(() => {
    axios
      .get(`${api}/user`,config).then((res) => {
        setIsUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userNavRef.current && !userNavRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userNavRef]);

  const navLinkStyles = ({isActive}) => {
    return {
      borderBottom : isActive ? "3px solid rgba(0, 82, 38, 1)" : "",
      color: isActive ? "rgba(0, 82, 38, 1)" : "",
      padding : isActive ? "3px" : "2px",
      fontSize : isActive ? "17px" : "17px",
      fontWeight : isActive ? "600" : "500"
    }
  }

  const handleLogout = () =>{
    localStorage.removeItem("token")
    window.location.reload()
  }

  return (
    <div className="container-fluid">
      <div className="container-lg">
        <div className="row w-100">
          <div className="col-xl-3 col-lg-6 col-6">
            <Link to="/">
              <img
                src="assets\Untitled-1-01 1.png"
                style={{ width: "80px", height: "80px" }}
                alt="Logo"
              />
            </Link>
          </div>

          <div className="col-6 col-lg-6 d-none d-lg-block">
            <ul
              className="d-flex align-items-center justify-content-between list-unstyled pt-4 "
              style={{ cursor: "pointer" }}
            >
              <NavLink to="/" style={navLinkStyles}>
                <li>Home</li>
              </NavLink>
              <NavLink to="/about"  style={navLinkStyles} >
                <li   >About us</li>
              </NavLink>
              <NavLink 
                to="/products-list"
                style={navLinkStyles}
              >
                <li>Products</li>
              </NavLink>
              <NavLink to="/faqs"  style={navLinkStyles} >
                <li>Faqs</li>
              </NavLink>
              <NavLink to="/contact"  style={navLinkStyles}>
                <li>Contact us</li>
              </NavLink>
            </ul>
          </div>

          <div className="col-xl-3 col-lg-6 col-6">
            <div className="d-flex  justify-content-end p-4 align-items-center gap-3">
              <CiSearch className="fs-4" />
              <NavLink
                to="/cart"
                style={navLinkStyles}
              >
                {/* <HiOutlineShoppingBag className="fs-4 cursor-pointed" /> */}
                <button type="button" class="btn position-relative border-0 ">
                  <HiOutlineShoppingBag className="fs-4 cursor-pointed" />
                  <span
                    class="position-absolute top-0 left-0 badge rounded-pill "
                    style={{ backgroundColor: "rgba(241, 104, 1, 1)" }}
                  >
                    {quantity?.length ? quantity.length : 0}
                  </span>
                </button>
              </NavLink>
              <div className="position-relative" ref={userNavRef}>
                <FiUser
                  className="fs-4 cursor-pointed"
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpen(!open)}
                />

                {/* user navigator */}
                {open && (
                  <>
                    {token ? (
                      <div
                        style={{
                          position: "absolute",
                          top: "30px",
                          right: "0",
                          width: "300px",
                          // height:'300px',
                          borderRadius: "5px",
                          backgroundColor: "#fff",
                          zIndex: "10",
                          boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
                          // clipPath:" polygon(0 100%, 100% 100%, 100% 9%, 94% 3%, 90% 9%, 0 9%, 0% 75%)",
                          // border:"2px solid",

                          boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div
                          className="d-flex py-4 border-bottom justify-content-around align-items-center"
                          onClick={() => setOpen(!open)}
                        >
                          <img
                            src={
                              isUser.avatar
                                ? `${api}${isUser.avatar}`
                                : "https://d2v9ipibika81v.cloudfront.net/uploads/sites/210/Profile-Icon.png"
                            }
                            style={{ width: "60px", height: "60px" }}
                            className="rounded-circle"
                          />
                          <div className="d-flex flex-column align-intems-center">
                            <p className="p-0 m-0">Hi, {isUser.firstName}</p>
                            <span>{isUser.phone}</span>
                          </div>
                          <LiaUserEditSolid
                            className="fs-4"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("profile")}
                          />
                        </div>

                        <Link to="wishlist">
                          <div
                            className="d-flex py-3 border-bottom   justify-content-around  align-items-center"
                            style={{ cursor: "pointer" }}
                            onClick={() => setOpen(!open)}
                          >
                            <IoMdHeart className="fs-3" />
                            <span className="fs-6">Wishlist</span>
                            <span style={{ visibility: "hidden" }}>
                              Wishlist
                            </span>
                          </div>
                        </Link>
                        <Link to="myorders">
                        <div
                          className="d-flex py-3 border-bottom justify-content-around align-items-center"
                          style={{ cursor: "pointer" }}
                          onClick={()=>setOpen(!open)}
                        >
                          <TbBoxSeam className="fs-3  " />
                          <span className="fs-6">My Orders</span>
                          <span style={{ visibility: "hidden" }}>shlist</span>
                        </div>
                        </Link>

                        <div
                          className="d-flex py-3 border-bottom justify-content-around align-items-center"
                          style={{ cursor: "pointer" }}
                          onClick={() => dispatch(logOut())}
                        >
                          <IoLogOutOutline className="fs-3  " />
                          <span className="fs-6" onClick={()=>handleLogout()}>LOGOUT</span>
                          <span style={{ visibility: "hidden" }}>shlist</span>
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          position: "absolute",
                          top: "30px",
                          right: "0",
                          width: "150px",
                          // height:'300px',
                          borderRadius: "5px",
                          backgroundColor: "#fff",
                          zIndex: "10",
                          boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
                          // clipPath:" polygon(0 100%, 100% 100%, 100% 9%, 94% 3%, 90% 9%, 0 9%, 0% 75%)",
                          // border:"2px solid",

                          boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                        onClick={() => setIsUser(!isUser)}
                      >
                        {" "}
                        <Link to="user-account">
                          <div
                            className="d-flex py-2  border-bottom   justify-content-center gap-3 align-items-center"
                            style={{ cursor: "pointer" }}
                          >
                            <AiOutlineLogin className="fs-5" />
                            <span className="fs-6">LOGIN</span>
                          </div>
                        </Link>
                      </div>
                    )}
                  </>
                )}

                {/* user navigator */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
