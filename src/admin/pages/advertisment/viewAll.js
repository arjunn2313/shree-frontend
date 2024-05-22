import axios from "axios";
import React, { useEffect, useState } from "react";
import { adminConfig, api } from "../../../api/api";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";

export default function ViewAllAdvertisment() {
  const navigate = useNavigate();
  const [advertisment, setAdvertisment] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${api}/advertisment/getAll`,adminConfig);
      setAdvertisment(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const deleteItem = await axios.delete(`${api}/advertisment/delete/${id}`,adminConfig);
      if (deleteItem) {
        toast.success("Successfully deleted", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
        fetchData()
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(advertisment);
  return (
    <div className="container mt-3">
      <div className="advertismentButton d-flex justify-content-end p-3">
        <button
          className="btn btn-success col-md-2 d-flex justify-content-center align-items-center gap-2"
          onClick={() => navigate("add")}
        >
          <FaPlus size={20} />
          Add Product
        </button>
      </div>

      <div className="row mt-4">
        {advertisment.map((product, index) => (
          <div className="col-lg-6 col-md-12 mb-4 " key={product._id}>
            <div className="bg-white py-2 rounded-3 p-3">
              <p className="TColor fw-medium">Product No. : 0{index + 1}</p>

              <div className="d-flex gap-5 border-bottom pb-3">
                <img
                  src={`${api}${product?.image}`}
                  className="rounded-2"
                  alt="img"
                  style={{ width: "100px", height: "100px" }}
                />

                <div>
                  <p className="TColor fw-medium">Product Category</p>
                  <span className="fw-medium">{product.categories}</span>
                </div>
              </div>

              <div className="row py-1">
                <div
                  className="col-6 d-flex justify-content-center align-items-center gap-2 p-3 border-end text-danger fw-medium"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(product._id)}
                >
                  <RiDeleteBin6Line />
                  <span>Delete</span>
                </div>

                <div
                  className="col-6 d-flex justify-content-center align-items-center gap-2 p-3 text-success fw-medium"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`add/${product._id}`)}
                >
                  <CiEdit />
                  <span>Edit</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
