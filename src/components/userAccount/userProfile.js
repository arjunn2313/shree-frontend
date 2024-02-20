import React, { useEffect, useState } from "react";
import UserInfo from "./userInfo";
import NavBar from "../navBar/navBar";
import "../../pages/user/user.css";
import Footer from "../footer/footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { api, config } from "../../api/api";
import { CiEdit } from "react-icons/ci";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";

 

export default function UserProfile() {
  const isAuth = useSelector((state) => state.user.token);
  const [userDetails, setUserDetails] = useState({});
  const [dpImg, setDpImg] = useState("");
  const [address, setAddress] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    axios
      .get(`${api}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then((res) => {
        setUserDetails(res.data);
        console.log(userDetails)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(()=>{
    axios.get(`${api}/address`,{
      headers : {
        Authorization :`Bearer ${localStorage.token}`
      }
    }).then((res)=>{
      setAddress(res.data)
      console.log(res.data)
    }).catch((error)=>{
      console.log(error)
    })
  },[])

  


  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", handleFileChange);
    fileInput.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUserDetails({
      ...userDetails,
      avatar: file,
    });
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setDpImg(imageUrl);
    }
  };

  const handleAddress = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  console.log(address);

  const handleSubmit = async () => {
    handleClose()
    try {
      // Create FormData for user update
      const userFormData = new FormData();
      userFormData.append("firstName", userDetails.firstName);
      userFormData.append("lastName", userDetails.lastName);
      userFormData.append("phone", userDetails.phone);
      userFormData.append("email", userDetails.email);
      if(dpImg !== ""){
        userFormData.append("avatar", userDetails.avatar);
      }
      
      if(userFormData){
        axios.post(`${api}/user/update`,userFormData,{
          headers:{
            Authorization : `Bearer ${localStorage?.token}`
          }
        })
      }

      if(address){
        axios.post(`${api}/address`, address,{
          headers:{
            Authorization : `Bearer ${localStorage?.token}`
          }
        })
      }

     
      // const [updateUserResponse, addAddressResponse] = await axios.all([
     
      //   axios.post(`${api}/address`, address,{
      //     headers:{
      //       Authorization : `Bearer ${localStorage.token}`
      //     }
      //   }),
      // ]);

      // // Handle responses
      // console.log("Update User Response:", updateUserResponse.data);
      // console.log("Add Address Response:", addAddressResponse.data);
 
      //      window.location.reload();

           toast.success("successfully Saved", {
            position: "top-center"
               });
      // If both requests were successful, you can redirect or perform other actions
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Error during form submission", {
        position: "top-center"
           });
    }
  };




  console.log(userDetails);

  return (
    <>
      <div className="container py-5 mt-5 rounded-3 create-account">
        <h5 className=" ps-3">Personal Information</h5>
        {/* details */}
        <div className="row px-4 pt-3">
          <div className="col-2 d-flex justify-content-center align-items-center">
            <div
              className="position-relative rounded-circle d-flex flex-column justify-content-center align-items-center"
              style={{ width: "150px", height: "150px", overflow: "hidden" }}
            >
              {dpImg ? (
                <img
                  src={dpImg}
                  alt="user-img"
                  className="border w-100 h-100 rounded-circle"
                  style={{ width: "80%", height: "80%" }}
                />
              ) : (
                <img
                  src={
                    userDetails.avatar
                      ? `${api}${userDetails.avatar}`
                      : "https://d2v9ipibika81v.cloudfront.net/uploads/sites/210/Profile-Icon.png"
                  }
                  alt="user-img"
                  className="border w-100 h-100 rounded-circle"
                  style={{ width: "80%", height: "80%" }}
                />
              )}

              <button
                className="w-100  image-edit text-center"
                onClick={handleUpload}
              >
                <CiEdit />
                Edit
              </button>
            </div>
          </div>

          <div className="col-5 d-flex flex-column justify-content-center align-items-start">
            <label className="form-label mb-3 fs-5 fw-medium">
              First Name<span>*</span>
            </label>
            <input
              type="text"
              className="form-control mb-4"
              placeholder="Enter your first name"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleChange}
            />

            <label className="form-label mb-3 fs-5 fw-medium">
              Phone Number<span>*</span>
            </label>
            <input
              type="text"
              className="form-control mb-4"
              placeholder="+91 98989 87878"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              disabled
            />
          </div>
        
          <div className="col-5 d-flex flex-column justify-content-center align-items-start">
            <label className="form-label mb-3 fs-5 fw-medium">Last Name</label>
            <input
              type="text"
              className="form-control mb-4"
              placeholder="Enter your first name"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleChange}
            />

            <label className="form-label mb-3 fs-5 fw-medium">
              Email<span>*</span>
            </label>
            <input
              type="text"
              className="form-control mb-4"
              placeholder="abcd@gmail.com"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* addres */}

      <div className="container px-3 py-5 mt-3 rounded-3 others">
        <h5 className="">Address Details</h5>

        <div className="my-3">
          <label className="form-label">
            Address<span className="text-danger fw-bold">*</span>
          </label>
          <textarea
            className="form-control text-area-like"
            placeholder="dummy content"
            rows="3"
            name="address"
            value={address.address}
            onChange={handleAddress}
          ></textarea>
        </div>

        {/* ////////////////// */}
        <div className="d-flex justify-content-between align-items-center mb-5 ">
          <div style={{ width: "45%" }}>
            <label className="form-label">
              Pincode<span className="text-danger fw-bold">*</span>
            </label>
            <input
             value={address.pincode}
              type="text"
              className="form-control"
              placeholder="dummy content"
              name="pincode"
              onChange={handleAddress}
            />
          </div>

          <div style={{ width: "45%" }}>
            <label className="form-label">
              City/District/Town<span className="text-danger fw-bold">*</span>
            </label>
            <input
            value={address.city}
              type="text"
              className="form-control"
              placeholder="dummy content"
              name="city"
              onChange={handleAddress}
            />
          </div>
        </div>

        {/* ////////////////// */}
        <div className="d-flex justify-content-between align-items-center mb-5 ">
          <div style={{ width: "45%" }}>
            <label className="form-label">
              State<span className="text-danger fw-bold">*</span>
            </label>
            <select
            value={address.state}
              class="form-select"
              aria-label="Default select example"
              name="state"
              onChange={handleAddress}
            >
              <option selected>---select state</option>
              <option value="Tamilnadu">Tamilnadu</option>
              <option value="kerala">kerala</option>
              <option value="karanataka">karanataka</option>
            </select>
          </div>

          <div style={{ width: "45%" }}>
            <label className="form-label">Landmark (optional)</label>
            <input
            value={address.landmark}
              type="text"
              className="form-control"
              placeholder="dummy content"
              name="landmark"
              onChange={handleAddress}
            />
          </div>
        </div>

        {/* ////////////////// */}
        <div className="d-flex justify-content-between align-items-center  ">
          <div style={{ width: "45%" }}>
            <label className="form-label">
              Country<span className="text-danger fw-bold">*</span>
            </label>
            <select
            value={address.country}
              class="form-select"
              aria-label="Default select example"
              name="country"
              onChange={handleAddress}
            >
              <option selected>Open this select menu</option>
              <option value="India">India</option>
              <option value="China">China</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center gap-5 profile-savebtn my-5">
        <button className="text-success bg-white fw-medium border border-success">
          Discard
        </button>
        <button
          className="text-white bg-success  fw-medium"
          onClick={handleShow}
          // onClick={handleSubmit}
        >
          Save
        </button>
        </div>


        {/* modal */}

        <>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you want to save your changes ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
}
