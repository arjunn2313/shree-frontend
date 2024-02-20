import React, { useEffect, useState } from "react";
import "./featured.css";
import { IoMdHeart } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import ProductCard from "../productCard/productCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../services/product/productSlice";

export default function Featured() {
  const[categories,setCategories] = useState('')
  // const productData = useSelector((state)=>state.product.product)
  const [productData,setProductData] = useState([])
 
//   const dispatch = useDispatch()
//   const getProducts = () =>{
//     dispatch(getAllProducts());
//   }

// useEffect(()=>{
//   getProducts()
// },[getProducts])

  useEffect(()=>{
    if(categories == ""){
    axios.get('http://localhost:6060/product').then((res)=>{
     setProductData(res.data)
    }).catch((error)=>{
      console.log(error)
    })}else{
      axios.get(`http://localhost:6060/product/filter?categories=${categories}`).then((res)=>{
        setProductData(res.data)
       })
    }
  },[categories])

 

  return (
    <div className="featured container-fluid pt-5 d-flex flex-column align-items-center justify-content-center ">
      <h2 className="text-center">Our Best Products</h2>

      <div className=  "featuredCat d-flex align-items-center justify-content-center gap-5 pt-4 pb-2"  >
        <NavLink to='#' onClick={()=>setCategories("")}>
        <span className={categories == "" && "BColor text-white"}>ALL</span>
        </NavLink>
       

        <NavLink onClick={()=>setCategories('kids')}>
        <span className={categories == "kids" && "BColor text-white"}>KIDS</span>
        </NavLink>

        <NavLink onClick={()=>setCategories('men')}>
        <span className={categories == "men" && "BColor text-white"}>MEN</span>
        </NavLink>
        <NavLink onClick={()=>setCategories('women')}>
        <span className={categories == "women" && "BColor text-white"}>WOMEN</span>
        </NavLink>
        </div>

     

      <div className="container">
        <p className="text-end pb-3">
        <Link to={{ pathname: '/products-list', state: categories }} style={{textDecoration:'underline'}}>View More</Link>
          </p>

      {/* <div className="product_card"> */}
        <div className="row g-3">
        {productData && productData.map((product)=>(
        <div className="col-xl-3 col-lg-4 col-md-6" key={product._id}>
        <ProductCard product={product} />
        </div>
          ))} 
        {/* </div> */}
      </div>
      </div>

    </div>
  );
}
