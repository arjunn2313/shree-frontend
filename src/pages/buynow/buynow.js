import React, { useEffect, useState } from "react";
import Stepper from "../../components/stepper/stepper";
import Order from "../order/Order";
import BookingCard from "../../components/productCard/bookingCard";
import OTP from "../../components/userAccount/OTP";
import OrderAddrerss from "../order/orderAddrerss";
import Payment from "../../components/productCard/payment";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { api } from "../../api/api";
import { toast } from "react-toastify";
import "./buynow.css";

export default function Buynow() {
  const steps = ["Mobile", "Address", "Payment"];
  const [currentStep, setCurrentStep] = useState(1);
  const [otp, setOtp] = useState(false);
  const location = useLocation();
  const product = location.state;
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState({});
  const [address, setAddress] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchUser = () => {
      if (localStorage.token) {
        axios
          .get(`${api}/user`, {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          })
          .then((res) => {
            setUser(res.data);
            console.log(res.data);
          })
          .catch((error) => {});
      }
    };

    const fetchAddress = () => {
      if (localStorage.token) {
        axios
          .get(`${api}/address`, {
            headers: {
              Authorization: `Bearer ${localStorage?.token}`,
            },
          })
          .then((res) => {
            setAddress(res.data);
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    fetchAddress();
    fetchUser();
  }, [token]);

  const handleOtpReq = () => {
    if (user) {
      axios
        .post(`${api}/user/buynow/otp`, { phone: user.phone })
        .then((res) => {
          console.log(res.data);
          console.log(res.data.status);
          if (res.data.status = true) {
            setOtp(true);
            toast.success("OTP Sent Successfully", {
              position: "top-right",
              hideProgressBar:true
            });
          } else {
            toast.error("Failed to send OTP. Please try again.", {
              position: "top-right",
            });
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Internal Server Error. Please try after some time.", {
            position: "top-right",
          });
        });
      setOtp(true);
    }
  };

 
  const handleAddressUpdate = () => {
    try {
      axios.post(`${api}/address`, address, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid py-3">
    
      <div className="">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>

      <div className="container">
        {otp ? (
          <OTP
            user={user}
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
            setOtp={setOtp}
          />
        ) : (
          <div className="row ">
            <div className="col-md-6 mb-4">
              <BookingCard product={product} />
            </div>

            {currentStep === 1 && (
              <div className="col-md-6">
                <Order user={user} setUser={setUser} />
              </div>
            )}

            {currentStep === 2 && (
              <div className="col-md-6">
                <OrderAddrerss address={address} setAddress={setAddress} />
              </div>
            )}

            {currentStep === 3 && (
              <div className="col-md-6">
                <Payment product={product} user={user} address={address} />
              </div>
            )}

            <div className="col-12 d-flex justify-content-around align-items-center py-5">
              {currentStep === 1 && (
                <button
                  className="btn btn-success rounded-4 px-5 fw-medium py-2"
                  //  onClick={() => setOtp(true)}
                  onClick={handleOtpReq}
                >
                  Get OTP
                </button>
              )}

              {currentStep === 2 && (
                <button
                  className="btn btn-success rounded-4 px-5 fw-medium py-2"
                  //  onClick={()=>setCurrentStep(currentStep + 1)}
                  onClick={() => handleAddressUpdate()}
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
