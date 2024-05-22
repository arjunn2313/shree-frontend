import React, { useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../../services/admin/adminSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../../api/api";
import { toast } from "react-toastify";

function SignInForm() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const navigate = useNavigate()

  const validateForm = () => {
    const errors = {};

    if (!state.email) {
      errors.email = "Please enter your email.";
    }

    if (!state.password) {
      errors.password = "Please enter your password.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post(`${api}/admin/adminlogin`, state)
        .then((res) => {
        
           if(res.status == 200){
            toast.success(res.data.message,{
              position:"top-center",
              hideProgressBar:true
            })
            localStorage.setItem('admin',res.data.token)
            navigate('/admin')
            window.location.reload()
           }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message || "An error occurred while processing your request.",{
            position:"top-center",
            hideProgressBar:true
          })
        });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit} className="admin-login-form">
        <h1 className="form-h1">Sign in</h1>
        <span className="form-span">or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        {errors.email && (
          <span className="error-message text-danger">{errors.email}</span>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="error-message text-danger">{errors.password}</span>
        )}
        <a href="#">Forgot your password?</a>
        <button className="admin-login-button">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
