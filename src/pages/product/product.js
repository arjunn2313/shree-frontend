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
import CategoryList from "./categoryList";

export default function Product() {
  const [catInx, setCatInx] = useState(null);
  const [open, setOpen] = useState(false);
  // const productData = useSelector((state) => state.product.product);
  const [productData, setProductData] = useState([]);
  const location = useLocation();
  const categories = ["women", "men", "kids", "Others"];
  const [cat, setCat] = useState("");
  const dispatch = useDispatch();
  const [selectedCat, setSelectedCat] = useState("");
  const [loading, setLoading] = useState(false);
  // const getProducts = () => {
  //   dispatch(getAllProducts());
  // };

  // useEffect(() => {
  //   getProducts(cat);
  // }, [getAllProducts]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sub = queryParams.get("sub");
    console.log(sub);
    // if (cat === "" && selectedCat == "") {
    //   setLoading(true);
    //   axios
    //     .get(`${api}/product`)
    //     .then((res) => {
    //       setProductData(res.data);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       setLoading(false);
    //     });
    // } 
     if (cat != "" && selectedCat != "") {
      setLoading(true);
      axios
        .get(`${api}/product?category=${cat}&subcategory=${selectedCat}`)
        .then((res) => {
          setProductData(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
    else if (sub) {
      setLoading(true);
      axios
        .get(`${api}/product?subcategory=${sub}`)
        .then((res) => {
          setProductData(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }  
    else  {
        setLoading(true);
        axios
          .get(`${api}/product`)
          .then((res) => {
            setProductData(res.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      } 
  }, [cat, selectedCat]);

  const handleCat = (cat) => {
    setCat(cat);
    // setOpen(true);
    setSelectedCat("");
  };

  return (
    <>
      <div className="product-nav container-fluid p-1">
        <ul className="d-flex list-unstyled justify-content-center gap-5 align-items-center">
          {categories.map((cat, i) => (
            <span
              className={`d-flex flex-column align-items-center`}
              style={{ cursor: "pointer", fontSize: "17px" }}
              onClick={() => {
                setCatInx(i);
                setOpen(true);
              }}
              // onDoubleClick={() =>}
            >
              <span
                className={`${
                  catInx === i && "TColor"
                } fw-semibold text-uppercase`}
                onClick={() => handleCat(cat)}
              >
                {cat}
              </span>
              <div className={`circle ${catInx == i && "visible"}`}></div>
            </span>
          ))}
        </ul>
      </div>

      {/* CATEGORIES */}
      {open && (
        <CategoryList
          cat={cat}
          setOpen={setOpen}
          setSelectedCat={setSelectedCat}
        />
      )}
      {loading ? (
        <h6>loading...</h6>
      ) : (
        <div className="productsList container   py-5">
          <div className="row">
            {productData.length > 0 ?
              productData.map((product) => (
                <div
                  className="col-xl-3 mb-sm-2 col-lg-4 col-6 p-1"
                  key={product._id}
                >
                  <ProductCard product={product} />
                </div>
              )) : <h1>No result found</h1>}
          </div>
        </div>
      )}
    </>
  );
}
