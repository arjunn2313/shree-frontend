import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrder } from "../../services/user/userSlice";
import RatingModal from "../../components/modals/ratingModal";
import { useNavigate } from "react-router-dom";
import "./myOrders.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function MyOrders() {
  const dispatch = useDispatch();
  const myOrder = useSelector((state) => state?.auth?.getOrders);
  const [modalShow, setModalShow] = useState(false);
  const [prodId, setProdId] = useState("");
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const activeStep = 1;

  useEffect(() => {
    dispatch(getMyOrder());
  }, []);

  const handleModal = (proId, orderId) => {
    if (proId && orderId) {
      setProdId(proId);
      setOrderId(orderId);
      setModalShow(true);
    }
  };

  if (localStorage.token == undefined) {
    return (
      <div className="container  mt-4">
        <h4>My Orders</h4>
        <div className="d-flex flex-column align-items-center p-4 gap-4">
          <h5 className="text-center">PLEASE LOG IN</h5>
          <h6 className="text-secondary">
            Login to view items in your Orders.
          </h6>
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

  const handleGenerateInvoice = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${api}/order/generate-invoice/${id}`, {
        responseType: "blob", // Set the responseType to 'blob' to receive binary data
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");

      // Programmatically click the link to trigger the download
      document.body.appendChild(link);
      link.click();

      // Cleanup: remove the link and revoke the URL object
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Downloaded", {
        position: "top-center",
        hideProgressBar: true,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating invoice:", error);
      setIsLoading(false);
    }
  };

  const steps = [
    { title: "User details" },
    { title: "Payment" },
    { title: "Booking confirmation" },
  ];

  return (
    <>
      <div className="container mt-4">
        <h4 className="TColor fw-medium">My Orders</h4>
      </div>

      <RatingModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        prodId={prodId}
        orderId={orderId}
      />

      {myOrder &&
        myOrder?.orders?.map((order, i) => (
          <div
            className="container py-1 mt-4 mb-3 cart-container   border-success"
            key={i}
          >
            <div className="row">
              {/* COLUM  1*/}
              <div className="col-sm-9 border-end border-success">
                <h3 className="order-placed p-sm-2 p-0">
                  Order placed on :{" "}
                  {new Date(order.paidAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                {order?.orderItems?.map((product, i) => (
                  <div
                    className={`row py-4 d-flex align-items-center justify-content-center my-orders ${
                      i >= 1 && "border-top border-success"
                    }`}
                    key={product._id}
                  >
                    <>
                      <div
                        className="col-md-5 mb-4   col-12  order-box-1 border-success d-flex gap-4 align-items-center justify-content-center"
                        key={i}
                      >
                        <img
                          src={`${api}/${product.image}`}
                          className="rounded-3 img-fluid order-img"
                        />
                        <div>
                          <p
                            // style={{ fontSize: "15px" }}
                            id="order-title"
                            className="fw-medium text-center text-lg"
                          >
                            {product?.product?.productName}
                          </p>
                          <span
                            className="text-secondary fw-medium"
                            id="order-subcat"
                          >
                            {product?.product?.subCategories}
                          </span>
                        </div>
                      </div>
                      <div className="col-md col-4 border-end border-success d-flex flex-column gap-3 align-items-center justify-content-center">
                        <p className="fw-medium ">Colour</p>
                        <span
                          id="order-color"
                          style={{
                            backgroundColor: product.color,
                          }}
                          className="border"
                        ></span>
                      </div>
                      {product.size && (
                        <div className="col-md col-4 border-end border-success d-flex flex-column gap-3 align-items-center justify-content-center">
                          <p className="fw-medium   text-sm">Size</p>
                          <span className="fw-medium">{product.size} </span>
                        </div>
                      )}

                      <div className="col-md-2 col-4 d-flex flex-column gap-3 align-items-center justify-content-center">
                        <p className="fw-medium  ">Quantity</p>
                        <span className="fw-medium">{product.quantity}</span>
                      </div>
                    </>
                    {order.orderStatus === "Dispatch" && (
                      <p
                        className="text-success text-center m-0 mt-sm-3 p-0 fw-medium text-decoration-underline"
                        style={{ fontSize: "12px", cursor: "pointer" }}
                        onClick={() =>
                          handleModal(product.product._id, order._id)
                        }
                      >
                        Rate & Review product
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* COLUM  2*/}
              <div className="col-sm-3 m-0 p-0 d-flex flex-column justify-content-center align-items-center">
                <p className="orderNumber ">Order number : {order.orderId}</p>
                <h2
                  className="fw-semibold p-0 m-0 order-price"
                  style={{ color: "rgba(0, 82, 38, 1)" }}
                >
                  Rs.{order.totalPrice}
                </h2>

                {order.orderStatus === "Dispatch" && (
                  <a href={order?.trackLink}>
                  <button className="track-button m-sm-0 m-2">
                    Track Order
                  </button>
                  </a>
                )}

                {order.orderStatus !== "Cancel" && (
                  <p
                    className="text-success text-decoration-underline mt-sm-3  "
                    style={{ cursor: "pointer", fontSize: "12px" }}
                    onClick={() => handleGenerateInvoice(order._id)}
                  >
                    View Invoice
                  </p>
                )}

                {/* {order.orderStatus === "Dispatch" && (
                  <p
                    className="text-success fw-medium text-decoration-underline"
                    style={{ fontSize: "12px", cursor: "pointer" }}
                    onClick={() => setModalShow(true)}
                  >
                    Rate & Review Product
                  </p>
                )} */}

                {order.orderStatus === "Cancel" && (
                  <span
                    className="text-danger fw-medium  "
                    style={{ cursor: "pointer", fontSize: "2vw" }}
                  >
                    Canceled
                  </span>
                )}

                {order.orderStatus === "Ordered" && (
                  <p
                    className="text-danger text-decoration-underline"
                    style={{ cursor: "pointer", fontSize: "14px" }}
                  >
                    Cancel Order
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
