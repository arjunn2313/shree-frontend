import React, { useEffect, useState } from 'react'
import { api } from '../../api/api'

export default function BookingCard({product}) {
 
  
  const[totalAmount,setTotalAmout] = useState(null)
  

  useEffect(()=>{
    let sum = 0;
    for (let index = 0; index < product?.length; index++) {
     sum = sum+(Number(product[index].quantity)*product[index].price)
      setTotalAmout(sum)
    }
    },[product])
    console.log(product);
  return (
   
    <div className="border p-3 rounded-4 border-success">
    <h3 className="border-bottom pb-2">Items</h3>
    {/* //// */}
    {product && product?.map((product,index)=>(
      <>
    <div className="d-flex justify-content-between border-bottom pt-2 pb-4">
      <img
        src={`${api}/${product?.image}`}
        style={{ width: "232px", height: "232px" }}
        className="border rounded-2"
      />

      <div className="w-50 d-flex flex-column gap-4 ">
        <h6 className=" text-break ">{product && product?.productName}</h6>

        <span>Rs. {(product?.price * product.quantity).toLocaleString()}</span>
        <span className='d-flex align-items-center gap-2'>
          color :  <div className='border' style={{width:'25px',height:'15px',background:product.colorCode}}></div>
        </span>
       {product?.size != "" &&
        <span>Size : {product.size}</span>}
        <span>Quantity : {product.quantity}</span>
      </div>
    </div>
    </>
    ))   }
    {/* ///// */}
     <div className="d-flex flex-column gap-2 py-3 border-bottom" style={{fontSize:'12x'}}>
    <div className="d-flex justify-content-between align-items-center">
      <span>Sub Total</span>
      <span>Rs.{totalAmount?.toLocaleString()}</span>
    </div>

    <div className="d-flex justify-content-between align-items-center">
      <span>Tax</span>
      <span>Rs.0</span>
    </div>

    <div className="d-flex justify-content-between align-items-center">
      <span>Shipping</span>
      <span>Rs.15.00</span>
    </div>

    </div>

    <div className="row py-3">

      <div className="col-5 text-end ">Total Checkout</div>
      <div className="col-7 text-end text-success fw-bold">Rs.{totalAmount+15}.00</div>
      
    </div>


  
  </div>
  )
}
