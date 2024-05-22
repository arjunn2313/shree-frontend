import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../api/api";
function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { errors, setErrors } = useState();
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
    setLoading(true);
    evt.preventDefault();
    const errors = {};

    // Check if any field is empty
    if (!state.name || !state.email || !state.password) {
      errors.emptyFields = "Please enter all details.";
    }

    // Check if the password meets the criteria
    if (state.password && state.password.length < 8) {
      errors.passwordLength = "Password must be at least 8 characters long.";
    }

    // Check for other password validation rules as needed

    if (Object.keys(errors).length > 0) {
      // Display error message to the user
      setLoading(false);
      toast.error(Object.values(errors).join(" "), {
        position: "top-center",
        hideProgressBar: true,
      });
    } else {
      // Make API call to create admin
      axios
        .post(`${api}/admin/createAdmin`, state)
        .then((res) => {
          if (res.data.status) {
            toast.success(res.data.message, {
              position: "top-center",
              hideProgressBar: true,
            });
          }
          setLoading(false);
        })
        .catch((error) => {
          // Handle API call errors
          console.error("API error:", error);
          toast.error(
            error.response.data.message ||
              "An error occurred while processing your request.",
            {
              position: "top-center",
              hideProgressBar: true,
            }
          );
          setLoading(false);
        });
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit} className="admin-login-form">
        <h3 className="form-h1">Create Account</h3>

        {/* <span>or use your email for registration</span> */}
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button className="admin-login-button ">
          {loading ? "Sign Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
