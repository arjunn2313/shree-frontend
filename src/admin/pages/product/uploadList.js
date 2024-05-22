import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/api";
import Form from "react-bootstrap/Form";
export default function UploadList() {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (category === "" &&  search === "") {
      axios
        .get(`${api}/product`)
        .then((res) => {
          setProductData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (category !== "" && search === "") {
      axios
        .get(`${api}/product?category=${category}`)
        .then((res) => {
          setProductData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (search !== "") {
      axios
        .get(`${api}/product?search=${search}`)
        .then((res) => {
          setProductData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [category, search]);

  console.log(category);
  return (
    <div className="mx-auto bg-white mt-2 p-3" style={{ width: "98%" }}>
      <div className=" d-flex  w-100 justify-content-between bg-white p-3">
        <div className="d-flex w-50 justify-content-between">
          <h5>Product Details</h5>
          {/* <span className="d-flex align-items-center gap-3 border px-2 rounded-3">
            <IoFilterOutline />
            <span>Filters</span>
          </span> */}
          <div className="border px-3 d-flex gap-1 align-items-center rounded-3">
            category
            <Form.Select
              aria-label="Default select example"
              className="border-0"
              style={{ boxShadow: "none" }}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="Others">Others</option>
            </Form.Select>
          </div>
        </div>

        <div className="d-flex w-50 justify-content-evenly">
          <div className="border rounded-1 px-1 d-flex align-items-center justify-content-center gap-2">
            <span className="d-flex align-items-center">
              <CiSearch className="fs-5" />
            </span>
            <input
              type="text"
              className="border-0 "
              placeholder="search..."
              style={{ outline: "none" }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="text-white btn btn-success d-flex align-items-center gap-2"
            onClick={() => navigate("add")}
          >
            {" "}
            <FaPlus /> New Product
          </button>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Sl. no.</th>
            <th scope="col">Posted on</th>
            <th scope="col">Product code</th>
            <th scope="col">Category</th>
            <th scope="col">Sub Category</th>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">GST</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {productData &&
            productData.map((product, index) => (
              <tr
                key={product._id}
                onClick={() => navigate(`add/${product._id}`)}
                style={{ cursor: "pointer" }}
              >
                <th scope="row">{index + 1}</th>
                <td>{new Date(product.date).toLocaleDateString()}</td>
                <td>{product.productCode}</td>
                <td>{product.categories}</td>
                <td>{product.subCategories}</td>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>{product.gst}</td>
                <td className={`text-capitalize text-success ${product.status == "inactive" && "text-danger"}`}>{product?.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
