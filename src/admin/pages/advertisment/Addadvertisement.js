import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Advertisement() {
  // const [productState,setProductState] = useState({
  //   categories : "",
  //   image : "",
  //   heading: "",
  //   content :""
  // })

  const [productState, setProductState] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:6060/advertisment/get/single/${id}`)
        .then((res) => {
          console.log(res.data);
          setProductState(res.data);
        });
    }
  }, [id]);

  const [errors, setErrors] = useState({});

  console.log(productState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = {};

    if (!productState.categories) {
      error.categories = "Please enter categories";
    }
    if (!productState.image) {
      error.image = "Please enter image";
    }
    if (!productState.heading) {
      error.heading = "Please enter heading";
    }
    if (!productState.content) {
      error.content = "Please enter content";
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
        .post("http://localhost:6060/advertisment/add", formData)
        .then((res) => {
          setProductState({
            categories: "",
            image: "",
            heading: "",
            content: "",
          });
          toast.success("Product added");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (e) => {
    setProductState({ ...productState, [e.target.name]: e.target.value });
  };

  const handleUpdate =()=>{
    axios.post(`http://localhost:6060/advertisment/update/${id}`,productState).then(()=>{
      toast.success("Successfully Updated")
    }).catch((error)=>{
      console.log(error);
    })
   
  }

  return (
    <div className="bg-white m-3 p-4">
      <h6 className="TColor fw-medium">Product No. :</h6>

      <div className="pt-4">
        <form className="row" onSubmit={handleSubmit}>
          <div className="mb-3 col-6">
            <label for="exampleInputEmail1" className="form-label">
              Product Category
            </label>

            <select
              className="form-select"
              aria-label="Default select example"
              name="categories"
              value={productState.categories}
              onChange={handleChange}
            >
              <option selected>Open this Category menu</option>
              <option value="Mens">Mens</option>
              <option value="Womens">Womens</option>
              <option value="Kids">Kids</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="mb-3 col-6">
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
          </div>

          <div class="mb-3 col-12">
            <label for="exampleInputPassword1" className="form-label">
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
          </div>

          <div class="mb-3 col-12">
            <label for="exampleInputPassword1" class="form-label">
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
          </div>

          <div className="d-flex align-items-end justify-content-end gap-4">
            <button className="py-2 btn text-danger border-0 fw-medium">
              Discard
            </button>
            {id ? (
              <button className="py-2 px-5 btn btn-success" onClick={()=>handleUpdate()}>
                Update
              </button>
            ) : (
              <button className="py-2 px-5 btn btn-success" type="submit">
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
