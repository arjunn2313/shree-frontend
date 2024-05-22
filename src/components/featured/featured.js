import React, { useEffect, useState } from "react";
import "./featured.css";
import { IoMdHeart } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import ProductCard from "../productCard/productCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../services/product/productSlice";
import { api } from "../../api/api";

export default function Featured() {
  const [categories, setCategories] = useState("");

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    if (categories == "") {
      axios
        .get(`${api}/product`)
        .then((res) => {
          setProductData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${api}/product/filter?categories=${categories}`)
        .then((res) => {
          setProductData(res.data);
        });
    }
  }, [categories]);

  return (
    <div className="featured container   pt-5  ">
      <h2 className="text-center featured-header">Our Best Products</h2>

      <div className="featuredCat d-flex align-items-center justify-content-center gap-lg-5 gap-2 pt-4 pb-2">
        <NavLink to="#" onClick={() => setCategories("")}>
          <span className={categories == "" && "BColor text-white"}>ALL</span>
        </NavLink>

        <NavLink onClick={() => setCategories("kids")}>
          <span className={categories == "kids" && "BColor text-white"}>
            KIDS
          </span>
        </NavLink>

        <NavLink onClick={() => setCategories("men")}>
          <span className={categories == "men" && "BColor text-white"}>
            MEN
          </span>
        </NavLink>
        <NavLink onClick={() => setCategories("women")}>
          <span className={categories == "women" && "BColor text-white"}>
            WOMEN
          </span>
        </NavLink>
      </div>

      <p className="text-end pb-3 gap-2 view-more">
        <Link
          to={{ pathname: "/products-list", state: categories }}
          style={{ textDecoration: "underline" }}
        >
          View More
        </Link>
      </p>
      <div className="container">
        <div className="row">
          {productData &&
            productData.map((product) => (
              <div className="col-xl-3 mb-2 col-lg-4 col-6 p-0 w-full" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
