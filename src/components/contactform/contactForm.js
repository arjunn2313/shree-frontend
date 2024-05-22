import React, { useState } from "react";
import "./contactForm.css";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { api } from "../../api/api";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    inquiryType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      axios
        .post(`${api}/contact`, formData)
        .then((res) => {
          toast.success("Thank you! your message has been sent", {
            position: "top-center",
            hideProgressBar: true,
          });

          setFormData({
            fullName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            inquiryType: "",
            message: "",
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong please try after sometime", {
            position: "top-center",
            hideProgressBar: true,
          });
          setLoading(false);
        });
    } else {
      setErrors(errors);
      setLoading(false);
    }
  };

  const validateForm = (formData) => {
    let errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!/^[0-9]+$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone Number should contain only digits";
    } else if (formData.phoneNumber.trim().length !== 10) {
      // Assuming phone numbers are 10 digits long
      errors.phoneNumber = "Phone Number should be 10 digits long";
    }

    if (!formData.inquiryType.trim()) {
      errors.inquiryType = "Please select an inquiry type";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    return errors;
  };

  return (
    <div className="contact">
      <div className="text-center pt-5 pb-5">
        <h2 className="contact-header">Contact Us</h2>
        <h6 className="contact-title" style={{ color: "#646464" }}>
          Any question or remarks? Just write us a message!
        </h6>
      </div>

      <div className="container contact-form">
        <div className="row pt-5 pb-3 ps-2 pe-2">
          <div className="col-lg-6 mb-3 p-0  ps-sm-5">
            <h3 className="contact-header">Contact Information</h3>

            <div className="d-flex flex-column gap-sm-5 gap-3 justify-content-center pt-3">
              <div className="d-flex gap-3 align-items-center">
                <FaPhoneVolume />
                <span className="contact-title">+91 9898 72039</span>
              </div>

              <div className="d-flex gap-3 align-items-center">
                <MdEmail />
                <span className="contact-title">cloths@brand.com</span>
              </div>

              <div className="d-flex gap-3 align-items-center">
                <FaLocationDot />
                <span className="contact-title">
                  cloths <br />
                  N.M.Road,(Opp. to Avadi Town <br />
                  Ship),Avadi, Chennai - 600 054.
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-6 pe-sm-5 p-0">
            <form className="form row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label className="form-label contact-label">Full Name</label>
                <input
                  type="text"
                  className={`form-control border-0 border-bottom ${
                    errors.fullName ? "is-invalid" : ""
                  }`}
                  style={{ outline: "none", boxShadow: "none" }}
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <div className="invalid-feedback">{errors.fullName}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label contact-label">Last Name</label>
                <input
                  type="text"
                  className={`form-control border-0 border-bottom ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  style={{ outline: "none", boxShadow: "none" }}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label contact-label">Email</label>
                <input
                  type="text"
                  className={`form-control border-0 border-bottom ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  style={{ outline: "none", boxShadow: "none" }}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label contact-label">Phone Number</label>
                <input
                  type="text"
                  className={`form-control border-0 border-bottom ${
                    errors.phoneNumber ? "is-invalid" : ""
                  }`}
                  style={{ outline: "none", boxShadow: "none" }}
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && (
                  <div className="invalid-feedback">{errors.phoneNumber}</div>
                )}
              </div>

              <div className="col-12">
                <div className="d-flex gap-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inquiryType"
                      id="flexRadioDefault1"
                      value="General Inquiry"
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label contact-label"
                      htmlFor="flexRadioDefault1"
                    >
                      General Inquiry
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inquiryType"
                      id="flexRadioDefault2"
                      value="About Products"
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label contact-label"
                      htmlFor="flexRadioDefault2"
                    >
                      About Products
                    </label>
                  </div>
                </div>
                {errors.inquiryType && (
                  <div className="invalid-feedback">{errors.inquiryType}</div>
                )}
              </div>

              <div className="col-12">
                <label className="form-label contact-label">Message</label>
                <textarea
                  className={`form-control border-0 border-bottom ${
                    errors.message ? "is-invalid" : ""
                  }`}
                  rows="1"
                  style={{ outline: "none", boxShadow: "none" }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && (
                  <div className="invalid-feedback">{errors.message}</div>
                )}
              </div>

              <div className="col-12 p-sm-5 d-flex justify-content-end">
                <button
                  className="contact-btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
