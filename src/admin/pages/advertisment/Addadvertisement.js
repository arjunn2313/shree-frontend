import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { adminConfig, api } from "../../../api/api";

export default function Advertisement() {
  const [productState, setProductState] = useState({});
  const { id } = useParams();
  const [erros, setErrors] = useState({});
  useEffect(() => {
    if (id) {
      axios.get(`${api}/advertisment/get/single/${id}`,adminConfig).then((res) => {
        console.log(res.data);
        setProductState(res.data);
      });
    }
  }, [id]);

 console.log(productState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = {};

    if (!productState.categories) {
      error.categories = "**Please select a category";
    }

    if (!productState.image) {
      error.image = "**Please select an image";
    } else {
      const allowedFileTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      if (!allowedFileTypes.includes(productState.image.type)) {
        error.image = "**Invalid file type. Please choose a valid image file.";
      }
    }

    if (!productState.heading) {
      error.heading = "**Please enter a heading";
    }
    if (!productState.content) {
      error.content = "**Please enter content";
    }

    if (Object.keys(error).length > 0) {
      setErrors(error);
    } else {
      const formData = new FormData();
      formData.append("categories", productState.categories);
      formData.append("heading", productState.heading);
      formData.append("content", productState.content);
      if (productState.image) {
        formData.append("image", productState.image);
      }

      await axios
        .post(`${api}/advertisment/add`, formData,adminConfig)
        .then((res) => {
          setProductState((prevState) => ({
            ...prevState,
            categories: "",
            image: "",
            heading: "",
            content: "",
          }));
          setErrors({});
          toast.success("Product added", {
            autoClose: 3000,
            hideProgressBar: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (e) => {
    setProductState({ ...productState, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("categories", productState.categories);
    formData.append("heading", productState.heading);
    formData.append("content", productState.content);
    if (productState.image) {
      formData.append("image", productState.image);
    }
  
    try {
      await axios.post(`${api}/advertisment/update/${id}`, formData, adminConfig);
      toast.success("Successfully Updated");
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <div className="bg-white m-3 p-4">
  <h6 className="TColor fw-medium">Product No. :</h6>

  <div className="pt-4">
    <form className="row">
      <div className="mb-3 col-md-6">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Product Category
        </label>

        <select
          className="form-select"
          aria-label="Default select example"
          name="categories"
          value={productState.categories}
          onChange={handleChange}
        >
          <option value="" disabled selected>
            Select a category
          </option>
          <option value="Mens">Mens</option>
          <option value="Womens">Womens</option>
          <option value="Kids">Kids</option>
          <option value="Others">Others</option>
        </select>
        {erros.categories && (
          <span className="text-danger ps-2">{erros.categories}</span>
        )}
      </div>
      <div className="mb-3 col-md-6">
        <label className="form-label">Upload Image</label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          name="image"
          onChange={(e) =>
            setProductState({ ...productState, image: e.target.files[0] })
          }
        />
        {erros.image && (
          <span className="text-danger ps-2">{erros.image}</span>
        )}
      </div>

      <div className="mb-3 col-12">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Heading
        </label>

        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea2"
          name="heading"
          value={productState.heading}
          onChange={handleChange}
          style={{ height: "100px" }}
        ></textarea>
        {erros.heading && (
          <span className="text-danger ps-2">{erros.heading}</span>
        )}
      </div>

      <div className="mb-3 col-12">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Content
        </label>

        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea2"
          name="content"
          value={productState.content}
          onChange={handleChange}
          style={{ height: "100px" }}
        ></textarea>
        {erros.content && (
          <span className="text-danger ps-2">{erros.content}</span>
        )}
      </div>

      <div className="d-flex align-items-end justify-content-end gap-4 col-12">
        <button className="py-2 btn text-danger border-0 fw-medium">
          Discard
        </button>
        {id ? (
          <button
          type="button"
            className="py-2 px-5 btn btn-success"
            onClick={(e) => handleUpdate(e)}
          >
            Update
          </button>
        ) : (
          <button className="py-2 px-5 btn btn-success" type="button" onClick={handleSubmit}>
            Upload
          </button>
        )}
      </div>
    </form>
  </div>
</div>

  );
}
