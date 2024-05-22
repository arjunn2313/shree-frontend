import React, { useEffect, useMemo, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMyWishlist,
  getMyWishList,
  addToWishList,
} from "../../services/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);
  const wishlist = useSelector((state) => state?.auth?.wishlist?.wishlist);
  const id = product?._id;
  const memoizedWishlist = useMemo(() => wishlist, [wishlist]);
  const image =
    product &&
    Array.isArray(product.images) &&
    product.images.length > 0 &&
    product.images[0]?.imageUrl[0];

  useEffect(() => {
    dispatch(getMyWishList());
  }, []);

  useEffect(() => {
    for (let index = 0; index < memoizedWishlist?.length; index++) {
      if (memoizedWishlist[index]?.product?._id == id) {
        setIsLike(true);
      }
    }
  }, [id,memoizedWishlist]);

 
  const handleWishlist = () => {
    if (localStorage.token) {
      if (isLike) {
        dispatch(deleteMyWishlist(id));
        setIsLike(false);
      } else {
        dispatch(addToWishList({ id, image }));
        setIsLike(true);
      }
    } else {
      navigate("/user-account");
    }
  };

  const handleView = (id) => {
    navigate(`/${id}`);
  };

  return (
    <div className="card p-0 searchBorder product-card">
      <img
        src={`${api}/${image}`}
        className="card-img-top image-fluid product-card-img"
        alt="image"
        onClick={() => handleView(product._id)}
      />
      <div className="card-body p-sm-3 p-1">
        <div className="row">
          <div className="col-10 " onClick={() => handleView(product._id)}>
            <p className="fw-medium product-name">
              {product && product.productName}
            </p>
            <h6 className="TColor product-price p-0 m-0 ">
              RS {product && product.price}
            </h6>
          </div>
          <div className="col-2 p-0">
            {isLike ? (
              <span className="product-lyk-icon">
                <FaHeart
                  style={{ cursor: "pointer" }}
                  className="text-danger"
                  onClick={() => handleWishlist()}
                />
              </span>
            ) : (
              <span className="product-lyk-icon">
                <FaRegHeart
                  style={{ cursor: "pointer" }}
                  onClick={() => handleWishlist()}
                />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
