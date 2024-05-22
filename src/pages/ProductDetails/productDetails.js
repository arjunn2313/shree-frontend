import React, { useEffect, useMemo, useState } from "react";
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
import ReactImageMagnify from "react-image-magnify";
import { getAProducts } from "../../services/product/productSlice";
import {
  addProdToCart,
  addToWishList,
  deleteMyWishlist,
  getMyWishList,
} from "../../services/user/userSlice";
import ReviewView from "../../components/modals/reviewView";

export default function ProductDetails() {
  const [modalShow, setModalShow] = React.useState(false);

  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useSelector(
    (state) => state?.product?.singleProduct?.product
  );
  const reviews = useSelector(
    (state) => state?.product?.singleProduct?.verifiedReviews
  );
  const wishlist = useSelector((state) => state?.auth?.wishlist?.wishlist);
  const memoizedWishlist = useMemo(() => wishlist, [wishlist]);
  const [colorIndex, setColorIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(null);
  const [colorCode, setColorCode] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const [zoomImg, setZoomImg] = useState("");
  const [displayImage, setDisplayImage] = useState(0);
  const memoizedProduct = useMemo(() => product, [product]);
  console.log(image);
  useEffect(() => {
    dispatch(getAProducts(id));
    if (
      memoizedProduct &&
      Array.isArray(memoizedProduct.colors) &&
      memoizedProduct.colors.length > 0 &&
      Array.isArray(memoizedProduct.images) &&
      memoizedProduct.images.length > 0
    ) {
      setColorCode(memoizedProduct.colors[0]?.color || "");
      setImage(memoizedProduct.images[0]?.imageUrl[0] || "");
    }
  }, [id, memoizedProduct]);

  useEffect(() => {
    dispatch(getMyWishList());
  }, []);

  useEffect(() => {
    for (let index = 0; index < memoizedWishlist?.length; index++) {
      if (memoizedWishlist[index]?.product?._id == id) {
        setIsLike(true);
      }
    }
  }, [id, memoizedWishlist]);

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

  const handleColor = (i, color) => {
    setImage(product.images[i].imageUrl[0]);
    setSizeIndex(null);
    setSize("");
    setColorIndex(i);
    setColorCode(color.color);
  };

  const handleSize = (i, size) => {
    setSizeIndex(i);
    setSize(size.size);
  };

  // const uploadCart = () => {
  //   if (localStorage.token) {
  //     dispatch(
  //       addProdToCart({
  //         productId: product?._id,
  //         colorCode,
  //         size,
  //         quantity: count,
  //         image,
  //         price: product?.price,
  //       })
  //     );
  //   } else {
  //     navigate("/user-account");
  //   }
  // };

  const uploadCart = () => {
    if (localStorage.token) {
      if (product.colors[0].sizes[0].size != "" && !size) {
        toast.warning("Please select a size", {
          position: "top-center",
          hideProgressBar: true,
        });
      } else {
        dispatch(
          addProdToCart({
            productId: product?._id,
            colorCode,
            size,
            quantity: count,
            image,
            price: product?.price,
          })
        );
      }
    } else {
      navigate("/user-account");
    }
  };

  const carts = [];

  const handleBuy = () => {
    const cart = {};
    cart.productId = product;
    cart.product = product;
    cart.quantity = count;
    cart.colorCode = colorCode;
    cart.image = image;
    cart.size = size;
    cart.price = product?.price;
    console.log(cart);
    carts.push(cart);
    navigate("/order", { state: carts });
  };

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

  return (
    <>
      {/* SINGLE PRODUCT */}
      <ReviewView
        show={modalShow}
        reviews={reviews}
        onHide={() => setModalShow(false)}
      />
      {product && (
        <div className="container  mt-5 mb-3  ">
          <div className="row">
            {/* FIRST COLUMN */}
            <div className="col-md-6 mb-3 display-for-lap">
              {product && product.images && product.images.length > 0 && (
                <div>
                  <div className="border">
                    {product.images[colorIndex].imageUrl.map(
                      (imageUrl, index) => (
                        <React.Fragment key={index}>
                          {index === displayImage && (
                            <img
                              src={`${api}/${imageUrl}`}
                              alt={`Image ${index}`}
                              className="detailed-img"
                              onClick={() => setZoomImg(imageUrl)}
                            />
                          )}
                        </React.Fragment>
                      )
                    )}
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    {product.images[colorIndex].imageUrl.map(
                      (imageUrl, index) => (
                        <React.Fragment key={index}>
                          {index !== displayImage && (
                            <img
                              src={`${api}/${imageUrl}`}
                              alt={`Image ${index}`}
                              className="  product-single"
                              style={{ height: "15vh", width: "31%" }}
                              // onClick={() => setZoomImg(imageUrl)}
                              onClick={() => setDisplayImage(index)}
                            />
                          )}
                        </React.Fragment>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden-for-mob col-6">
              {product && product.images && product.images.length > 0 && (
                <div className="d-flex">
                  <div className="w-50 d-flex flex-column gap-3">
                    {product.images[colorIndex].imageUrl.map(
                      (imageUrl, index) => (
                        <React.Fragment key={index}>
                          {index === 0 && (
                            <span
                              style={{ position: "relative", zIndex: "100" }}
                            >
                              <ImageMagnify
                                src={`${api}/${imageUrl}`}
                                width="301"
                                height="401"
                              />
                            </span>
                            // <img
                            //   src={`http://localhost:6060/${imageUrl}`}
                            //   alt={`Image ${index}`}
                            //   className="w-full product-single"
                            //   style={{ height: "400px", width: "301px" }}
                            //   onClick={()=>setZoomImg(imageUrl)}
                            // />
                          )}

                          {index === 1 && (
                            <span
                              style={{ position: "relative", zIndex: "100" }}
                            >
                              <ImageMagnify
                                src={`${api}/${imageUrl}`}
                                width="301"
                                height="220"
                              />
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
                      )
                    )}
                  </div>

                  <div className="w-50 d-flex flex-column gap-3">
                    {product.images[colorIndex].imageUrl.map(
                      (imageUrl, index) => (
                        <React.Fragment key={index}>
                          {index === 2 && (
                            <ImageMagnify
                              src={`${api}/${imageUrl}`}
                              width="301"
                              height="245"
                            />
                            // <img
                            //   src={`http://localhost:6060/${imageUrl}`}
                            //   alt={`Image ${index}`}
                            //   className="w-full product-single"
                            //   style={{ height: "245px", width: "301px" }}
                            //   onClick={()=>setZoomImg(imageUrl)}
                            // />
                          )}

                          {index === 3 && (
                            <span
                              style={{ position: "relative", zIndex: "90" }}
                            >
                              <ImageMagnify
                                src={`${api}/${imageUrl}`}
                                width="301"
                                height="375"
                              />
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
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* SECOND COLUMN */}
            <div className="col-md-6 d-flex flex-column gap-4">
              {/* title */}
              <div className="d-flex justify-content-between align-items-center">
                {/* <h4>SEMI LINEN SAREE</h4> */}
                <h2 className="text-uppercase">{product.productName}</h2>

                {isLike ? (
                  <span className="fs-4">
                    <FaHeart
                      style={{ cursor: "pointer" }}
                      className="text-danger"
                      onClick={() => handleWishlist()}
                    />
                  </span>
                ) : (
                  <span className="fs-4">
                    <FaRegHeart
                      style={{ cursor: "pointer" }}
                      onClick={() => handleWishlist()}
                    />
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="d-flex align-items-center gap-3">
                <h6 onClick={() => setModalShow(true)}>
                  REVIEWS ({reviews?.length})
                </h6>
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
                  {product.description && product.description}
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
                        onClick={() => handleColor(i, color)}
                        className={`rounded-circle ${
                          colorIndex == i
                            ? "border border-secondary border-4"
                            : "border"
                        }`}
                        style={{
                          width: "50px",
                          height: "50px",
                          background: color.color,
                        }}
                      ></div>
                    ))}
                </div>
              </div>

              {product && product.colors[0].sizes[0].size != "" && (
                <div>
                  <p>Select Size</p>
                  <div className="d-flex gap-3">
                    {product &&
                      product.colors.length > 0 &&
                      product.colors[colorIndex].sizes.map((size, index) => (
                        <button
                          key={index}
                          role="button"
                          onClick={() => handleSize(index, size)}
                          className={`rounded border py-2 px-4 ${
                            sizeIndex == index && "bg-success text-white"
                          }`}
                        >
                          {size.size}
                        </button>
                      ))}
                  </div>
                </div>
              )}

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
                <button
                  className="border border-success bg-white text-success"
                  onClick={() => uploadCart()}
                >
                  ADD TO BAG
                </button>
                <button className="bg-success text-white" onClick={handleBuy}>
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* You May Also Like */}
      <div className="container my-5">
        <h2>You may also like</h2>
      </div>
    </>
  );
}

{
  /* <div className="row mt-5">
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
        </div> */
}
