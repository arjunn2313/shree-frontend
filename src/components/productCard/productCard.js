import React, { useEffect, useState } from 'react';
import { FaRegHeart,FaHeart } from "react-icons/fa";
import { api } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMyWishlist, getMyWishList,addToWishList} from '../../services/user/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';



export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isLike, setIsLike] = useState(false);
  const wishlist = useSelector((state)=>state?.auth?.wishlist?.wishlist)
  const id = product?._id

  const image = product &&
  Array.isArray(product.images) &&
  product.images.length > 0 &&
  product.images[0]?.imageUrl[0];
 
  useEffect(()=>{
    dispatch(getMyWishList())
  },[])

  useEffect(()=>{
    for (let index = 0; index < wishlist?.length; index++) {
       if(wishlist[index].product?._id == id){
        setIsLike(true)
       }
    }
    },[])

 
    const handleWishlist = () => {
      if(localStorage.token){
        if (isLike) {
          dispatch(deleteMyWishlist(id))
             setIsLike(false);
       } else {
          dispatch(addToWishList({id,image}))
          setIsLike(true);
       }
      }else{
       
        navigate('/user-account')
      }
     
    };

    



  const handleView = (id) => {
    navigate(`/${id}`);
  };

  return (
    <div className="card mb-4 searchBorder" style={{width:'19rem',height:'29rem',cursor: 'pointer'}}>
      <img src={`${api}/${image}`} className="card-img-top" alt="image" style={{height:'22rem'}} onClick={() =>handleView(product._id)}/>
      <div className="card-body">
        <div className="row">
          <div className="col-10" onClick={() => handleView(product._id)}>
            <p className='fw-medium' style={{height:'45px'}} >{product && product.productName}</p>
            <h6 className="TColor  fs-5">RS {product && product.price}</h6>
          </div>
          <div className="col-2">

          {isLike ? (
                <span className="fs-4">
                  <FaHeart
                    style={{ cursor: "pointer" }}
                    className="text-danger"
                    onClick={()=>handleWishlist()}
                  />
                </span>
              ) : (
                <span className="fs-4">
                  <FaRegHeart
                    style={{ cursor: "pointer" }}
                    onClick={()=>handleWishlist()}
                  />
                </span>
              )}
            
            {/* <FaRegHeart className='fs-4' onClick={()=>handleWishlist()}/> */}
          </div>
        </div>
      </div>
    </div>
  );
}
