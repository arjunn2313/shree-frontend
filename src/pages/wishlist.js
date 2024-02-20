import React, { useEffect, useState } from "react";
import ProductCard from "../components/productCard/productCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { api } from "../api/api";
import { FaHeart, FaRegHeart} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getMyWishList } from "../services/user/userSlice";

export default function Wishlist() {
   
 const dispatch = useDispatch()
  const productData = useSelector((state)=>state?.auth?.wishlist?.wishlist)
  console.log(productData);
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(getMyWishList())
  },[])
  
 
  if(productData?.length <= 0){
    return(
      <div className="container py-5">
      <h4 className="text-success pb-3">Wishlist</h4>
      <p className="text-center">Nothing to show</p>
      </div>
    )
  }
  

  const handleView = (id) => {
    navigate(`/${id}`);
  };

  return (
  
    <div className="container py-5">
      <h4 className="text-success pb-3">Wishlist</h4>
      <div className="row">
      {productData ? (
        productData.map((product) => {
          return (
          
            <div className="col-3" onClick={()=>navigate(`/${product.product._id}`)}>
                <div
                  key={product._id}
                  className={`card mb-4 border-success`}
                  onClick={() => handleView()}
                  style={{ width: "19rem", height: "29rem", cursor: "pointer" }}
                >
                  <img
                    src={`${api}/${product.imgUrl}`}
                    className="card-img-top"
                    alt="image"
                    style={{ height: "22rem" }}
                  />
                  <div className="card-body">
                    <div className="row">
                      <div className="col-10">
                        <p className="fw-medium" style={{ height: "45px" }}>
                          {product.product && product.product.productName}
                        </p>
                        <h6 className="text-success">
                          RS {product.product && product.product.price}
                        </h6>
                      </div>
                      <div className="col-2">
                        {product.isLiked ? 
                        <FaHeart
                          className="fs-4 text-success"
                        /> : 
                        <FaRegHeart/>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          
          );
        })
   
      ) : (
        <h4 className="text-center text-secondary py-5">
          You haven't saved anything yet.
        </h4>
      )}
           </div>
    </div>
  );
}
