import React, { useEffect } from "react";
import { api } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrder } from "../../services/user/userSlice";

export default function MyOrders() {
  const dispatch = useDispatch();
  const myOrder = useSelector((state) => state?.auth?.getOrders);

  useEffect(() => {
    dispatch(getMyOrder());
  },[myOrder]);
 
  return (
    <>
      <div className="container mt-4">
        <h4 className="TColor fw-medium">My Orders</h4>
      </div>

      {myOrder &&
        myOrder?.orders?.map((order, i) => (
          <div
            className="container py-1 mt-4 mb-3 cart-container border border-success"
            key={i}
          >
            <div className="row">
              {/* COLUM  1*/}
              <div className="col-9 border-end border-success ">
                <h3 className="fs-6 p-2">Order placed on :  {new Date(order.paidAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</h3>
              {order?.orderItems?.map((product,i) => (
                <div className="row py-4 d-flex align-items-center justify-content-center">
                  <>
                      <div className="col-5 border-end border-success d-flex gap-4 align-items-center justify-content-center" key={i}>
                        <img
                          src={`${api}/${product.image}`}
                          style={{ width: "100px", height: "100px" }}
                          className="rounded-3"
                        />
                        <div>
                          <p
                            style={{ fontSize: "15px" }}
                            className="fw-medium text-center"
                          >
                              {product?.product?.productName}
                          </p>
                          <span className="fs-6 text-secondary fw-medium">
                          {product?.product?.subCategories}
                          </span>
                        </div>
                      </div>
                      <div className="col border-end border-success d-flex flex-column gap-3 align-items-center justify-content-center">
                        <p className="fw-medium fs-4">Colour</p>
                        <span
                          style={{
                            width: "77px",
                            height: "19px",
                            backgroundColor:product.color,
                          }}
                          className="border"
                        ></span>
                      </div>
                      {product.size && <div className="col border-end border-success d-flex flex-column gap-3 align-items-center justify-content-center">
                        <p className="fw-medium fs-4">Size</p>
                        <span className="fw-medium">{product.size} </span>
                      </div>}

                      <div className="col-2  d-flex flex-column gap-3 align-items-center justify-content-center">
                        <p className="fw-medium fs-4">Quantity</p>
                        <span className="fw-medium">{product.quantity}</span>
                      </div>
                      </>
                 
               </div>
                ))}
              </div>

              {/* COLUM  2*/}
              <div className="col-3 d-flex flex-column justify-content-center align-items-center">
                <p className="text-sm">
                Order number : {}
                </p>
                <h2
                  className="fw-semibold"
                  style={{ fontSize: "50px", color: "rgba(0, 82, 38, 1)" }}
                >
                  Rs.{order.totalPrice}
                </h2>
                <p
                  className="text-success text-decoration-underline"
                  style={{ cursor: "pointer" }}
                >
                 View invoice
                </p>

                <p
                  className="text-danger text-decoration-underline"
                  style={{ cursor: "pointer" }}
                >
                 Cancel Order
                </p>

              </div>
              </div>
            
          </div>
        ))}
    </>
  );
}
