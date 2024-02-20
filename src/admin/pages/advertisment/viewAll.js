import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ViewAllAdvertisment() {
  const navigate = useNavigate();
  const [advertisment, setAdvertisment] = useState([]);
  useEffect(() => {
    axios
      .get(`${api}/advertisment/getAll`)
      .then((res) => {
        setAdvertisment(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  const handleDelete = async (id) => {
    try {
      const deleteItem = await axios.delete(
        `http://localhost:6060/advertisment/delete/${id}`
      );
      if (deleteItem) {
        toast.success("Successfully deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(advertisment);
  return (
    <div className="px-5 py-3">
      <div className="advertismentButton d-flex justify-content-end">
        <button className="btn btn-success" onClick={() => navigate("add")}>
          Add Product
        </button>
      </div>

      <div className="row gap-4 d-flex justify-content-center mt-2">
        {advertisment &&
          advertisment.map((product, index) => (
            <div className="bg-white col-5 py-2 rounded-3" key={product._id}>
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
                  className="col-6 d-flex justify-content-center align-items-center gap-2 p-3  border-end text-danger fw-medium"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(product._id)}
                >
                  <RiDeleteBin6Line />
                  <span>Delete</span>
                </div>

                <div
                  className="col-6 d-flex justify-content-center align-items-center gap-2 p-3 text-success fw-medium"
                  style={{ cursor: "pointer" }}
                  onClick={()=>navigate(`add/${product._id}`)}
                >
                  <CiEdit />
                  <span>Edit</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
