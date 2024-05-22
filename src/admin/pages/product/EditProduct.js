import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";

export default function EditProduct() {
  const [productData, setProductData] = useState({});
  const category = ["men", "women", "kids", "Others"];
  const productType = [
    "Indian",
    "Western Wear",
    "Lingerie & Sleep wear",
    "Others",
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:6060/product/${id}`)
        .then((res) => {
          setProductData(res.data.product);
      
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleColorChange = (index, e) => {
    const newColors = [...productData.colors];
    newColors[index].color = e.target.value;
    setProductData((prevData) => ({
      ...prevData,
      colors: newColors,
    }));
  };

  const handleUpdateDetails = () => {
     try {
      axios.put(`${api}/product/update-details/${id}`,productData)
     } catch (error) {
      console.log(error);
     }
  };

  return (
    <div className="upload-product p-3 position-relative">
      {/*  */}
      <h6 className="text-secondary ">New Product</h6>

      {/* Form */}
      <div className="product-form">
        <form className="row">
          <div className="col-6 mb-3">
            <label className="form-label">Product Code</label>
            <input
              type="tel"
              className="form-control"
              name="productCode"
              value={productData?.productCode}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">Product Category</label>
            <select
              className="form-select"
              name="categories"
              value={productData?.categories}
              onChange={handleChange}
            >
              <option>Select---</option>
              {category.map((itm, i) => (
                <option key={i}>{itm}</option>
              ))}
            </select>
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">Sub Category</label>
            <input
              type="text"
              className="form-control mb-3"
              name="subCategories"
              value={productData?.subCategories}
              onChange={handleChange}
            />
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">Product name</label>
            <input
              type="text"
              className="form-control mb-3"
              name="productName"
              value={productData?.productName}
              onChange={handleChange}
            />
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">Product Type</label>
            <select
              className="form-select"
              name="productType"
              value={productData?.productType}
              onChange={handleChange}
            >
              <option>---type</option>
              {productType.map((itm, i) => (
                <option key={i}>{itm}</option>
              ))}
            </select>
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">Price</label>
            <input
              type="text"
              class="form-control mb-3"
              name="price"
              value={productData?.price}
              onChange={handleChange}
            />
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">GST</label>
            <input
              type="text"
              class="form-control mb-3"
              name="gst"
              value={productData?.gst}
              onChange={handleChange}
            />
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              class="form-control mb-3"
              name="description"
              value={productData?.description}
              onChange={handleChange}
            />
          </div>

          {productData?.colors?.map((color, index) => (
            <div key={index} className="col-2 ">
              {/* <div className="col-2 mb-3"> */}
              <label>Color</label>
              <input
                className="form-control form-control-color w-75 "
                type="color"
                style={{ height: "50px" }}
                value={color.color}
                onChange={(e) => handleColorChange(index, e)}
              />
              {/* </div> */}
            </div>
          ))}

          <div className="col-12 text-center my-4">
            <button className="btn btn-success col-6" type="button" onClick={handleUpdateDetails}>Update Details</button>
          </div>

          {/* Product details end */}
        </form>
      </div>
    </div>
  );
}
