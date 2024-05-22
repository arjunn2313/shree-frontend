import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/api";

export default function SingleOrder() {
  const { id } = useParams();
  const [orders, setOrders] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${api}/order/getsingle/${id}`).then((res) => {
      console.log(res.data);
      setOrders(res.data);
    });
  }, []);
  return (
    <div className="m-3">
      <div className="bg-white p-3">
        <div className="fw-medium">Customer Details</div>

        <div className="row gap-3 py-4">
          <div className="col-3">Customer Name</div>
          <div className="col-8">{orders?.userID?.firstName}</div>

          <div className="col-3">Date of Order</div>
          <div className="col-8">
            {new Date(orders?.createdAt).toLocaleDateString()}
          </div>

          <div className="col-3  ">Contact Number</div>
          <div className="col-8">{orders?.userID?.phone}</div>

          <div className="col-3  ">Email ID</div>
          <div className="col-8">{orders?.userID?.email}</div>

          <div className="col-3">Billing Address</div>
          <div className="col-8 d-flex flex-column">
            <span>{orders?.address?.address}</span>
            <span>{orders?.address?.city}</span>
            <span>{orders?.address?.state}</span>
            <span>{orders?.address?.country}</span>
          </div>
        </div>
      </div>

      {/* sadasa */}
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
            {orders?.orderItems?.map((product,index) => (
              <tr>
                <th scope="row">0{index + 1}</th>
                <td>{product?.product?.productCode}</td>
                <td>{product?.product?.categories}</td>
                <td>{product?.product?.subCategories}</td>
                <td>{product?.product?.productName}</td>
                <td>{product?.size}</td>
                <td className="">
                    <div style={{width:"20px",height:"20px",backgroundColor:product.color,borderRadius:"4px"}}></div>
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
                <span>Total  :</span>
                <span>Rs. {orders.totalPrice}</span>
            </div>

        </div>
      </div>

      <div className="d-flex float-end py-4">
        <button className="btn btn-success btn-lg" onClick={()=>navigate('invoice')}>Generate Invoice</button>
      </div>
    </div>
  );
}
