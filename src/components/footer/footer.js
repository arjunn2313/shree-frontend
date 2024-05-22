import React from "react";
import "./footer.css";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-child1 row">
        <div className="footer-title  col-12 col-md-6">
          <img src="assets\Untitled-1-01 1.png" className="img-fluid" id="footer-logo"/>
          <p className="footer-content ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            faucibus felis ut dui posuere, viverra porttitor dolor consequat
          </p>
        </div>
        <div className="col-4 col-md-2">
          <h6 className="footer-cat-h">About</h6>
          <ul className="list-unstyled pt-sm-4 d-flex flex-column gap-3 footer-list">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="products-list">
              <li>Products</li>
            </Link>

            <li>FAQs</li>
            <li>Reviews </li>
            <li>Stories</li>
          </ul>
        </div>
        <div className="col-4 col-md-2">
          <h6 className="footer-cat-h">Product</h6>
          <ul className="list-unstyled pt-sm-4 d-flex flex-column gap-3 footer-list">
            <li> Privacy</li>
            <li>Policy</li>
            <li>Payment</li>
            <li>Terms </li>
          </ul>
        </div>
        <div className="contact-num col-4 col-md-2">
          <h6 className="pb-4 footer-cat-h">Contact Us</h6>
          <p className="m-0">+91 87545 72039</p>
          <p className="m-0 text-break">support@cloths.com</p>
          <div className="d-flex gap-sm-4 gap-1 footer-icon pt-4">
            <FaSquareInstagram/>
            <FaLinkedin/>
            <FaSquareFacebook/>
            <FaTwitterSquare/>
            </div>
        </div>
      </div>
      <div className="footer-child-2">
        <div>© Copyright 2023 kevins.com , All rights reserved.</div>
        <div>Designed by spangles</div>
        <div className="d-flex gap-5">
          <span>Contact Us</span>
          <span>Terms</span>
        </div>
      </div>
    </div>
  );
}
