import React, { useEffect, useRef, useState } from "react";
import "./hero.css";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { api } from "../../api/api";

export default function Heros() {
  const heroTitleRef = useRef(null);

  const [arr, setArr] = useState();
  const [index, setIndex] = useState(0);

  const [adv, setAdv] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:6060/advertisment/getAll").then((res) => {
      console.log(res.data);
      setAdv(res.data);
    });
  },[]);

  const handleImage = (id) => {
    const ind = adv.findIndex((img) => img._id === id);
    if (ind === -1) return;  

    const newArr = [...adv];
    const clickedImage = newArr.splice(ind, 1)[0];

    newArr.splice(2, 0, newArr.shift());

    if (ind === 3) {
      newArr.splice(1, 0, newArr.shift());
    }

    newArr.unshift(clickedImage);

    setIndex(0);

    setAdv(newArr);
  };

 
console.log(adv[index]?.image);
  return (
 
    <div className="container-fluid ">
      <div className="container">
        <div className="row ">
          <>
            <div className="col-6 hero-child-1 w-full h-full">
              <img src={`${api}${adv[index]?.image}`} alt="hero" />
            </div>
          </>

          <div className="col-6  w-full">
            <div className="row">
              <div className="col-4">
                <div className="hero-title">
                  <span>{index + 1}/</span>
                  <p>0{adv.length}</p>
                </div>
              </div>
               

         
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
               
       </div>
  
            <div className="row">
              <div className="col-12  d-flex gap-3">
                {adv?.map(
                  (img, i) =>
                    i != index && (
                      <img
                        src={`${api}${img.image}`}
                        onClick={() => handleImage(img._id)}
                        style={{
                          width: "149px",
                          height: "97px",
                        }}
                      />
                    )
                )}
              </div>
                </div>

             <div
              className="hero-description d-flex flex-column gap-2"
              ref={heroTitleRef}
            >
              <h2>{`${adv[index]?.heading}`}</h2>
              <p>
                {`${adv[index]?.content}`}
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
