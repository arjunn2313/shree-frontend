import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { useReactToPrint } from "react-to-print";
 
export default function SingleOrderInvoice() {
  const [orders, setOrders] = useState();
  const { id } = useParams();
  const componentPdf = useRef();
  useEffect(() => {
    axios.get(`${api}/order/getsingle/${id}`).then((res) => {
      console.log(res.data);
      setOrders(res.data);
    });
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: "Expense",
  });


  return (
    <div className="container"  ref={componentPdf}>
      <div className="row bg-white m-2 p-2">
        <div className="col-6 py-2">
          <p>
            Invoice number :{" "}
            <span className="fw-medium">{orders?.orderId}</span>
          </p>
        </div>

        <div className="col-6 py-2">
          <button className="btn d-block float-end border border-success" onClick={()=>handlePrint()}>
            <AiOutlinePrinter /> Print
          </button>
        </div>

        <div className="col-6 d-flex py-3">
          <div className="col-6">
            <h6 className="mb-3">Company Name</h6>
            <h6 className="mb-3">Date of Dispatch</h6>
            <h6 className="mb-3">Contact Number</h6>
            <h6 className="mb-3">Email ID</h6>
            <h6 className="mb-3">Company Address</h6>
          </div>

          <div className="col-6  ">
            <h6 className="fw-normal mb-3">Shree Clothings</h6>
            <h6 className="fw-normal mb-3">07/12/2023</h6>
            <h6 className="fw-normal mb-2">+91 99999 88888</h6>
            <h6 className="fw-normal mb-2">sutharaniseets@gmail.com</h6>
            <h6 className="fw-normal mb-2">
              XYZ, ABCDE, dgjdgj, Thoothukudi, Tamil Nadu India 600 002
            </h6>
          </div>
        </div>

        <div className="col-6 border-start d-flex py-3">
          <div className="col-6">
            <h6 className="mb-3">Customer Name</h6>
            <h6 className="mb-3">Date of Order</h6>
            <h6 className="mb-3">Contact Number</h6>
            <h6 className="mb-3">Email ID</h6>
            <h6 className="mb-3">Billing Address</h6>
          </div>

          <div className="col-6 fs-6 ">
            <h6 className="fw-normal mb-3">
              {orders?.customerDetails?.firstName}
            </h6>
            <h6 className="fw-normal mb-3">
              {orders && new Date(orders.createdAt).toLocaleDateString()}
            </h6>
            <h6 className="fw-normal mb-3">{orders?.customerDetails?.phone}</h6>
            <h6 className="fw-normal mb-3">{orders?.customerDetails?.email}</h6>
            <h6 className="fw-normal mb-3">
              {orders?.shippingAddress?.address},{" "}
              {orders?.shippingAddress?.city}, {orders?.shippingAddress?.state},<br/>
              {orders?.shippingAddress?.pincode}
            </h6>
          </div>
        </div>
      </div>

      <div className="row m-2 bg-white py-2">
        <div className="mt-3 bg-white">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Sl.no.</th>
                <th scope="col">Product Code</th>
                <th scope="col">Category</th>
                <th scope="col">Sub Category</th>
                <th scope="col">Produt Name</th>
                <th scope="col">Size</th>
                <th scope="col">Colour</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {orders?.orderItems?.map((product, index) => (
                <tr>
                  <th scope="row">0{index + 1}</th>
                  <td>{product?.product?.productCode}</td>
                  <td>{product?.product?.categories}</td>
                  <td>{product?.product?.subCategories}</td>
                  <td>{product?.product?.productName}</td>
                  <td>{product?.size}</td>
                  <td className="">
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: product.color,
                        borderRadius: "4px",
                      }}
                    ></div>
                  </td>
                  <td>{product?.quantity}</td>
                  <td>{product?.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex flex-column align-items-end justify-content-end">
            <div className="d-flex w-25 justify-content-center align-items-center gap-5">
              <span>Subtotal :</span>
              <span>Rs. 200</span>
            </div>

            <div className="d-flex w-25 justify-content-center align-items-center gap-5 border-bottom p-2">
              <span>Gst (10%) :</span>
              <span>Rs. 200</span>
            </div>

            <div className="d-flex w-25 justify-content-center align-items-center gap-5 p-2">
              <span>Total :</span>
              <span>Rs. {orders?.totalPrice}</span>
            </div>
          </div>
        </div>

   
      </div>

      <div className="mt-2">
        <button className="btn btn-success btn-lg d-block col-2 float-end" >Save</button>
      </div>
    </div>
  );
}
