import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import "./cart.css";
import Footer from "../../components/footer/footer";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/api";
import { deleteCartProduct, getUserCart } from "../../services/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.auth.userCart);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmout] = useState(null);
  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cart?.length; index++) {
      sum = sum + Number(cart[index].quantity) * cart[index].price;
      setTotalAmout(sum);
    }
  },[cart]);

  const removeProduct = (id) => {
    console.log(id);
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 500);
  };

  const checkOut = () => {
    if (selectedProducts.length <= 0) {

      toast.warning("Select at least one item in bag to place order",{
        position:'top-center',
        hideProgressBar: true,
        autoClose: 2000,
      });
    } else {
      navigate("/order", { state: selectedProducts });
    }
  };

  const toggleSelection = (product) => {
    if (isSelected(product)) {
      setSelectedProducts(
        selectedProducts.filter(
          (selectedProduct) => selectedProduct._id !== product._id
        )
      );
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const isSelected = (product) =>
    selectedProducts.some(
      (selectedProduct) => selectedProduct._id === product._id
    );

  if (localStorage.token == undefined) {
    return (
      <div className="container  mt-4">
        <h4>My Cart</h4>
        <div className="d-flex flex-column align-items-center p-4 gap-4">
          <h5 className="text-center">PLEASE LOG IN</h5>
          <h6 className="text-secondary">Login to view items in your Cart.</h6>
          <div>
            <button className="btn btn-outline-success px-5 mt-5" onClick={() => navigate("/user-account")}>Login</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="container mt-4">
        <h4>My Cart</h4>
      </div>

      {/* cart containor */}

      {cart && cart?.length > 0 ? (
        cart.map((product) => (
          <div className="container py-1 mt-4 mb-3 cart-container border border-success">
            <div className="row">
              {/* COLUM  1*/}
              <div className="col-9 border-end border-success ">
                <div className="row py-4">
                  <div className="col-1  d-flex align-items-center">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={() => toggleSelection(product)}
                    />
                  </div>
                  <div className="col-5 border-end border-success d-flex gap-4 align-items-center justify-content-center">
                    <img
                      src={`${api}/${product.image}`}
                      style={{ width: "100px", height: "100px" }}
                    />
                    <div>
                      <p style={{ fontSize: "15px" }} className="fw-medium">
                        {product.productId?.productName}
                      </p>
                      <span className="fs-6 text-secondary fw-medium">
                        {product.productId?.subCategories}
                      </span>
                    </div>
                  </div>
                  <div className="col border-end border-success d-flex flex-column gap-3 align-items-center justify-content-center">
                    <p className="fw-medium fs-4">Colour</p>
                    <span
                      style={{
                        width: "77px",
                        height: "19px",
                        backgroundColor: product.colorCode,
                      }}
                      className="border"
                    ></span>
                  </div>
                  {product.size != "" && (
                    <div className="col border-end border-success d-flex flex-column gap-3 align-items-center justify-content-center">
                      <p className="fw-medium fs-4">Size</p>
                      <span className="fw-medium">{product.size}</span>
                    </div>
                  )}

                  <div className="col-2  d-flex flex-column gap-3 align-items-center justify-content-center">
                    <p className="fw-medium fs-4">Quantity</p>
                    <span className="fw-medium">{product.quantity}</span>
                  </div>
                </div>
              </div>

              {/* COLUM  2*/}
              <div className="col-3 d-flex flex-column justify-content-center align-items-center">
                <h2
                  className="fw-semibold"
                  style={{ fontSize: "50px", color: "rgba(0, 82, 38, 1)" }}
                >
                  Rs. {(product.price * product.quantity).toLocaleString()}
                </h2>
                <p
                  className="text-success text-decoration-underline"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeProduct(product._id)}
                >
                  Remove
                </p>
              </div>
            </div>
          </div>
        ))
      ) : 
    
      (
        <h1 className="d-flex align-items-center justify-content-center py-5 text-secondary">
          Cart Is Empty
        </h1>
      )}

      {totalAmount !== null && (
        <div className="container mt-3 mb-4 d-flex justify-content-end ">
          <div className="d-flex flex-column justify-content-center align-items-center gap-3">
            <h6 className="text-secondary fs-2">
              Sub Total ({cart.length} items) :
              <span className="fs-1 TColor"> Rs. {totalAmount}</span>
            </h6>
            <button
              className="btn btn-success px-5 fw-medium fs-5 rounded-5 BColor text-white"
              onClick={() => checkOut()}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </>
  );
}
