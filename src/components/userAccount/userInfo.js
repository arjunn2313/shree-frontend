import axios from "axios";
import React, { useEffect, useState } from "react";
import OTP from "./OTP";
import { useLocation } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { api } from "../../api/api";
import { useSelector } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

export default function UserInfo() {
  const [otpSent,setOtpSent] = useState(false)
  const token = useSelector((state)=>state?.auth?.user?.token)
 

  const [userDetails, setUserDetails] = useState({
    firstName:"",
    lastName:"",
    phone:"",
    email:"",
    avatar:"",
  });
  const [errors,setErrors] = useState({})
  const [buttonClick,setButtonClick] = useState(false)

   
  const [dpImg,setDpImg] = useState('')
  const loaction=useLocation()
  console.log(userDetails);
 console.log(loaction);
  const handleChange = (e) =>{
    setUserDetails({...userDetails,[e.target.name]:e.target.value})
  }

  useEffect(()=>{
    window.scrollTo(0, 0);
   },[])

  const handleOtp = () =>{
      setButtonClick(true)
      const error = {}

      if (!userDetails.firstName) {
        error.firstName = '*Please provide a name';
      } else if (userDetails.firstName.length < 3 || /^\d+$/.test(userDetails.firstName)) {
        error.firstName = '*Name must be at least 3 characters long and should not contain numbers';
      }

      if (!userDetails.phone) {
        error.phone = '*Please provide a mobile number';
      } else {
        const mobileNumberRegex = /^\+\d{2}\d{10}$/;
        if (!mobileNumberRegex.test(userDetails.phone)) {
          error.phone= '*Invalid mobile number. Please enter a valid mobile number with the country code.';
        }
      }

      if (!userDetails.email) {
        error.email = 'Please provide an email address';
      } else {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(userDetails.email)) {
          error.email = 'Invalid email address. Please enter a valid email address.';
        }
      }
      

      if(Object.keys(error).length > 0){
        setErrors(error)
        setButtonClick(false)
      }else{
       setErrors('')
       axios.post(`${api}/user/otp`,{ phone: userDetails.phone }).then((res)=>{
        console.log(res.data)
        console.log(res.data.status)
        if(res.data.status){
       setOtpSent(true)
       toast.success("OTP Sent Successfully", {
        position: "top-right"
           });
        } 
         }).catch((error)=>{
             setButtonClick(false)
             console.log(error);
              toast.error("Internal Server Error, Please try after some time", {
             position: "top-right"
                });
         })
      }
  }

  const handleUpload = () =>{
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', handleFileChange);
    fileInput.click();
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUserDetails({
      ...userDetails,
      avatar: file,
  });
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setDpImg(imageUrl)

  }
  };


  return (
    <>
    <ToastContainer/>
    {otpSent ? <OTP user={userDetails}/> : <> <div className="container py-5 mt-5 rounded-3 create-account">
        <h5 className=" ps-3">Personal Information</h5>
        {/* details */}
        <div className="row px-4 pt-3">
          <div className="col-2 d-flex justify-content-center align-items-center">
            <div className="position-relative rounded-circle d-flex flex-column justify-content-center align-items-center" style={{width:'150px',height:"150px",overflow:"hidden"}}>
         {userDetails.avatar ? 
         <img
         src={dpImg}
         alt="user-img"
         className="border w-100 h-100 rounded-circle"
         style={{ width: "80%", height: "80%" }}
       /> 
       :
            <img
            src="https://d2v9ipibika81v.cloudfront.net/uploads/sites/210/Profile-Icon.png"
            // src="https://www.svgrepo.com/show/452030/avatar-default.svg"
              // src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt="user-img"
              className="border w-100 h-100 rounded-circle"
              style={{ width: "80%", height: "80%" }}
            /> }
            <button className="w-100  image-edit text-center" onClick={handleUpload}>< CiEdit/>Edit</button>
            </div>
          </div>

          <div className="col-5 d-flex flex-column justify-content-center align-items-start">
            <label className="form-label mb-3 fs-5 fw-medium">
              First Name<span style={{color:'red'}}>*</span>
            </label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter your first name"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleChange}
            />
          {errors.firstName && <span className="form-error">{errors.firstName}</span>}
            <label className="form-label mb-3 fs-5 fw-medium">
              Phone Number<span style={{color:'red'}}>*</span>
            </label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="+91 98989 87878"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>

          <div className="col-5 d-flex flex-column justify-content-center align-items-start">
            <label className="form-label mb-3 fs-5 fw-medium">Last Name</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter your first name"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleChange}
            />
             

            <label className="form-label mb-3 fs-5 fw-medium">
              Email<span style={{color:'red'}}>*</span>
            </label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="abcd@gmail.com"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
            />
             {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
        </div>
      </div>


   {buttonClick ?
   <div className="my-5 d-flex justify-content-center align-items-center">
   <button className="otp-btn" disabled>
   <Spinner animation="border" size="sm"/>
   </button>
   </div>
      : <div className="my-5 d-flex justify-content-center align-items-center">
        <button className="otp-btn" onClick={handleOtp}>Get OTP</button>
      </div>}

      
    
   {/* {loaction.pathname =='/user-account' &&
     <div className="my-5 d-flex justify-content-center align-items-center">
        <button className="otp-btn" onClick={handleOtp}>Get OTP</button>
      </div>
      } */}
      </>}
     
    </>
  );
}
