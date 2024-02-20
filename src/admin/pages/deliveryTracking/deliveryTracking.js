import React, { useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { CgCalendarDates } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getDispatched } from "../../../services/admin/adminSlice";
import TrackIdMoadal from "./trackingModal";

export default function DeliveryTracking() {
  const dispatchOrders = useSelector(
    (state) => state?.admin?.dispatched?.dispatchedOrders
  );
  const[id,setId] = useState()

 
  const [lgShow, setLgShow] = useState(false);
  const dispatch = useDispatch();
  const heading = [
    "Sl. no.",
    "Date",
    "Name",
    "Location",
    "Contact Number",
    "Products",
    "Price",
    "Tracking ID",
  ];

  useEffect(() => {
    dispatch(getDispatched());
  }, []);

  return (
    <div className="mx-auto bg-white mt-2" style={{ width: "98%" }}>
      {/* header */}
      <div className=" d-flex  w-100 justify-content-between bg-white p-3">
        <div className="d-flex w-50 gap-4">
          <h5>Delivery Tracking</h5>
        </div>

        <div className="d-flex w-50  gap-3  align-items-end justify-content-end">
          <button className="btn border d-flex justify-content-center align-items-center gap-2">
            Today
            <CgCalendarDates />
          </button>
          <div className="border rounded-1 px-1 d-flex  justify-content-center gap-2">
            <span className="d-flex align-items-center">
              <CiSearch className="fs-5" />
            </span>
            <input
              type="text"
              className="border-0 p-1"
              placeholder="search..."
              style={{ outline: "none" }}
            />
          </div>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            {heading.map((heading) => (
              <th>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody></tbody>

        <tbody>
          {dispatchOrders?.map((product, index) => (
          
            <tr>
               
              <td>{index + 1}</td>
              <td>{new Date(product.dispatchedAt).toLocaleDateString()}</td>
              <td>{product?.userID?.firstName}</td>
              <td>{product?.address?.state}</td>
              <td>{product?.userID?.phone}</td>
              <td>{product?.orderItems?.length}</td>
              <td>Rs. {product?.totalPrice}</td>
              {product?.trackNumber ?
               <td>{product.trackNumber}</td>
               :
               <td className="text-success" 
               onClick={() =>{
                setId(product?.userID?.firstName)
                setLgShow(true)
               } }
               style={{ textDecoration: "underline",cursor:"pointer"}}>Enter track Id</td>
               }
             
            </tr>
           
          ))}
        </tbody>
      </table>
      <TrackIdMoadal lgShow={lgShow} setLgShow={setLgShow} id={id}/>
    </div>
  );
}
