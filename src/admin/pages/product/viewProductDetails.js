import React, { useEffect, useState } from 'react'
import "./product.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../../api/api';
import { IoWarningOutline } from "react-icons/io5";



export default function AdminProductDetails() {
  const {id} = useParams()
  const [productData, setProductData] = useState({})
  const navigate = useNavigate()
  useEffect(()=>{
   
    axios.get(`${api}/product/${id}`).then((res)=>{
      setProductData(res.data)
    }).catch((error)=>{
      console.log(error);
    })
},[])

const handleDelete = async (id) => {
  console.log(id)
  try {
    await axios.delete(`${api}/product/${id}`);
    console.log('Product deleted successfully');
    navigate(-1); // Assuming 'navigate' is a function to navigate to a different page.
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

console.log(productData)
  return (
    <div className='product-detailss'>

      <div className='product-header'>

        <h5>New Product</h5>

        <div className='product-header-button'>
          <button className='text-danger' type='button'  data-bs-toggle="modal" data-bs-target="#exampleModal"><RiDeleteBin6Line/>Delete</button>
          <button className='text-success'><CiEdit/>Edit</button>
        </div>

      </div>

      <div className='w-75'>
      <table class="table table-borderless">
 
  <tbody className='border'>
    <tr>
      <th scope="row">Product code</th>
      <td>{productData.productCode}</td>
    </tr>
    <tr>
      <th scope="row">Product Category</th>
      <td>{productData.categories}</td>
    
    </tr>
    <tr>
      <th scope="row">Sub Category</th>
      <td colspan="2">{productData.subCategories}</td>
    </tr>

    <tr>
      <th scope="row">Product Name</th>
      <td colspan="2">{productData.productName}</td>
    </tr>

    <tr>
      <th scope="row">Product Type</th>
      <td colspan="2">{productData.productType}</td>
    </tr>

    <tr>
      <th scope="row">Price</th>
      <td colspan="2">{productData.price}</td>
    </tr>
    
    <tr>
      <th scope="row">GST</th>
      <td colspan="2">{productData.gst}</td>
    </tr>

    <tr>
      <th scope="row">Colours</th>
      {productData.color && productData.color.map((c,i)=>(
     <td colspan="2" key={i}>
      <span className='rounded-1 px-2'style={{background:`${c.colorCode}`}} ></span>
 </td>
      )) } 
    </tr>

    <tr>
      <th scope="row">Sizes</th>
   
  
  {productData.colors && productData.colors.map((color, i) => (
    <React.Fragment key={i}>
      {color.sizes.map((sizeObj, j) => (  
        <React.Fragment key={j}>
          <td>{sizeObj.size}</td>
        </React.Fragment>
      ))}
    </React.Fragment>
  ))}
 

    </tr>

    <tr>
      <th scope="row">Photos</th>

{productData.images && productData.images.map((img, i) => (
  <td colSpan="1" key={i}>
    {img.imageUrl[i] && img.imageUrl.map((url, j) => {
     
      console.log(url); 
      return (
        <img
          key={j}
          src={`${api}/${url}`}
          alt={`Product Image ${j + 1}`}
          style={{ width: '50px', height: '50px' }}
        />
      );
    })}
  </td>
))}

    
    </tr>

    <tr>
      <th scope="row">Status</th>
      <td colspan="2">
        <span className='d-flex gap-3'>
        <label>
  <input type='radio' name='status' value='active' />
  Active
</label>
<label>
  <input type='radio' name='status' value='inactive' />
  Inactive
</label>
<label>
  <input type='radio' name='status' value='outofstock' />
  Out of stock
</label>

        </span>
      </td>
    </tr>
  </tbody>
</table>
      </div>





      {/* Delete Modale */}
 

 
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title fs-5 text-danger gap-2 d-flex align-items-center justify-content-center" id="exampleModalLabel"><IoWarningOutline /> Delete Product ?</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body py-5">
      Are you sure you want to delete this product ?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-danger" onClick={()=>handleDelete(productData._id)}>Delete</button>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}
