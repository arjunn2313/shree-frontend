import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";

export default function UpdateStock() {
  const [sizes, setSizes] = useState([]);
  const { id } = useParams();
  const sizeChart = ["S", "M", "L", "XL", "XXL"];

  console.log(sizes);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:6060/product/admin/${id}`)
        .then((res) => {
          setSizes(res.data.colors);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleChange = (index, stockIndex, selectedSize) => {
    const updatedSizes = [...sizes];
    updatedSizes[index].sizes[stockIndex].size = selectedSize;
    setSizes(updatedSizes);
  };

  const handleStockChange = (index, stockIndex, event) => {
    const updatedSizes = [...sizes];
    updatedSizes[index].sizes[stockIndex].stock = event.target.value;
    setSizes(updatedSizes);
  };
  const handleAddSize = (index) => {
    const updatedSizes = [...sizes];

    const selectedColor = updatedSizes[index];

    selectedColor.sizes.push({
      size: "",
      stock: "",
    });

    setSizes(updatedSizes);
  };

  const handleUpdate = () => {
    const requestBody = { colors: sizes };
    axios.put(`${api}/product/update-stock/${id}`, requestBody);
  };

  return (
    <div className="m-2 bg-white p-3">
      <div className="m-2 bg-white p-3 row">
        <h6 className="mb-4">Update Stock</h6>
        {sizes && sizes.map((size, index) => (
          <div key={index} className="mb-4 row ">
            <div className="col-12 d-flex gap-3 mb-3">
              <span className="fw-medium">color code : {size.color}</span>
              <div
                className="rounded-3"
                style={{
                  width: "50px",
                  height: "30px",
                  backgroundColor: size.color,
                }}
              ></div>
              <button
                className="btn text-primary text-underline"
                onClick={() => handleAddSize(index)}
              >
                Add size
              </button>
            </div>
            {size.sizes.map((stock, stockIndex) => (
              <React.Fragment key={stockIndex}>
                <div className="col-2">
                  <label className="form-label">Size</label>
                  <select
                    className="form-select mb-3"
                    value={stock.size}
                    onChange={(e) =>
                      handleChange(index, stockIndex, e.target.value)
                    }
                  >
                    <option>Select---</option>
                    {sizeChart.map((itm, i) => (
                      <option key={i}>{itm}</option>
                    ))}
                  </select>
                </div>
                <div className="col-2">
                  <label className="form-label">Stock</label>
                  <input
                    type="text"
                    className="form-control"
                    value={stock.stock}
                    onChange={(e) => handleStockChange(index, stockIndex, e)}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        ))}

        

        <div className="col-12 text-center">
          <button className="btn btn-success col-5" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
