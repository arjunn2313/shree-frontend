import React, { useRef, useState } from "react";
import "./hero.css";
import { CiSearch } from "react-icons/ci";

export default function Hero() {
  const heroTitleRef = useRef(null);
 
  const [arr,setArr] =useState( [
    {
      id: 1,
      img: "assets/image - Copy.png",
      head: "Relaxed Fit Hoodie",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit cras duis ac fermentum at urna, dictumst ultricies tortor. Adipiscing sed urna, neque posuere aliquam porttitor at. ",
    },
    {
      id: 2,
      img: "assets/image 15.png",
      head: " Green Hoodie",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit cras duis ac fermentum at urna, dictumst ultricies tortor. Adipiscing sed urna, neque posuere aliquam porttitor at. ",
    },
    {
      id: 3,
      img: "assets/image.png",
      head: "Blue striped Shirt",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit cras duis ac fermentum at urna, dictumst ultricies tortor. Adipiscing sed urna, neque posuere aliquam porttitor at. ",
    },
    {
      id: 4,
      img: "assets/image (1).png",
      head: "Baggy Fit Pants",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit cras duis ac fermentum at urna, dictumst ultricies tortor. Adipiscing sed urna, neque posuere aliquam porttitor at. ",
    },
  ]);
  const [index,setIndex] = useState(0)
   
 
  // const handleImage = (id) => {
  //   const ind = arr.findIndex((img) => img.id === id);
  //   if (ind === -1) return; // Image not found
  
  //   const newArr = [...arr];
  //   const clickedImage = newArr.splice(ind, 1)[0];
  
  //   // Move the first image to the third index
  //   newArr.splice(2, 0, newArr.shift());
  
  //   // If clicked index is 2 (3rd index), move the 0 index image to 1st index
  //   if (ind === 3) {
  //     newArr.splice(1, 0, newArr.shift());
  //   }
  
  //   // Move the clicked image to the first index
  //   newArr.unshift(clickedImage);
  
  //   setIndex(0);
  //   setArr(newArr);

  //   if (heroTitleRef.current) {
  //     heroTitleRef.current.classList.add('fade-in');

  //     // Remove the class after the animation duration to reset for the next click
  //     setTimeout(() => {
  //       if (heroTitleRef.current) {
  //         heroTitleRef.current.classList.remove('fade-in');
  //       }
  //     }, 500); // Adjust this timeout to match the duration of your animation
  //   }
   
  // };
  
  const handleImage = (id) => {
    const ind = arr.findIndex((img) => img.id === id);
    if (ind === -1) return; // Image not found
  
    const newArr = [...arr];
    const clickedImage = newArr.splice(ind, 1)[0];
  
    // Move the first image to the third index
    newArr.splice(2, 0, newArr.shift());
  
    // If clicked index is 2 (3rd index), move the 0 index image to 1st index
    if (ind === 3) {
      newArr.splice(1, 0, newArr.shift());
    }
  
    // Move the clicked image to the first index
    newArr.unshift(clickedImage);
  
    setIndex(0);
    setArr(newArr);
  
     
  };
  

  
  
  
  

 
  return (
    <div className="container-fluid ">cccccc
      <div className="container">
        <div className="row ">
      
            <>
              <div className="col-6 hero-child-1 w-full h-full">
                <img src={arr[index].img} alt="hero" />
              </div>
              </>
      
          
              <div className="col-6  w-full">
                <div className="row">
                  <div className="col-4">
                    <div className="hero-title">
                    <span>0{`${arr[index].id}/`}</span>
                  <p>0{arr.length}</p>
                    </div>
                  </div>

                  {/*  */}
                  <div className="col-6">
                    <div
                      className="searchBorder d-flex rounded-5 "
                      style={{ height: "45px", overflow: "hidden" }}
                    >
                      <input
                        type="text"
                        className="w-100 m-2"
                        style={{ border: "none", outline: "none" }}
                      />
                      <div
                        className="w-25 d-flex justify-content-center align-items-center BColor"
                        style={{ height: "100%" }}
                      >
                        <CiSearch className="fs-4 text-white" />
                      </div>
                    </div>
                  </div>
                  {/*  */}
                </div>

                <div className="row">
                  <div className="col-12  d-flex gap-3">
                    {arr.map((img,i)=>(
                      i != index && (
                      <img src={img.img} onClick={()=>handleImage(img.id)}  
                      style={{
                        
                        width: '149px',
                        height: '97px',
                       
                      }}
                      />
                      )))}
                    
                  </div>
                </div>

                <div className="hero-description d-flex flex-column gap-2"  ref={heroTitleRef}>
                  <h2>{`${arr[index].head}`}</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                    cras duis ac fermentum at urna, dictumst ultricies tortor.
                    Adipiscing sed urna, neque posuere aliquam porttitor at.{" "}
                  </p>
                  <div className="explore-btn">
                    <button>EXPLORE MORE</button>
                  </div>
                </div>
              </div>
           
        </div>
      </div>
    </div>
  );
}

// <div className="container-fluid ">
// <div className="container">
//   <div className="row ">
//     <div className="col-6 hero-child-1 w-full h-full">
//       <img src="assets\image.png" alt="hero"/>
//     </div>

//     <div className="col-6  w-full">

//       <div className="row">
//       <div className="col-4">
//       <div className="hero-title">
//           <span>01/</span>
//           <p>04</p>
//         </div>
//       </div>

//       {/*  */}
//       <div className="col-6">
//          <div className="searchBorder d-flex rounded-5 " style={{height:'45px',overflow:'hidden'}}>
//             <input type="text" className="w-100 m-2" style={{border:'none',outline:'none'}}/>
//              <div className="w-25 d-flex justify-content-center align-items-center BColor" style={{height:'100%'}} ><CiSearch className="fs-4 text-white"/></div>
//          </div>

//       </div>
//       {/*  */}
//       </div>

//       <div className="row">
//         <div className="col-12">
//         <img src="assets\item 1.png" />
//         <img src="assets\item 2.png" />
//         <img src="assets\item 3.png" />
//         </div>
//       </div>

//       <div className="hero-description d-flex flex-column gap-2">
//         <h2>Relaxed Fit Hoodie</h2>
//         <p>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
//           cras duis ac fermentum at urna, dictumst ultricies tortor.
//           Adipiscing sed urna, neque posuere aliquam porttitor at.{" "}
//         </p>
//         <div className="explore-btn">
//           <button>EXPLORE MORE</button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
