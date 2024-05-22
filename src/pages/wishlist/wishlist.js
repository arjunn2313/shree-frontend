import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { api } from "../../api/api";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getMyWishList } from "../../services/user/userSlice";
import './wishlist.css'
import { BsBagXFill } from "react-icons/bs";

export default function Wishlist() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state?.auth?.wishlist?.wishlist);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyWishList());
  }, []);

  if (localStorage.token == undefined) {
    return (
      <div className="container  mt-4">
        <h4>My Wishlist</h4>
        <div className="d-flex flex-column align-items-center p-4 gap-4">
          <h5 className="text-center">PLEASE LOG IN</h5>
          <h6 className="text-secondary">Login to view items in your Wishlist.</h6>
          <div>
            <button
              className="btn btn-outline-success px-5 mt-5"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleView = (id) => {
    navigate(`/${id}`);
  };

  return (
    <div className="container  py-sm-5">
      <h4 className="text-success pb-3 wishlist-text">Wishlist</h4>
      <div className="row">
        {productData && productData?.length > 0? (
          productData.map((product) => {
            return (
              <div
                className="col-xl-3 mb-sm-2 col-lg-4 col-6 p-1"
                onClick={() => navigate(`/${product.product._id}`)}
              >
                <div
                  key={product._id}
                  className={` card  border-success product-card-wishlist `}
                  onClick={() => handleView()}
                  // style={{ width: "19rem", height: "29rem", cursor: "pointer" }}
                >
                  <img
                    src={`${api}/${product.imgUrl}`}
                    className="card-img-top wishlist-img"
                    alt="image"
                    // style={{ height: "22rem" }}
                  />
                  <div className="card-body p-sm-3 p-1">
                    <div className="row">
                      <div className="col-10  ">
                        <p className="fw-medium product-wishlist-name" >
                          {product.product && product.product.productName}
                        </p>
                        <h6 className="text-success product-wish-price  p-0 m-0">
                          RS {product.product && product.product.price}
                        </h6>
                      </div>
                      <div className="col-2 p-0">
                        {product.isLiked ? (
                          <FaHeart className=" lyk-btn text-success" />
                        ) : (
                          <FaRegHeart />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h4
            className="d-flex gap-3 align-items-center justify-content-center py-5 text-secondary"
            style={{ fontSize: "2vw" }}
          >
          < BsBagXFill  />  You haven't saved anything yet.
          </h4>
        )}
      </div>
    </div>
  );
}
