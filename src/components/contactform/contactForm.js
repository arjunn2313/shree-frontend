import React from "react";
import "./contactForm.css";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function ContactForm() {
  return (
    <div className="contact">
      <div className="text-center pt-5 pb-5">
        <h2>Contact Us</h2>
        <h6 style={{ color: "#646464" }}>
          Any question or remarks? Just write us a message!
        </h6>
      </div>

      <div className="contact-form container">
        <div className="row pt-5 pb-3 ps-2 pe-2">
          <div className="col-6 ">
            <h3>Contact Information</h3>

            <div className="d-flex flex-column gap-5 justify-content-center pt-3">
              <div className="d-flex gap-3 align-items-center">
                <FaPhoneVolume />
                <span>+91 9898 72039</span>
              </div>

              <div className="d-flex gap-3 align-items-center">
                <MdEmail />
                <span>cloths@brand.com</span>
              </div>

              <div className="d-flex gap-3 align-items-center">
                <FaLocationDot />
                <span>
                  cloths <br />
                  N.M.Road,(Opp. to Avadi Town <br />
                  Ship),Avadi, Chennai - 600 054.
                </span>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div>
              <form className="form row g-3">
                <div className="col-6">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control border-0 border-bottom"
                  />
                </div>

                <div className="col-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control border-0 border-bottom"
                  />
                </div>

                <div className="col-6">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control border-0 border-bottom"
                  />
                </div>

                <div className="col-6">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control border-0 border-bottom"
                  />
                </div>

                <div className="col-12">
                  
                  <div className="d-flex gap-4">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                    General Inquiry
                    </label>
                    </div>
                    <div className="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                    About Products
                    </label>
                    </div>
                    </div>
                </div>

                <div className="col-12">
                  <label className="form-label">Message</label>
                  <input
                    type="text"
                    className="form-control border-0 border-bottom"
                  />
                </div>


                <div className="col-12 p-5 d-flex justify-content-end">
                    <button className='contact-btn'>Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
