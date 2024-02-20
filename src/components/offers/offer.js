import React from "react";
import "./offer.css";

export default function Offer() {
  return (
    <div className="offer container-fluid">
      <div className="offer-wrapper">
        <div className="row">
          <div className="col-6 d-block " style={{position:'relative'}}>
       
            <img src="assets\Group 37.png" className="ss"/>
            
            <img
              className="float-end"
              src="assets\excited-white-girl-bright-stylish-glasses-posing-pink-dreamy-curly-woman-playing-with-her-ginger-hair-laughing 1.png"
            />
          </div>

          <div className="col-6  offer-wrapper">
            <div className="offer-title" style={{width:'70%'}}>
              <h2>Exclusive offer</h2>

              <p>
                Unlock the ultimate style upgrade with our exclusive offer Enjoy
                savings of up to 40% off on our latest New Arrivals
              </p>

              <div className="offer-timer d-flex gap-3 align-items-center"> 
                <div>
                    <h4>06</h4>
                    <p>Days</p>
                </div>

                <div>
                    <h4>18</h4>
                    <p>Hours</p>
                </div>

                <div>
                    <h4>05</h4>
                    <p>Minutes</p>
                </div>

                
              </div>

              <div className="offer-btn">
                <button>BUY NOW</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
