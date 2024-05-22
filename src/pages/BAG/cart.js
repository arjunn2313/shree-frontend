import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import "./cart.css";
import Footer from "../../components/footer/footer";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/api";
import { deleteCartProduct, getUserCart } from "../../services/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdRemoveShoppingCart } from "react-icons/md";

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
  }, [cart]);

  const removeProduct = (id) => {
    console.log(id);
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 500);
  };

  const checkOut = () => {
    if (selectedProducts.length <= 0) {
      toast.warning("Select at least one item in bag to place order", {
        position: "top-center",
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
  return (
    <>
      <div className="container mt-4">
        <h4>My Cart</h4>
      </div>

      {cart && cart?.length > 0 ? (
        cart.map((product) => (
          <div className="container py-1 mt-4 mb-3 ">
            <div className="cart-container border border-success">
              <div className="row p-0 m-0">
                {/* COLUMN 1 */}
                <div className="col-md-9 cart-box-1 border-success  ">
                  <div className="row py-sm-4 py-1">
                    <div className="col-md-1 ms-2 mb-2 d-flex align-items-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={() => toggleSelection(product)}
                      />
                    </div>
                    <div className="col-md-5   p-0 mb-4  cart-box-1 border-success d-flex gap-4 align-items-center justify-content-center">
                      <img
                        src={`${api}/${product.image}`}
                        className="img-fluid cart-image d-block mx-auto"
                      />
                      <div>
                        <p className="fw-medium product-cart-title flex-wrap  ps-1 m-0 ">
                          {product.productId?.productName}
                        </p>
                        <span className="product-cart-categ text-secondary fw-medium">
                          {product.productId?.subCategories}
                        </span>
                      </div>
                    </div>
                    <div className="col-md col  cart-box-2 border-success d-flex flex-column gap-3 align-items-center justify-content-center">
                      <p className="fw-medium cart-colour m-sm-2 m-0">Colour</p>
                      <span
                        style={{
                          backgroundColor: product.colorCode,
                        }}
                        className="border color-icon"
                      ></span>
                    </div>
                    {product.size != "" && (
                      <div className="col-md col  border-end border-success d-flex flex-column gap-3 align-items-center justify-content-center">
                        <p className="fw-medium cart-size m-sm-2 m-0">Size</p>
                        <span className="fw-medium cartFont">
                          {product.size}
                        </span>
                      </div>
                    )}

                    <div className="col p-0 m-0 d-flex flex-column gap-3 align-items-center justify-content-center">
                      <p className="fw-medium fw-sm-normal cart-quantity m-sm-2 m-0">
                        Quantity
                      </p>
                      <span className="fw-medium cartFont">
                        {product.quantity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* COLUMN 2 */}
                <div className="col-md-3 p-0 d-flex flex-column justify-content-center align-items-center">
                  <h2 className="fw-semibold cart-price">
                    Rs. {(product.price * product.quantity).toLocaleString()}
                  </h2>
                  <p
                    className="text-success text-decoration-underline cartFont"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeProduct(product._id)}
                  >
                    Remove
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className="d-flex gap-3 align-items-center justify-content-center py-5 text-secondary">
         <MdRemoveShoppingCart/>   Empty Cart
        </h1>
      )}

 

      {cart?.length > 0   && (
        <div className="container mt-3 mb-4 d-flex justify-content-end">
          <div className="d-flex flex-column justify-content-center align-items-center gap-3">
            <h6 className="text-secondary   cart-total-s">
              Sub Total ({cart.length} items) :
              <span className=" TColor cart-total"> Rs. {totalAmount}</span>
            </h6>
            <button
              className="btn btn-success px-sm-5 px-2 fw-medium   fs-md-5 fs-6 rounded-md-5 rounded-3 BColor text-white"
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
