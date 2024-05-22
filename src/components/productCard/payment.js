import axios from "axios";
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch } from "react-redux";
import { createAnOrder } from "../../services/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Payment({ product, user, address }) {
  const navigate = useNavigate();
  const [down, setDown] = useState(true);
  const [totalAmount, setTotalAmout] = useState(null);
  const dispatch = useDispatch();
  // const[paymentInfo,setPaymentInfo] = useState({
  //   razorPayPaymentId:"",
  //   razorPayOrderId:"",
  // })

  const [cartProductState, setCartProductState] = useState([]);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < product?.length; index++) {
      sum = sum + Number(product[index].quantity) * product[index].price;
      setTotalAmout(sum);
    }
  }, [product]);

  console.log(product);

  useEffect(() => {
    let items = [];
    for (let index = 0; index < product.length; index++) {
      items.push({
        product: product[index].productId._id,
        quantity: product[index].quantity,
        color: product[index].colorCode,
        image: product[index].image,
        price: product[index].price,
        size: product[index].size,
      });
    }
    setCartProductState(items);
  }, []);

  const upi = [
    {
      url: "assets/Group 1000001779 (1).svg",
      method: "Gpay",
    },
    {
      url: "assets/phonepe-logo-icon 1.svg",
      method: "Phonepe",
    },
    {
      url: "assets/paytm-icon 1.svg",
      method: "Paytm",
    },
    ,
    {
      url: "assets/paypal-icon 1.svg",
      method: "PayPal",
    },
  ];
  console.log(user);

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_uZFS2sWXlTVTg2",
      amount: data.amount,
      currency: data.currency,
      name: "Shree Textiles",
      description: "Test Transaction",
      image: "assets/Untitled-1-01 1.png",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:6060/pay/verify";
          const { data } = await axios.post(verifyUrl, response);
          const paymentInfo = await {
            razorPayPaymentId: response.razorpay_order_id,
            razorPayOrderId: response.razorpay_order_id,
          };

          dispatch(
            createAnOrder({
              totalPrice: totalAmount,
              orderItems: cartProductState,
              paymentInfo,
            })
          );

          navigate("/myorders");
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:6060/pay/orders";
      const { data } = await axios.post(orderUrl, { amount: totalAmount + 15 });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* <h6>Shipping Address</h6> */}

      <div className="accordion " id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              className="btn btn-white border-0  w-100 fw-medium   d-flex justify-content-between"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
              onClick={() => setDown(!down)}
            >
              Shipping Address{" "}
              <span>
                {down ? (
                  <IoIosArrowUp className="fs-5" />
                ) : (
                  <IoIosArrowDown className="fs-5" />
                )}
              </span>
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            class="accordion-collapse collapse show"
          >
            <div className="p-3 ">
              <h6>
                {user?.firstName} {user?.lastName}
              </h6>
              <p>{address.address}</p>
              <p>
                {address?.city},{address?.state},{address?.pincode}
              </p>
              <p>{address?.country}</p>
              <p>phone - {user.phone}</p>
              <p>Alternative - {user.phone}</p>
            </div>
          </div>
        </div>

        {/* <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              className="btn btn-white border-0  w-100 fw-medium   d-flex justify-content-between"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
              onClick={()=>setDown(!down)}
            >
              UPI <span>{down ?  <IoIosArrowUp className="fs-5"/>:<IoIosArrowDown className="fs-5" /> }</span>
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            class="accordion-collapse collapse show"
          >
            {upi.map((method, i) => (
              <div class="accordion-body d-flex justify-content-between align-items-center ">
                <div className="d-flex  gap-5 justify-content-between  align-items-center">
                  <img src={method.url} alt="gpay" />
                  <span className="fs-6 fw-medium">{method.method}</span>
                </div>
                 
                <input type="radio" name="upi" className="radio-pay" />
                
              </div>
            ))}
          </div>
        </div> */}
        {/* 
        <div class="accordion-item mt-3 border-top">
          <h2 class="accordion-header">
            <button
              className="btn btn-white border-0  w-100 fw-medium  text-start"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseTwo"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseTwo"
            >
              Credit / Debit / ATM Card
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseTwo"
            class="accordion-collapse collapse show"
          >
            <div className="mx-auto py-3" style={{ width: "90%" }}>
              <label className="form-label">Card Number</label>
              <input type="text" className="form-control mb-2" />
              
              <div className="d-flex align-items-end mb-3 gap-2">
              <div className="w-50">
              <label className="form-label">Valid thru</label>
              <select class="form-select " aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              </div>

              <div className="w-50">
              <select class="form-select" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              </div>
              </div>

              <label className="form-label">CVV</label>
              <input type="text" className="form-control mb-2" />
             
            </div>
          </div>
        </div> */}
      </div>
      <button
        className="btn btn-success mt-5 d-block mx-auto col-4"
        onClick={handlePayment}
      >
        PAY NOW
      </button>
    </>
  );
}

{
  /* <Accordion defaultActiveKey={['0']} className="custom-accordion">
    <Accordion.Item eventKey="0">
      <Accordion.Header className="custom-accordion-header">UPI</Accordion.Header>
      <Accordion.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
      <Accordion.Header>Credit / Debit / ATM Card</Accordion.Header>
      <Accordion.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
      </Accordion.Body>
    </Accordion.Item>
  </Accordion> */
}
