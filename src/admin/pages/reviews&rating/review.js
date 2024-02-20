import React from "react";
import { IoIosStarOutline } from "react-icons/io";

export default function ReviewsAndRating() {
  return (
    <div className="m-3">
      <div className="bg-white rounded-3">
      <div className="p-3 d-flex gap-5">
        <div className="p-3 w-25">
          <h6>Ramesh</h6>
          <span className="d-flex flex-column">
            <span>December 09,2023</span>
            <span>2 day ago</span>
          </span>
        </div>

        <div className="py-3">
          <span className="d-flex gap-2">
            <IoIosStarOutline className="fs-5" />
            <IoIosStarOutline className="fs-5" />
            <IoIosStarOutline className="fs-5" />
            <IoIosStarOutline className="fs-5" />
            <IoIosStarOutline className="fs-5" />
          </span>
          <h5 className="py-2">The Products I purchased was too good.</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            pellentesque id dui eget venenatis. In hac habitasse platea
            dictumst. Pellentesque lacinia placerat nisl, non sagittis orci
            porttitor a. Vivamus non urna eget purus auctor venenatis vel vel
            sem.
          </p>
          <div className="d-flex gap-4 float-end">
        <button className="border-0 btn text-success fw-medium">Reject</button>
        <button className="border-0 btn btn-success">Approve</button>
      </div>
        </div>
      </div>

     
      </div>
    </div>
  );
}
