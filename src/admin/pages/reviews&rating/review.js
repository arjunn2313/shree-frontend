import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { adminConfig, api } from "../../../api/api";
import { toast } from "react-toastify";
export default function ReviewsAndRating() {
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState([]);

  const fetchReviews = () => {
    axios
      .get(`${api}/review/verify-review`,adminConfig)
      .then((res) => {
        console.log(res.data.products);
        setReview(res.data.reviews);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  }

  const handleDelete = (prodId, revId) => {
    try {
      axios
        .delete(`${api}/review/delete-review/${prodId}/${revId}`,adminConfig)
        .then((res) => {
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: true,
          });
          fetchReviews();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = (prodId, revId) => {
    try {
      axios
        .put(`${api}/review/verify-review/${prodId}/${revId}`,"", adminConfig)
        .then((res) => {
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: true,
          });
          fetchReviews();
        });
    } catch (error) {
      console.log(error);
    }
  };


  function calculateTimeAgo(dateString) {
    const today = new Date();
    const reviewDate = new Date(dateString);
    const timeDifference = today - reviewDate;

    const minutesAgo = Math.floor(timeDifference / (1000 * 60));
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (minutesAgo < 60) {
      return `${minutesAgo} minute${minutesAgo !== 1 ? "s" : ""} ago`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hour${hoursAgo !== 1 ? "s" : ""} ago`;
    } else {
      return `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
    }
  }

  return (
    <div className="m-3 p-3">
      {review &&
        review.map((reviews, index) => (
          <div className="rounded-4 row bg-white mb-3">
            <div className="p-3 col-md-4">
              <h6 className="textColor fs-5">{reviews?.review?.username}</h6>
              <span className="d-flex flex-column" style={{fontSize:"12px"}}>
                <span className="text-secondary text-sm">
                  {formatDate(reviews?.review?.date)}
                </span>
                <span className="text-secondary">
                  {calculateTimeAgo(reviews?.review?.date)}
                </span>
              </span>
            </div>

            <div className="py-3 col-md-8">
              {[...Array(5)].map((star, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name={`rating-${index}`}
                    value={index + 1}
                    onClick={() => setRating(index + 1)}
                    style={{ display: "none" }}
                  />
                  <FaStar
                    size={20}
                    style={{ cursor: "pointer" }}
                    color={
                      index + 1 <= reviews?.review?.rating
                        ? "rgba(0, 82, 38, 1)"
                        : "#e4e5e9"
                    }
                  />
                </label>
              ))}
              <span className="text-secondary ms-3">
                {" "}
                ({reviews?.review?.rating}/5)
              </span>
              <h5 className="py-3">{reviews?.review?.comment}</h5>

              <div className="col-12 text-md-end">
                <button
                  className="border-0 col-12 col-md-2 btn text-success fw-medium mb-2 mb-md-0"
                  onClick={() =>
                    handleDelete(reviews.productId, reviews.review._id)
                  }
                >
                  Reject
                </button>
                <button
                  className="border-0 col-12 col-md-2 btn btn-success"
                  onClick={() =>
                    handleApprove(reviews.productId, reviews.review._id)
                  }
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
