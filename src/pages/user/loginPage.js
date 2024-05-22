import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./user.css";
import axios from "axios";
import { api } from "../../api/api";
import { toast } from "react-toastify";
import OtpForm from "../../components/OTP Form/OtpForm";
 

 
const LoginPageUser = () => {
  const[otpReceived,setOtpReceived] = useState(false)
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = {};
    setLoading(true);

    if (!phone) {
      error.phone = "*Please provide a mobile number";
    } else {
      const mobileNumberRegex = /^\+\d{2}\d{10}$/;
      if (!mobileNumberRegex.test(phone)) {
        error.phone =
          "*Invalid mobile number. Please enter a valid mobile number with the country code.";
      }
    }

    if (Object.keys(error).length > 0) {
      setShow(true);
      setErrors(error);
      setLoading(false);
    } else {
      axios
        .post(`${api}/user/login/otp`, { phone })
        .then((res) => {
          toast.success(res.data.message, {
            position: "top-center",
            hideProgressBar: true,
          });
          setOtpReceived(true)
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error);
          console.log(error.response.data.message);
        });
    }
  };

  return (
    <>
    {otpReceived ? <OtpForm user={phone}/> :  <div className="sign-in__wrapper">
    {/* Overlay */}
    <div className="sign-in__backdrop"></div>
    {/* Form */}
    <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
      {/* Header */}
      <img
        className="img-thumbnail mx-auto d-block mb-2"
        src="assets\Untitled-1-01 1.png"
        alt="logo"
      />
      <div className="h4 mb-2 text-center">Sign In</div>
      {/* ALert */}
      {show ? (
        <Alert
          className="mb-2"
          variant="danger"
          onClose={() => setShow(false)}
          dismissible
        >
          {errors.phone && errors.phone}
        </Alert>
      ) : (
        <div />
      )}
      <Form.Group className="mb-4" controlId="username">
        <Form.Label className="fw-medium">Mobile Number </Form.Label>
        <Form.Control
          type="text"
          value={phone}
          placeholder=""
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </Form.Group>

      {!loading ? (
        <Button className="w-100" variant="primary" type="submit">
          Request OTP
        </Button>
      ) : (
        <Button className="w-100" variant="primary" type="submit" disabled>
          Requesting...
        </Button>
      )}
      <div className="d-grid mt-3 justify-content-end">
        <Button className="text-muted px-0" variant="link">
          New to Shree clothings? Create an account
        </Button>
      </div>
    </Form>
    {/* Footer */}
  </div>}
  </>
  );
};

export default LoginPageUser;
