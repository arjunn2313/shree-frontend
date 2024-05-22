import React, { useEffect, useState } from "react";
import "./product.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../../api/api";
import { IoWarningOutline } from "react-icons/io5";
import Dropdown from "react-bootstrap/Dropdown";

export default function AdminProductDetails() {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`${api}/product/admin/${id}`)
        .then((res) => {
          setProductData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (productData.status) {
      setSelectedStatus(productData.status);
    }
  }, [productData]);
  

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`${api}/product/${id}`);
      console.log("Product deleted successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  console.log(productData);
  console.log(location);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;

    setSelectedStatus(newStatus); // Update the selected status

    try {
      const response = await axios.put(`${api}/product/product-status/${id}`, {
        status: newStatus,
      });
      alert(response.data.status);
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  return (
    <div className="product-detailss rounded-3">
      <div className="product-header">
        <h5>New Product</h5>

        <div className="product-header-button">
          <button
            className="text-danger"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <RiDeleteBin6Line />
            Delete
          </button>
          {/* <button className="text-success" onClick={() => navigate( `/admin/upload-product/edit/${productData._id}`)}>
            <CiEdit />
            Edit
          </button> */}

          <Dropdown>
            <Dropdown.Toggle
              variant=""
              id="dropdown-basic"
              className="text-success"
            >
              <CiEdit />
              Edit
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() =>
                  navigate(
                    `/admin/upload-product/edit/details/${productData._id}`
                  )
                }
              >
                Details
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  navigate(
                    `/admin/upload-product/edit/images/${productData._id}`
                  )
                }
              >
                Images
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  navigate(
                    `/admin/upload-product/edit/stock/${productData._id}`
                  )
                }
              >
                Stock
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  navigate(
                    `/admin/upload-product/edit/newcolor/${productData._id}`
                  )
                }
              >
                new color
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="row gap-4 ms-3">
        <div className="col-2">
          <h6>Product code</h6>
        </div>

        <div className="col-8">
          <h6>{productData.productCode}</h6>
        </div>

        <div className="col-2">
          <h6>Product Category</h6>
        </div>

        <div className="col-8">
          <h6>{productData.categories}</h6>
        </div>

        <div className="col-2">
          <h6>Sub Category</h6>
        </div>

        <div className="col-8">
          <h6>{productData.subCategories}</h6>
        </div>

        <div className="col-2">
          <h6>Product Type</h6>
        </div>

        <div className="col-8">
          <h6>{productData.productType}</h6>
        </div>

        <div className="col-2">
          <h6>Price</h6>
        </div>

        <div className="col-8">
          <h6>Rs. {productData.price}</h6>
        </div>

        <div className="col-2">
          <h6>GST</h6>
        </div>

        <div className="col-8">
          <h6>{productData.gst}</h6>
        </div>

        <div className="col-2">
          <h6>Color</h6>
        </div>

        <div className="col-8 d-flex gap-2">
          {productData?.colors?.map((color, i) => (
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: color.color,
              }}
              className="border rounded-2"
            ></div>
          ))}
        </div>

        <div className="col-2">
          <h6>Sizes</h6>
        </div>

        <div className="col-8">
          {productData.colors &&
            productData.colors.map((color, i) =>
              color.sizes[0].size !== "" ? (
                <React.Fragment key={i}>
                  {color.sizes.map((sizeObj, j) => (
                    <React.Fragment key={j}>
                      {sizeObj.size === "" ? "Free Size" : sizeObj.size}
                      {j < color.sizes.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                  {i < productData.colors.length - 1 && ", "}
                </React.Fragment>
              ) : (
                <span></span>
              )
            )}
        </div>

        <div className="col-2">
          <h6>Photos</h6>
        </div>
        <div className="col-8 ">
          {productData.images &&
            productData.images.map((img, i) => (
              <React.Fragment key={i}>
                {img.imageUrl[i] &&
                  img.imageUrl.map((url, j) => {
                    console.log(url);
                    return (
                      <img
                        className="me-1 rounded-2"
                        key={j}
                        src={id ? `${api}/${url}` : URL.createObjectURL(url)}
                        alt={`Product Image ${j + 1}`}
                        style={{ width: "50px", height: "50px" }}
                      />
                    );
                  })}
              </React.Fragment>
            ))}
        </div>

        <div className="col-2">
          <h6>Status</h6>
        </div>

        <div className="col-8 d-flex fw-medium gap-4">
          <span className="text-success">
            <input
              className="form-check-input me-2 border-success"
              type="radio"
              name="statusRadio"
              id="activeRadio"
              value="active"
              checked={selectedStatus === "active"}
              onChange={handleStatusChange}
            />
            <label className="form-check-label" htmlFor="activeRadio">
              Active
            </label>
          </span>

          <span className="text-danger">
            <input
              className="form-check-input me-2 border-danger"
              type="radio"
              name="statusRadio"
              id="inactiveRadio"
              value="inactive"
              checked={selectedStatus === "inactive"}
              onChange={handleStatusChange}
            />
            <label className="form-check-label" htmlFor="inactiveRadio">
              Inactive
            </label>
          </span>

          <span className="text-success">
            <input
              className="form-check-input me-2 border-success"
              type="radio"
              name="statusRadio"
              id="outOfStockRadio"
              value="out_of_stock"
              checked={selectedStatus === "out_of_stock"}
              onChange={handleStatusChange}
            />
            <label className="form-check-label" htmlFor="outOfStockRadio">
              Out of stock
            </label>
          </span>
        </div>
      </div>

      {/* Delete Modale */}

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title fs-5 text-danger gap-2 d-flex align-items-center justify-content-center"
                id="exampleModalLabel"
              >
                <IoWarningOutline /> Delete Product ?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-5">
              Are you sure you want to delete this product ?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(productData._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
