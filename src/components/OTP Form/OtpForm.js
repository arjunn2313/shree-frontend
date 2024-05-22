import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "./otp.css";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

function OtpForm({ user }) {
  const inputRefs = initializeInputRefs({ user });
  const [entry, setEntry] = useState("");
  const [timer, setTimer] = useState(60); // Initial timer value in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const last3Digits = user && user.slice(-3);
  const navigate = useNavigate()
  const[loading,setLoading] = useState(false)

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

  const handleResend = async () => {
    setIsResendDisabled(true);
    setTimer(60);
    try {
      await axios.post("http://localhost:6060/user/otp", { phone: user.phone });
      toast.success("OTP Sent Successfully", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerify = () => {
    setLoading(true)
    axios.post(`${api}/user/login/verify`, { phone: user, otp: entry })
      .then((res) => {
        if(res.data.status == true){
          toast.success("login successfully",{
            position:"top-center",
            hideProgressBar:true
          })
           setLoading(false)
          localStorage.setItem("token",res.data.token)
          navigate("/")
          window.location.reload();
        }
      })
      .catch((error) => {
         toast.error(error.response.data.message || "Something went wrong try after sometime",{
          position:'top-center',
          hideProgressBar:true
         })
         setLoading(false)
      });
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
            <div key={index}>
              <input
                ref={ref}
                type="tel"
                maxLength="1"
                pattern="[0-9]*"
                className="otp-input "
                onChange={(e) => handleInputChange(index, e)}
                // style={{ fontSize: "16px", width: "2rem", height: "2rem" }}
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
       {loading ? <button className="otp-btn fs-5" onClick={handleVerify} disabled>
          Verifying...
        </button> : 
        <button className="otp-btn fs-5" onClick={handleVerify} disabled={entry.length < 6}>
        Verify 
      </button>
        }
      </div>
    </>
  );
}

// Helper function to initialize refs
function initializeInputRefs() {
  return Array.from({ length: 6 }, () => useRef(null));
}

export default OtpForm;
