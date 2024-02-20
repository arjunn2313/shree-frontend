import React, { useState,useRef, useEffect }  from "react";
import "./product.css";
import Drag from "../../components/dragAndDrop/dragAndDrop";
import axios from "axios";
import { IoIosClose } from "react-icons/io";
import { IoIosImages } from "react-icons/io";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";


export default function UploadProduct() {
  const category = ["men","women","kids","Others"]
  const productType = ["Indian","Western Wear","Lingerie & Sleep wear","Others"]
  const sizes = ['S','M','L','XL','XXL']

  const [uploadImage,setUploadImage] = useState(false)
  const [uploadButton,setUploadButton] = useState(false)
  const [updateProduct,setUpdateProduct] = useState([])

  const [productData, setProductData] = useState({
    productCode: "",
    categories: "",
    subCategories: "",
    productName: "",
    productType: "",
    price: 0,
    gst: 0,
    images: [
      {
        imageUrl: []  
      }
    ]
  });

  const [colors, setColors] = useState([{ color: '', sizes: [{ size: '', stock: '' }] }]);
  const fileInputRef = useRef();
  console.log(colors);
 console.log(productData);
  const  handleDone = () =>{
    setUploadButton(true)
    setUploadImage(false)
  
  }

  const [images, setImages] = useState([]);

 

  const selectFile = () => {
    fileInputRef.current.click();
  };
 

 

  const deleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, id) => id != index));
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  };

  const onFileSelect = (e) => {
    const files = e.target.files;
    if (files.length == 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
     
        setImages((prevImages) => [...prevImages, files[i]])
        // setProductData({ ...productData, images: files });
      
    }
  };

  const handleImageChange = (e, index) => {
    const updatedImages = [...productData.images];
    updatedImages[index] = { imageUrl: [...e.target.files] };
    setProductData({ ...productData, images: updatedImages });
  };

  const handleColorChange = (index, event) => {
    const newColors = [...colors];
    newColors[index].color = event.target.value;
    setColors(newColors);
  };

  const handleSizeChange = (colorIndex, sizeIndex, event) => {
    const newColors = [...colors];
    newColors[colorIndex].sizes[sizeIndex].size = event.target.value;
    setColors(newColors);
  };

  const handleStockChange = (colorIndex, sizeIndex, event) => {
    const newColors = [...colors];
    newColors[colorIndex].sizes[sizeIndex].stock = event.target.value;
    setColors(newColors);
  };

  const handleMore = () => {
    setColors((prevColors) => [
      ...prevColors,
      { color: '', sizes: [{ size: '', stock: '' }] }
    ]);

    setProductData((prevProductData) => ({
        ...prevProductData,
        images: [
          ...prevProductData.images,
          { imageUrl: [] }  
        ]
      }));
  };
  

  const handleChange = (e, field, index) => {
    const { name, value, files } = e.target;

    if (field === "color") {
      const updatedColors = [...productData.color];
      updatedColors[index] = { ...updatedColors[index], colorCode: value };
      setProductData({ ...productData, color: updatedColors });
    } else if (field === "variation") {
      const updatedVariations = [...productData.variation];
      updatedVariations[index] = {
        ...updatedVariations[index],
        [name.split(".")[1]]: String(value),
      };
      setProductData({ ...productData, variation: updatedVariations });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };


  const handleVariatrion = (e,i) => {
    const { name, value } = e.target;
    const updatedProductData = { ...productData };
  
    if (name.includes('color')) {
      const colorIndex = parseInt(name.split('.')[1], 10);
      const model = updatedProductData.variation[0].model[0];
  
      if (!model.colour[colorIndex]) {
        model.colour[colorIndex] = {};
      }
  
      model.colour[colorIndex][name.split('.')[2]] = value;
    }
  
    setProductData(updatedProductData);
  }
 
  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("productCode", productData.productCode);
    formData.append("categories", productData.categories);
    formData.append("subCategories", productData.subCategories);
    formData.append("productName", productData.productName);
    formData.append("productType", productData.productType);
    formData.append("price", productData.price);
    formData.append("gst", productData.gst);
    formData.append('colors',JSON.stringify(colors))
    productData.images.forEach((image, index) => {
      image.imageUrl.forEach((file, urlIndex) => {
        formData.append(`images`, file);
      });
    });
   

    try {
      await axios.post("http://localhost:6060/product", formData);
      console.log("done");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(images)
  
  return (
    <div className="upload-product p-3 position-relative">
      {/* {showDragComponent && <Drag/>} */}
      {/*  */}
   { uploadImage &&  <div className="dragandDrop">
        <span>
        <IoIosClose className="fs-2" style={{cursor:"pointer"}} onClick={()=>setUploadImage(false)}  />
        </span>
      <div
        className="drop-containor "
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <span className="drag-icon">
          <IoIosImages/>
        </span>
        <span>
          <p className="text-secondary fw-bold">
            Drop your images here, or
            <span role="button" onClick={selectFile} className="text-success text-decoration-underline">
              {" "}
              browse
            </span>
          </p>
        </span>
        {/* <input
          type="file"
          name="file"
          className="file"
          multiple
          ref={fileInputRef}
          onChange={onFileSelect}
        /> */}

     {productData.images.map((file, index) => (
        <div key={index} className="d-none">
          <label>Image</label>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            name={`images[${index}].imageUrl`}
            // onChange={onFileSelect}
            onChange={(e) => handleImageChange(e, index)}
          />
          <br />
        </div>
      ))}
        <span className="text-secondary" style={{fontSize:'14px'}}>(upload maximum 4 photos)</span>
        
      </div>
 

{productData.images && (
  <div className="droped-img">
    {productData.images.map((image, index) => (
      <div className="selcted-img" key={index}>
        {image.imageUrl.map((file,fileIndex)=>(
          <div className="selcted-img">
   <span className="close-button" onClick={() => deleteImage(index)}>
   <IoIosClose />
 </span>
 <img src={URL.createObjectURL(file)} alt={`Image ${index}`} />
 </div>
        ))}
     
      </div>
    ))}
  </div>
)}


     <button className="btn btn-success m-3" onClick={handleDone}>Done</button> 
    </div>}

      {/*  */}
      <h6 className="text-secondary ">New Product</h6>

{/* Form */}
      <div className="product-form">
        <form className="row">
          <div className="col-6 mb-3">
            <label className="form-label">Product Code</label>
            <input type="tel" className="form-control" name="productCode" value={productData.productCode} onChange={handleChange}/>
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">Product Category</label>
             <select className="form-select" name="categories" value={productData.categories} onChange={handleChange}>
              <option>Select---</option>
              {category.map((itm ,i)=>(
                <option key={i}>{itm}</option>
              ))}
             </select>
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">Sub Category</label>
            <input type="text" className="form-control mb-3" name="subCategories" value={productData.subCategories} onChange={handleChange}/>
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">Product name</label>
            <input type="text" className="form-control mb-3"  name="productName" value={productData.productName} onChange={handleChange}/>
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">Product Type</label>
            <select className="form-select" name="productType" value={productData.productType} onChange={handleChange}>
              <option>---type</option>
              {productType.map((itm,i)=>(
                <option key={i}>{itm}</option>
              ))}
             </select>
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">Price</label>
            <input type="text" class="form-control mb-3" name="price" value={productData.price} onChange={handleChange} />
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">GST</label>
            <input type="text" class="form-control mb-3" name="gst" value={productData.gst} onChange={handleChange}/>
          </div>

          <div className="col-12">
            <h6>Available Colours, Sizes & Quantity.</h6>
          </div>

       

       {colors.map((color, index) => (
        <>
        <div key={index} className="col-2">
          <label>color</label>
          <input
          className="form-control form-control-color w-75 h-50"
            type="color"
            style={{ height: "20px" }}
            value={color.color}
            onChange={(e) => handleColorChange(index, e)} 
          />
        </div>
        {color.sizes.map((size,sizeIndex)=>(
          <>
          <div key={sizeIndex} className="col-4 mb-3">
          <div className="d-flex align-items-center justify-content-between">
        <label className="form-label">Size</label>
       <span className="text-end" type="button" onClick={() => setColors(colors.map((c, i) => i === index ? {...c, sizes: [...c.sizes, { size: '', stock: '' }] } : c))}>Add more</span>
              </div>
          <select className="form-select" 
          value={size.size} 
          onChange={(e) => handleSizeChange(index, sizeIndex, e)}>
            <option>Select---</option>
              {sizes.map((itm,i)=>(
                <option key={i}>{itm}</option>
              ))}
             </select>
          </div>
          <div className="col-3 mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="text"
            className="form-control"
            value={size.stock} 
            name={`variation[${index}].count`}
            onChange={(e) => handleStockChange(index, sizeIndex, e)}
          />
          </div>

          </>
        ))}
        </>     
      ))}



     

 


          <div className="col-2 d-flex flex-column ">
            <span className="text-end" onClick={handleMore}>Add More</span>
            <div>
       

<button
  type="button"
  className="w-100 py-2 upload-btn" 
  onClick={() => setUploadImage(true)}
>
  Upload Image
</button>

     {productData.images.map((images, index) => (
     <div className="" key={index}>
    {images.imageUrl.map((file, fileIndex) => (
      <img
        src={URL.createObjectURL(file)}
        style={{ width: '30px', height: '30px' }}
        className="rounded-circle"
        key={fileIndex}
       />
     ))}
   </div>
    ))}


            </div>
          </div>

          <div className="d-flex justify-content-end gap-5 mt-3">
            <button type="button" className="bg-white border-0 text-danger fw-medium  px-5">Discard</button>
            <button className="btn btn-success px-5 fw-medium text-white" onClick={handlePost}>Continue</button>

          </div>
        </form>
      </div>
    </div>
  );
}

 
