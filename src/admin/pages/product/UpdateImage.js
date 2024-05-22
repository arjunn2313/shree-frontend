import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
 
export default function UpdateImage() {
  const [imageSets, setImageSets] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      axios
        .get(`${api}/product/${id}`)
        .then((res) => {
          //   setProductData(res.data);
          setImageSets(res.data.product.images || []);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleUpdateSet = async (index) => {
    const updatedSets = [...imageSets];
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.multiple = true;

    fileInput.addEventListener("change", async (event) => {
      const updatedImages = Array.from(event.target.files);

      try {
        const formData = new FormData();
        updatedImages.forEach((image) => {
          formData.append("images", image);
        });

        await axios.put(
          `${api}/product/update-image/${id}/${index}`,
          formData
        );

        const updatedProductData = await axios.get(
          `${api}/product/${id}`
        );
       
        setImageSets(updatedProductData.data.images || []);

        console.log("Images updated on the server");
      } catch (error) {
        console.error("Error updating images on the server", error);
      }
    });

    fileInput.click();
  };

  console.log(imageSets);

  return (
    <div className="m-2 bg-white p-3 row">
        
      {imageSets.map((set, i) => (
        // <div key={i} className="col-8 my-3">
        <>
          {set.imageUrl.map((img, j) => (
            <div key={`${i}-${j}`} className="col-3">
              <img
              style={{height:"350px"}}
                src={`${api}/${img}`}
                alt={`product-image-${i}-${j}`}
                className="img-fluid mb-2 rounded-3"
              />
            </div>
          ))}
          <div className="col-12 text-center my-4">
            <button
              type="button"
              className="btn btn-success col-6"
              onClick={() => handleUpdateSet(i)}
            >
              Update images
            </button>
          </div>
          </>
        // </div>
      ))}
    </div>
  );
}
