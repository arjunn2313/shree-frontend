import axios from "axios";
import React, { useEffect, useState } from "react";
import { adminConfig, api } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function OrderAndStock() {
  const navigate = useNavigate();
  const [stock, setStock] = useState([]);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    axios
      .get(`${api}/product/lowstock`, adminConfig)
      .then((res) => {
        setStock(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${api}/order/get-allorders/?limit=5`, adminConfig)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(order);

  return (
    <div className="order-stock row ">
    <div className="border col-lg-7 col-md-12 bg-white border border-success rounded-3 " style={{width:"60%"}}>
      <div className="d-flex justify-content-between p-4">
        <h6 className="textColor fs-5 fw-medium">Orders</h6>
        <button
          className="btn border border-success textColor fw-medium"
          onClick={() => navigate("orders")}
        >
          View All
        </button>
      </div>
  
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sl. no.</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Order Id</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{order?.customerDetails?.firstName}</td>
                <td>{order?.shippingAddress?.state}</td>
                <td>{order?.customerDetails?.phone}</td>
                <td>
                  {order?.orderId}
                  {/* <ul>
                    {order?.orderItems?.map((order, pindx) => (
                      <li key={pindx}>{order?.product.productName}</li>
                    ))}
                  </ul> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  
    <div className="col-lg-5 col-md-12 bg-white rounded-3 border border-success" style={{width:"37%"}} >
      <h6 className="p-4 textColor fs-5 fw-medium">Low Stock</h6>
  
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((stock, index) => (
              <tr className="" key={index}>
                <th scope="row" className=" ">{stock.productCode}</th>
                <td>{stock.productName}</td>
                <td className="text-danger fw-medium">{stock.totalStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
  );
}
