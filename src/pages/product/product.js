import React, { useEffect, useState } from "react";
import Navbar from "../../components/navBar/navBar";
import "./product.css";
import Footer from "../../components/footer/footer";
import { IoMdHeart } from "react-icons/io";
import ProductCard from "../../components/productCard/productCard";
import axios from "axios";
import { api } from "../../api/api";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../services/product/productSlice";


export default function Product() {
  const[catInx,setCatInx] = useState(null)
  const [open, setOpen] = useState(false);
  const productData = useSelector((state)=>state.product.product)
  const location = useLocation()
  const categories = ["WOMEN","MEN","KIDS","OTHERS"]
   const [cat,setCat] = useState("")
    const dispatch = useDispatch()
  const getProducts = () =>{
    dispatch(getAllProducts());
  }

useEffect(()=>{
  getProducts(cat)
},[getAllProducts])
 


 
  return (
    <>
 

      <div className="product-nav container-fluid p-1">
        <ul className="d-flex list-unstyled justify-content-center gap-5 align-items-center">
          {categories.map((cat, i) => (
            <span
              className={`d-flex flex-column align-items-center`}
              style={{ cursor: "pointer" }}
              onClick={() => setCatInx(i)}
            >
              <span className={`${catInx === i && "TColor"} fw-semibold`} onClick={()=>setCat(cat)}>
                {cat}
              </span>
              <div className={`circle ${catInx == i && "visible"}`}></div>
            </span>
          ))}
        </ul>
      </div>

      {/* CATEGORIES */}
      <div className="position-relative d-flex justify-content-center">
        {open && (
          <div className="container bg-white  product-categories">
            <div className="row">
              <div className="col-3 d-flex h-100 justify-content-center align-items-center catrgories-row-1">
                <div className="py-4">
                  <h6 className="py-3">Indian Wear</h6>
                  <ul className="list-unstyled">
                    <li>Saree</li>
                    <li>Saree</li>
                    <li>Saree</li>
                    <li>Saree</li>
                  </ul>
                </div>
              </div>

              <div className="col-3  d-flex justify-content-center align-items-center catrgories-row">
                <div className="">
                  <h6 className="py-3">Indian Wear</h6>
                  <ul className="list-unstyled">
                    <li>Saree</li>
                    <li>Saree</li>
                    <li>Saree</li>
                    <li>Saree</li>
                  </ul>
                </div>
              </div>

              <div className="col-3 d-flex justify-content-center align-items-center catrgories-row-1">
                <div className="">
                  <h6 className="py-3">Indian Wear</h6>
                  <ul className="list-unstyled">
                    <li>Saree</li>
                    <li>Saree</li>
                    <li>Saree</li>
                    <li>Saree</li>
                  </ul>
                </div>
              </div>

              <div className="col-3 d-flex justify-content-center align-items-center catrgories-row">
                <div className="">
                  <h6 className="py-3">Indian Wear</h6>
                  <ul className="list-unstyled">
                    <li>Saree</li>
                    <li>Saree</li>
                    <li>Saree</li>
                    <li>Saree</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PRODUCT-LIST */}

      <div className="productsList container my-5 py-4">
        <div className="row g-3">
          {productData &&
            productData.map((product) => (
              <div className="col-xl-3 col-lg-4 col-md-6" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
