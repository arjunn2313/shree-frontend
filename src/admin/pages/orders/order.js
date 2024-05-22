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
import Form from "react-bootstrap/Form";

export default function AdminOrder() {
  const navigate = useNavigate();
  // const orders = useSelector((state) => state?.admin?.orders);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (category === "" && search ==="") {
      axios.get(`${api}/order/get-allorders`, adminConfig).then((res) => {
        setOrders(res.data);
      });
    } else if (category !== "" && search=="") {
      axios
        .get(`${api}/order/get-allorders?status=${category}`, adminConfig)
        .then((res) => {
          setOrders(res.data);
        });
    } else if (search !== "") {
      axios
        .get(`${api}/order/get-allorders?search=${search}`, adminConfig)
        .then((res) => {
          console.log(search);
          setOrders(res.data);
        });
    }
  }, [category,search]);


  const handleChange = (id, e) => {
    axios
      .put(`${api}/order/dispatch/${id}/${e.target.value}`, adminConfig)
      .then((res) => {
        dispatch(getAllCusOrders());
      })
      .catch((error) => {
        console.log(error);
      });
  };

 
  return (
    <div className="mx-auto bg-white mt-2 p-3" style={{ width: "98%" }}>
      {/* header */}

      <div className="row mb-3">
        <div className="col-6 d-flex  gap-5">
          <h5 className=" ">Orders</h5>

          <div className="border  px-3 d-flex gap-1 align-items-center rounded-3">
            Status:
            <Form.Select
              aria-label="Default select example"
              className="border-0"
              style={{ boxShadow: "none" }}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="Ordered">Pending</option>
              <option value="Dispatch">Dispatched</option>
              <option value="Cancel">Canceled</option>
            </Form.Select>
          </div>
        </div>

        <div className="col-6 d-flex justify-content-end gap-3">
          <div className="border px-3 d-flex gap-1 align-items-center rounded-3">
            Today
          </div>
          <div className="border rounded-1 px-1 d-flex  justify-content-center gap-2">
            <span className="d-flex align-items-center">
              <CiSearch className="fs-5" />
            </span>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 "
              placeholder="search..."
              style={{ outline: "none" }}
            />
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sl. no.</th>
              <th scope="col">Date</th>
              <th scope="col">Name</th>
              <th scope="col">Order Id</th>
              {/* <th scope="col">Contact Number</th> */}
              <th scope="col">Products</th>
              <th scope="col">Qut.</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ?
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
                    <td>{product?.customerDetails?.firstName}</td>
                    <td>{product?.orderId}</td>
                    {/* <td>{product?.shippingAddress?.city}</td> */}
                    {/* <td>{product?.customerDetails?.phone}</td> */}
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
              ))  : <h6 className="text-secondary text-center mt-1">No result found</h6>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
