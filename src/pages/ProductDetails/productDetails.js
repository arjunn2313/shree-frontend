import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import { FaHeart, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import "./productDetails.css";
import ProductCard from "../../components/productCard/productCard";
import axios from "axios";
import { api, config } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/cartReducer";
import ImageMagnify from "../../components/productCard/imageMagnify";
import ReactImageMagnify from 'react-image-magnify';
import { getAProducts } from "../../services/product/productSlice";
import { addProdToCart, addToWishList, deleteMyWishlist, getMyWishList } from "../../services/user/userSlice";


export default function ProductDetails() {
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate()
  const product = useSelector((state)=>state?.product?.singleProduct)
  const wishlist = useSelector((state)=>state?.auth?.wishlist?.wishlist)
  const [colorIndex, setColorIndex] = useState(0);
  const [sizeIndex,setSizeIndex] = useState(null)
   const [colorCode,setColorCode] = useState("")
   const [size,setSize] = useState("")
   const [image,setImage] = useState(product?.images[0].imageUrl[0])
   const dispatch = useDispatch()
   const[zoomImg,setZoomImg] = useState("")
   
 console.log(image);
   useEffect(()=>{
    window.scrollTo(0, 0);
    dispatch(getAProducts(id))
   },[])

 useEffect(()=>{
 dispatch(getMyWishList())
 },[])
  
  useEffect(()=>{
  for (let index = 0; index < wishlist?.length; index++) {
     if(wishlist[index]?.product?._id == id){
      setIsLike(true)
     }
  }
  },[wishlist])

  

  if (!product) {
   
    return null;
  }
 

  const handleCount = (action) => {
    if (action === "add") {
      setCount((prev) => prev + 1);
    } else if (action === "sub" && count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  const handleColor = (i,color) =>{
    setImage(product.images[i].imageUrl[0])
    setSizeIndex(null)
    setSize("")
    setColorIndex(i)
    setColorCode(color.color)
     
  }

   

  const handleSize = (i,size) =>{
    setSizeIndex(i)
    setSize(size.size)
  }


 
  const uploadCart = () =>{
    if(localStorage.token){
      dispatch(addProdToCart({productId:product?._id,colorCode,size,quantity:count,image,price:product?.price}))
    }else{
      navigate('/user-account')
    }
 
   
  }
 

 const carts = []


  const handleBuy = () =>{
    const cart ={}
    cart.productId=product 
    cart.product = product
    cart.quantity = count
    cart.colorCode = colorCode
    cart.image =image
    cart.size = size
    cart.price = product?.price
   console.log(cart);
    carts.push(cart)
      navigate('/order',{state:carts} )
  }

 

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

   

  return (
    <>
      {/* SINGLE PRODUCT */}
    
     {product && <div className="container  mt-5 mb-3  ">
        <div className="row">
          {/* FIRST COLUMN */}

          {product && product.images && product.images.length > 0 && (
            <div className="col-6 d-flex">
              <div className="w-50 d-flex flex-column gap-3">
                {product.images[colorIndex].imageUrl.map((imageUrl, index) => (
                  <React.Fragment key={index}>
                    {index === 0 && (
                      <span style={{position:"relative",zIndex:"100"}}>
                      <ImageMagnify src={`http://localhost:6060/${imageUrl}`} width="301" height="401" /></span>
                      // <img
                      //   src={`http://localhost:6060/${imageUrl}`}
                      //   alt={`Image ${index}`}
                      //   className="w-full product-single"
                      //   style={{ height: "400px", width: "301px" }}
                      //   onClick={()=>setZoomImg(imageUrl)}
                      // />
                    )}

                    {index === 1 && (   
                        <span style={{position:"relative",zIndex:"100"}}>
                          <ImageMagnify src={`http://localhost:6060/${imageUrl}`} width="301" height="220" />
                    
                          </span>
                        
                      // <img
                      //   src={`http://localhost:6060/${imageUrl}`}
                      //   alt={`Image ${index}`}
                      //   className="w-full product-single"
                      //   style={{ height: "220px", width: "301px" }}
                      //   onClick={()=>setZoomImg(imageUrl)}
                      // />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="w-50 d-flex flex-column gap-3">
                {product.images[colorIndex].imageUrl.map((imageUrl, index) => (
                  <React.Fragment key={index}>
                    {index === 2 && (
                        <ImageMagnify src={`http://localhost:6060/${imageUrl}`} width="301" height="245"/>
                      // <img
                      //   src={`http://localhost:6060/${imageUrl}`}
                      //   alt={`Image ${index}`}
                      //   className="w-full product-single"
                      //   style={{ height: "245px", width: "301px" }}
                      //   onClick={()=>setZoomImg(imageUrl)}
                      // />
                    )}

                    {index === 3 && (
                        <span style={{position:"relative",zIndex:"90"}}>
                        <ImageMagnify src={`http://localhost:6060/${imageUrl}`} width="301" height="375"/>
                        </span>
                      // <img
                      //   src={`http://localhost:6060/${imageUrl}`}
                      //   alt={`Image ${index}`}
                      //   className="w-full product-single"
                      //   style={{ height: "375px", width: "301px" }}
                      //   onClick={()=>setZoomImg(imageUrl)}
                      // />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
 
          {/* SECOND COLUMN */}
          <div className="col-6 d-flex flex-column gap-4">
            {/* title */}
            <div className="d-flex justify-content-between align-items-center">
              {/* <h4>SEMI LINEN SAREE</h4> */}
              <h2 className="text-uppercase">{product.productName}</h2>

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
            </div>

            {/* DESCRIPTION */}
            <div className="d-flex align-items-center gap-3">
              <h6>REVIEWS (144)</h6>
              <span className="d-flex align-items-center fs-6 gap-1 ">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStar />
              </span>
            </div>

            {/* Description */}

            <div>
              <p className="text-secondary text-sm fs-5">
                Experience a perfect blend of grace and resilience with our Semi
                Tussar Woven Embroidery Saree - a masterpiece that exudes
                elegance and confidence. The semi tussar weave, renowned for its
                finesse,
              </p>
              <h2 style={{ fontSize: "46px" }}>Rs.{product.price}</h2>
            </div>

            {/* color */}

            <div>
              <p>Select Colour</p>
              <div className="d-flex gap-3">
                {product &&
                  product.colors.map((color, i) => (
                    <div
                      role="button"
                      onClick={() =>handleColor(i,color)}
                      className={`rounded-circle ${colorIndex == i ?"border border-secondary border-4" : "border"}`}
                      style={{
                        width: "50px",
                        height: "50px",
                        background: color.color,
                      }}
                    ></div>
                  ))}
              </div>
            </div>

        {product&& product.colors[0].sizes[0].size != "" &&  <div>
              <p>Select Size</p>
              <div className="d-flex gap-3">
                {product &&
                  product.colors.length > 0 &&
                  product.colors[colorIndex].sizes.map((size, index) => (
                    <button
                      key={index}
                      role="button"
                      onClick={()=>handleSize(index,size)}
                      className={`rounded border py-2 px-4 ${sizeIndex == index && "bg-success text-white"}`}
                    >
                      {size.size}
                    </button>
                  ))}
              </div>
            </div>}

            {/* Quntity */}

            <div className="pt-2">
              <p>Quantity</p>
              <div
                className="btn-group btn-group-lg"
                role="group"
                aria-label="Default button group"
              >
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handleCount("sub")}
                >
                  -
                </button>
                <button
                  className="px-3  bg-white border border-success"
                  style={{ cursor: "none" }}
                >
                  {count}
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handleCount("add")}
                >
                  +
                </button>
              </div>
            </div>

            {/*BUY BUTTONS */}

            <div className="product-buttons pt-4">
              <button className="border border-success bg-white text-success" onClick={()=>uploadCart()}>
                ADD TO BAG
              </button>
              <button className="bg-success text-white" onClick={handleBuy}>BUY NOW</button>
            </div>
          </div>
        </div>
      </div>}

      {/* You May Also Like */}
      <div className="container my-5">
        <h2>You may also like</h2>
        {/* <div className="row mt-5">
          <div className="col-3">
            <ProductCard />
          </div>

          <div className="col-3">
            <ProductCard />
          </div>

          <div className="col-3">
            <ProductCard />
          </div>

          <div className="col-3">
            <ProductCard />
          </div>
        </div> */}
      </div>

   
    </>
  );
}
