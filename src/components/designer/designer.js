import React from "react";
import "./designer.css";

export default function Designer() {
  return (
    <div className="containor-fluid designer">
      <div className="text-center">
        <h2>Designer Clothes For You</h2>
        <p>
          Immerse yourself in the world of luxury fashion with our meticulously
          crafted designer clothes!
        </p>
      </div>

      {/* design */}
      <div className="gap-4 d-flex justify-content-center pt-5">
 <div class="card border-0" style={{width: '24rem'}}>
  <img src="assets\elegant-woman-straw-hat-isolated 2.png" class="card-img-top" alt="..."/>
  <div class="card-body text-center">
    <h5>Accessories</h5>
    <p class="card-text">Complete your ensemble with designer accessories such as handbags, scarves, belts, and hats.</p>
  </div>
</div>

<div class="card border-0" style={{width: '24rem'}}>
  <img src="assets\pexels-dima-valkov-6211617 1.png" alt="..."/>
  <div class="card-body text-center">
    <h5>Accessories</h5>
    <p class="card-text">Complete your ensemble with designer accessories such as handbags, scarves, belts, and hats.</p>
  </div>
</div>

<div class="card border-0" style={{width: '24rem'}}>
  <img src="assets\vknivfu sdkvbjieurg kjvn 1.png" alt="..."/>
  <div class="card-body text-center">
    <h5>Accessories</h5>
    <p class="card-text">Complete your ensemble with designer accessories such as handbags, scarves, belts, and hats.</p>
  </div>
</div>
</div>

    </div>
  );
}
