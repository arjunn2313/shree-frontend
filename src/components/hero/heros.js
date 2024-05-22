import React, { useEffect, useRef, useState } from "react";
import "./hero.css";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Heros() {
  const heroTitleRef = useRef(null);

  const [arr, setArr] = useState();
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [adv, setAdv] = useState([]);

  useEffect(() => {
    axios.get(`${api}/advertisment/getAll`).then((res) => {
      console.log(res.data);
      setAdv(res.data);
    });
  }, []);

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
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    navigate(`/products-list?sub=${searchInput}`);
    console.log("hi");
  };

  return (
    <div className="container">
      {/* search bar after xl screen */}
      <div className="row d-xl-none">
        <div className="col-md-6 col-3 d-none d-sm-block">
          <div className="hero-title">
            <span>{index + 1}/</span>
            <p>0{adv.length}</p>
          </div>
        </div>

        <div className="col-md-6 col-sm-9 col-12 mb-3">
          <div
            className="searchBorder d-flex rounded-5 "
            style={{ height: "45px", overflow: "hidden" }}
          >
            <input
              type="text"
              className="w-100 m-2"
              style={{ border: "none", outline: "none" }}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div
              className="w-25 d-flex justify-content-center align-items-center BColor"
              style={{ height: "100%" }}
              onClick={() => handleSearch()}
            >
              <CiSearch className="fs-4 text-white"  onClick={() => handleSearch()} />
            </div>
          </div>
        </div>
      </div>

      <div className="row ">
        <>
          <div className="col-md-6 hero-child-1 w-full h-full mb-2">
            <img
              src={`${api}${adv[index]?.image}`}
              alt="hero"
              className="img-fluid"
            />
          </div>
        </>

        <div className="col-12 col-md-6 w-full">
          <div className="row searchBar">
            <div className="col-4">
              <div className="hero-title">
                <span>{index + 1}/</span>
                <p>0{adv.length}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="searchBorder d-flex rounded-5 "
                style={{ height: "45px", overflow: "hidden" }}
              >
                <input
                  type="text"
                  className="w-100 m-2"
                  style={{ border: "none", outline: "none" }}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <div
                  className="w-25 d-flex justify-content-center align-items-center BColor"
                  style={{ height: "100%" }}
                  onClick={() => handleSearch()}
                >
                  <CiSearch className="fs-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12  d-flex  gap-3">
              {adv?.map(
                (img, i) =>
                  i != index && (
                    <img
                      src={`${api}${img.image}`}
                      className="img-fluid hero-img-2"
                      onClick={() => handleImage(img._id)}
                    />
                  )
              )}
            </div>
          </div>

          <div
            className="hero-description d-flex flex-column gap-sm-2"
            ref={heroTitleRef}
          >
            <h2>{`${adv[index]?.heading}`}</h2>
            <p>{`${adv[index]?.content}`}</p>
            <div className="explore-btn"  style={{cursor:"pointer"}}>
              <button
             
              onClick={()=>navigate("/products-list")}
              >EXPLORE MORE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
