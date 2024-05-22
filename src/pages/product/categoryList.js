import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Link } from "react-router-dom";

export default function CategoryList({ cat, setOpen,setSelectedCat }) {
  const [category, setCategory] = useState();

  useEffect(() => {
    axios
      .get(`${api}/product/category/?category=${cat}`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cat]);
  console.log(category);
  return (
    <div className="container position-relative d-flex justify-content-center align-items-start"  onMouseLeave={()=>setOpen(false)}>
      <div
        className="row position-absolute bg-white z-3  product-categories "
        style={{ width: "90%", height: "fit-content" }}
      >
        {category?.map((category, index) => (
          <div
            className={`col d-flex justify-content-center ${
              index % 2 && "catrgories-color"
            }`}
            key={index}
            onClick={() => setOpen(false)}
          >
            <div className="py-4">
              <h6 className="py-3 TColor fw-medium">{category.productType}</h6>
              <ul className="list-unstyled ">
                {category.subcategories.map((cat, subIndex) => (
                  <li key={subIndex} className="mb-3 text-secondary text-capitalize" onClick={()=>setSelectedCat(cat)}>
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
