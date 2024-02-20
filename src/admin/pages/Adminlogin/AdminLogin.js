import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../../services/admin/adminSlice";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [adminData, setAdminData] = useState({});
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setAdminData({...adminData,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    dispatch(loginAdmin(adminData))
    navigate('/admin')
  }

  return (
    <div className="container mt-5 pt-5">
      <h3 className="text-center">Admin Login</h3>
      <form className="row d-flex justify-content-center" onSubmit={handleSubmit}>
        <div className="col-8 my-3">
          <label className="form-label fw-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={adminData.phone}
            onChange={handleChange}
            placeholder="enter your registered phone number"
            className="form-control"
          />
        </div>

        <div className="col-8 my-3">
          <label className="form-label fw-medium">Password</label>
          <input
            name="password"
            value={adminData.password}
            onChange={handleChange}
            type="password"
            placeholder="enter your password"
            className="form-control"
          />
        </div>

        <div className="d-grid mx-auto py-3 col-5">
          <button className="btn btn-success" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
