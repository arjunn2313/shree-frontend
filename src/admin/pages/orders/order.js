import React, { useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api, adminConfig } from "../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatus,
  getAllCusOrders,
} from "../../../services/admin/adminSlice";

export default function AdminOrder() {
  const navigate = useNavigate();
  const orders = useSelector((state) => state?.admin?.orders);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getAllCusOrders());
  }, []);

  // const handleChange = (id, e) => {
  //   console.log(e.target.value);
  //   setStatus(e.target.value);

  //   if (status) {
  //     setStatus(e.target.value);
  //     setTimeout(() => {
  //       dispatch(changeStatus({ id, status }));
  //     }, 300);
  //   }
  // };

  const handleChange = (id, e) => {
        axios
          .put(
            `http://localhost:6060/order/dispatch/${id}/${e.target.value}`,
            adminConfig
          )
          .then((res) => {
            dispatch(getAllCusOrders());
          })
          .catch((error) => {
            console.log(error);
          });
      }
 

  console.log(status);
  return (
    <div className="mx-auto bg-white mt-2" style={{ width: "98%" }}>
      {/* header */}
      <div className=" d-flex  w-100 justify-content-between bg-white p-3">
        <div className="d-flex w-50 gap-4">
          <h5>Orders</h5>
          <span className="d-flex align-items-center gap-3 border px-2 rounded-3">
            <IoFilterOutline />
            <span>Filters</span>
          </span>
          <div className="border px-3 d-flex gap-1 align-items-center rounded-3">
            category:
            <select className="border-0">
              <option>All</option>
              <option>2</option>
            </select>
          </div>

          <div className="border px-3 d-flex gap-1 align-items-center rounded-3">
            Product
            <select className="border-0">
              <option>All</option>
              <option>2</option>
            </select>
          </div>
        </div>

        <div className="d-flex w-50  gap-3  align-items-end justify-content-end">
          <div className="border px-3 d-flex gap-1 align-items-center rounded-3">
            Today
          </div>
          <div className="border rounded-1 px-1 d-flex  justify-content-center gap-2">
            <span className="d-flex align-items-center">
              <CiSearch className="fs-5" />
            </span>
            <input
              type="text"
              className="border-0 "
              placeholder="search..."
              style={{ outline: "none" }}
            />
          </div>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Sl. no.</th>
            <th scope="col">Date</th>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Contact Number</th>

            <th scope="col">Products</th>
            <th scope="col">Qut.</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders &&
            orders.map((product, index) => (
              <React.Fragment key={product._id}>
                <tr
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    // Check if the clicked element is not a select
                    if (e.target.tagName !== "SELECT") {
                      navigate(`detailed-view/${product._id}`);
                    }
                  }}
                >
                  <th scope="row">{index + 1}</th>
                  <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                  <td>{product.userID.firstName}</td>
                  <td>{product.address.city}</td>
                  <td>{product.userID.phone}</td>
                  <td>
                    <ul>
                      {product?.orderItems?.map((order, pindx) => (
                        <li key={pindx}>{order?.product?.productCode}</li>
                      ))}
                    </ul>
                  </td>

                  <td>
                    <ul>
                      {product?.orderItems?.map((order, pindx) => (
                        <li key={pindx}>{order?.quantity}</li>
                      ))}
                    </ul>
                  </td>

                  <td>{product.totalPrice}</td>
                  {/* <td>{product.orderStatus}</td> */}

                  {product?.orderStatus === "Ordered" && (
                    <td>
                      <select
                        className="border-0"
                        style={{ outline: "none" }}
                        value={status}
                        onChange={(e) => handleChange(product._id, e)}
                      >
                        <option>{product.orderStatus}</option>
                        <option className="text-success" value="Dispatch">
                          Dispatch
                        </option>
                        <option className="text-danger" value="Cancel">
                          Cancel
                        </option>
                      </select>
                    </td>
                  )}

                  {product?.orderStatus === "Dispatch" && (
                    <td className="text-success fw-medium">Dispatched</td>
                  )}

                  {product?.orderStatus === "Cancel" && (
                    <td className="text-danger fw-medium">Canceled</td>
                  )}
                </tr>
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
}
