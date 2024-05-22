import React from "react";
import "./designer.css";

export default function Designer() {
  const designer = [
    {
      id: 1,
      img: "assets/elegant-woman-straw-hat-isolated 2.png",
      title: "Accessories",
      content:
        " Complete your ensemble with designer accessories such as handbags, scarves, belts, and hats.",
    },
    {
      id: 2,
      img: "assets/pexels-dima-valkov-6211617 1.png",
      title: "Accessories",
      content:
        " Complete your ensemble with designer accessories such as handbags, scarves, belts, and hats.",
    },
    {
      id: 3,
      img: "assets/vknivfu sdkvbjieurg kjvn 1.png",
      title: "Accessories",
      content:
        " Complete your ensemble with designer accessories such as handbags, scarves, belts, and hats.",
    },
  ];
  return (
    <div className="container  designer">
      <div className="text-center designer-heading">
        <h2>Designer Clothes For You</h2>
        <p id="designer-description">
          Immerse yourself in the world of luxury fashion with our meticulously
          crafted designer clothes!
        </p>
      </div>

      {/* design */}
      <div className="gap-4 d-flex flex-wrap justify-content-center pt-5">
        {designer.map((design) => (
          <div class="card  border-0" style={{ width: "24rem" }} key={design.id}> 
            <img
              src={design.img}
              class="card-img-top border designer-img"
              style={{
              
                backgroundColor: "rgba(211, 226, 215, 1)",
              }}
              alt="img..."
            />
            <div class="card-body text-center">
              <h5 className="designer-title">{design.title}</h5>
              <p class="card-text designer-content">{design.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
