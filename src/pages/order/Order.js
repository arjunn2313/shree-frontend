import React, { useEffect, useState } from "react";
import BookingCard from "../../components/productCard/bookingCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { api } from "../../api/api";

export default function Order({user,setUser}) {


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className=" ">
      <div className="">
        <label className="form-label mb-3 fw-medium">
          First Name<span className="text-danger fw-bolder">*</span>
        </label>
        <input
          type="text"
          className="form-control form-control-lg mb-4"
          name="firstName"
          value={user.firstName}
          onChange={handleInputChange}
        />

        <label className="form-label mb-3 fw-medium">Last Name</label>
        <input
          type="text"
          className="form-control form-control-lg mb-4"
          name="lastName"
          value={user.lastName}
          onChange={handleInputChange}
        />

        <label className="form-label mb-3 fw-medium">
          Phone Number<span className="text-danger fw-bolder">*</span>
        </label>
        <input
          type="text"
          className="form-control form-control-lg mb-4"
          name="phone"
          value={user.phone}
          onChange={handleInputChange}
        />

        <label className="form-label mb-3 fw-medium">
          Alternative Phone Number
          <span className="text-danger fw-bolder">*</span>
        </label>
        <input
          type="text"
          className="form-control form-control-lg mb-4"
          name="alternativePhone"
          value={user.alternativePhone || ''}
          onChange={handleInputChange}
        />

        <label className="form-label mb-3 fw-medium">
          Email<span className="text-danger fw-bolder">*</span>
        </label>
        <input
          type="text"
          className="form-control form-control-lg mb-4"
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
