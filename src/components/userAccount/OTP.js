import React, { useEffect, useRef, useState } from "react";
import NavBar from "../navBar/navBar";
import "../../pages/user/user.css";
import Footer from "../footer/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/reducer";
import { toast } from "react-toastify";
import { registerUser } from "../../services/user/userSlice";
import { api } from "../../api/api";

export default function OTP({ user, setCurrentStep, currentStep, setOtp }) {
  const inputRefs = initializeInputRefs({ user });
  const [entry, setEntry] = useState("");
  const navigate = useNavigate();
  const [timer, setTimer] = useState(60); // Initial timer value in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const last3Digits = user && user.phone.slice(-3);
  const dispatch = useDispatch();

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false); // Enable resend button when timer reaches zero
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleInputChange = (index, e) => {
    const input = e.target;
    const value = input.value;

    if (value.length === 1 && index < inputRefs.length - 1) {
      // Move focus to the next input
      inputRefs[index + 1].current.focus();
    }
    // Update the entry state with the new value
    setEntry((prevEntry) => {
      const newEntry =
        prevEntry.slice(0, index) + value + prevEntry.slice(index + 1);
      return newEntry;
    });
  };

  if (user) {
    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("phone", user.phone);
    formData.append("email", user.email);
    formData.append("avatar", user.avatar);
    formData.append("otp", entry);
  }

  const handleVerify = async () => {
    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("phone", user.phone);
    formData.append("email", user.email);
    formData.append("avatar", user.avatar);
    formData.append("otp", entry);
     
    dispatch(registerUser(formData));
    navigate("/");
  };

  const handleResend = async () => {
    setIsResendDisabled(true);
    setTimer(60);
    try {
      await axios.post("http://localhost:6060/user/otp", { phone: user.phone });
      toast.success("OTP Sent Successfully", {
        position: "top-right",
        hideProgressBar:true
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleStep = async () => {
    try {
      const requestBody = {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        otp: entry,
      };
  
      const res = await axios.post(`${api}/user/buynow/verify`, requestBody);
  
      if (res.status === 200) {
        toast.success("Verification successful!", {
          position: "top-right",
          hideProgressBar:true
        });
        setCurrentStep(currentStep + 1);
        localStorage.setItem("token", res.data.token);
        setOtp(false);
      } else {
        console.error("Verification failed:", res.data);
        toast.error("Incorrect OTP. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Verification failed. Please try again.", {
        position: "top-right",
      });
    }
  };
  

  return (
    <>
  <div className="container border border-success rounded-4 py-5 my-5">
    <h3 className="text-center">
      Please enter the one-time password <br /> to verify
    </h3>
    <h6 className="text-center text-secondary fs-5 py-4">
      A code has been sent to *******{last3Digits}
    </h6>

    <div className="d-flex align-items-center justify-content-evenly py-4">
      {inputRefs.map((ref, index) => (
        <div key={index} className="otp-inp">
          <input
            ref={ref}
            type="tel"
            maxLength="1"
            pattern="[0-9]*"
            onChange={(e) => handleInputChange(index, e)}
            style={{ fontSize: '16px', width: '4rem', height: '4rem' }}  
          />
        </div>
      ))}
    </div>

    {isResendDisabled ? (
      <p className="text-center text-secondary">
        Resend One-Time Password in
        {timer > 0 && (
          <span style={{ color: "green" }}>
            {" "}
            in {Math.floor(timer / 60)}:
            {(timer % 60).toString().padStart(2, "0")} minutes
          </span>
        )}
      </p>
    ) : (
      <p className="text-center text-secondary" onClick={handleResend}>
        Resend One-Time Password
      </p>
    )}
  </div>

  <div className="my-5 d-flex justify-content-center align-items-center">
    {setCurrentStep ? (
      <button className="otp-btn fs-5" onClick={handleStep}>
        Verify
      </button>
    ) : (
      <button className="otp-btn fs-5" onClick={handleVerify}>
        Verify
      </button>
    )}
  </div>
</>

  );
}

// Helper function to initialize refs
function initializeInputRefs() {
  return Array.from({ length: 6 }, () => useRef(null));
}
