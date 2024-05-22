import React, { useState } from "react";
import Drag from "../../components/dragAndDrop/dragAndDrop";
import axios from "axios";
import { api } from "../../../api/api";
import { useParams } from "react-router-dom";

export default function NewColor() {
  const [colors, setColors] = useState([
    { color: "", sizes: [{ size: "", stock: "" }] },
  ]);
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [images, setImages] = useState([]);
  const [uploadImage, setUploadImage] = useState(false);
  const { id } = useParams();
  console.log(colors);
  console.log(images);

  const handleMore = () => {
    setColors((prevColors) => [
      ...prevColors,
      { color: "", sizes: [{ size: "", stock: "" }] },
    ]);

    setImages((prevImages) => [...prevImages, []]);
  };

  const handleColorChange = (index, event) => {
    const newColors = [...colors];
    newColors[index].color = event.target.value;
    setColors(newColors);
  };

  const handleSizeChange = (colorIndex, sizeIndex, event) => {
    const newColors = [...colors];
    newColors[colorIndex].sizes[sizeIndex].size = event.target.value;
    setColors(newColors);
  };

  const handleStockChange = (colorIndex, sizeIndex, event) => {
    const newColors = [...colors];
    newColors[colorIndex].sizes[sizeIndex].stock = event.target.value;
    setColors(newColors);
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const errors = {};
  
    // Check if at least one color is selected
    if (colors.length === 0 || !colors[0].color) {
      errors.color = "Please select a color";
    }
  
    // Check if at least one size is specified for the selected color
    if (colors.length > 0 && colors[0].sizes.length === 0) {
      errors.stock = "Please enter stock for the selected size";
    }
  
    if (Object.keys(errors).length > 0) {
      // Concatenate or format errors for better display
      const errorMessage = Object.values(errors).join('\n');
      alert(errorMessage);
    } else {
      const formData = new FormData();
  
      // Assuming you have some logic to add images to the form data
  
      formData.append("colors", JSON.stringify(colors));
  
      try {
        const response = await axios.post(
          `${api}/product/new-color/${id}`,
          formData,
        );
  
        console.log("Server response:", response.data);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };
  

   

  
  return (
    <div className="m-2 bg-white p-3">
    
      {uploadImage && (
        <Drag
          setUploadImage={setUploadImage}
          image={images}
          setImages={setImages}
        />
      )}
      <div className="m-2 bg-white p-3 row">
        <h6 className="mb-4">Add New Color</h6>

        {colors.map((color, index) => (
          <>
            <div key={index} className="col-4">
              <label>color</label>
              <input
                className="form-control form-control-color w-75 "
                type="color"
                style={{ height: "50px" }}
                value={color.color}
                onChange={(e) => handleColorChange(index, e)}
              />
            </div>
            {color.sizes.map((size, sizeIndex) => (
              <>
                <div key={sizeIndex} className="col-4 mb-5">
                  <div className="d-flex align-items-center justify-content-between">
                    <label className="form-label">Size</label>
                    <span
                      style={{ textDecoration: "underline" }}
                      className="text-end text-primary"
                      type="button"
                      onClick={() =>
                        setColors(
                          colors.map((c, i) =>
                            i === index
                              ? {
                                  ...c,
                                  sizes: [...c.sizes, { size: "", stock: "" }],
                                }
                              : c
                          )
                        )
                      }
                    >
                      Add Size
                    </span>
                  </div>
                  <select
                    className="form-select"
                    value={size.size}
                    onChange={(e) => handleSizeChange(index, sizeIndex, e)}
                  >
                    <option>Select---</option>
                    {sizes.map((itm, i) => (
                      <option key={i}>{itm}</option>
                    ))}
                  </select>
                </div>
                <div className="col-4 mb-3">
                  <label className="form-label">Quantity</label>
                  <input
                    type="text"
                    className="form-control"
                    value={size.stock}
                    name={`variation[${index}].count`}
                    onChange={(e) => handleStockChange(index, sizeIndex, e)}
                  />
                </div>
              </>
            ))}
            <div className="col-12 mb-3 ">
              {/* <span
                style={{ textDecoration: "underline" }}
                className="text-end text-primary"
                onClick={handleMore}
              >
                Add Color
              </span> */}
              <div className="">
                <button
                  type="button"
                  className="col-6 py-2 upload-btn"
                  onClick={() => setUploadImage(true)}
                >
                  Upload Image
                </button>
              </div>
            </div>
            <div className="col-6  d-flex  gap-3  align-items-center ">
              {/* {images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  style={{ width: "50px", height: "50px" }}
                  className="rounded-2"
                  alt={`Image ${index}`}
                />
              ))} */}
              {images.length == 4 && <button>delete</button>}
            </div>
          </>
        ))}

        <div className="col-12 text-center my-4">
          <button className="btn btn-success col-5" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
