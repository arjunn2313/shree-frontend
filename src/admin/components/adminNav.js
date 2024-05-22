import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import AdminOffNavbr from "./adminOffcavasNav";
import axios from "axios";
import { adminConfig, api } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminNav() {
  const [admin, setAdmin] = useState();
 const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`${api}/admin`, adminConfig)
      .then((res) => {
        setAdmin(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container-fluid border py-3">
      <div className="row">
        {/* <AdminOffNavbr /> */}
        {/* LoGO */}
        <div className="col-2 d-flex justify-content-center align-items-center">
          <h5
            style={{ fontFamily: "Mochiy Pop One" }}
            className="text-success p-0 m-0"
          >
            Shree Clothings
          </h5>
        </div>

        {/* search bar */}
        <div className="col-8 d-flex justify-content-around align-items-center border-end">
          <div
            className="border border-success h-75 d-flex justify-content-around align-items-center  w-25 rounded-3"
            id="admin-search"
          >
            <CiSearch className="fs-5" />
            <input
              type="text"
              placeholder="search..."
              className="border-0"
              id="admin-search"
              style={{ outline: "none" }}
            />
          </div>

          <button type="button" class="btn   position-relative" onClick={()=>navigate('notification')}>
            <IoIosNotifications size={30} />
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              99+
              <span class="visually-hidden">unread messages</span>
            </span>
          </button>
        </div>

        <div className="col-2    d-flex gap-4 align-items-center ">
          <FaUser size={30} />

          <div className="d-flex flex-column text-center ">
            <span className="fw-medium" style={{ fontSize: "18px" }}>
              {admin?.name}
            </span>
            <span
              className="fw-normal text-secondary"
              style={{ fontSize: "14px" }}
            >
              Admin
            </span>
          </div>

          {/* <FaChevronDown className="cursor-pointer" /> */}
        </div>
      </div>
    </div>
  );
}
