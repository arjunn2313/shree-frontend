import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { api, config } from "../../api/api";

export default function RatingModal(props) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment,setComment] = useState("")

  useEffect(() => {
    setHover(null);
    setRating(null);
  }, [props]);

  const handleClose = () => {
    props.onHide();
    setHover(null);
    setRating(null);
  };

  const handleRate = () => {
    if (rating === null) {
      toast.error("Rating required", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return; // Add a return statement to stop further execution if rating is null
    }
  
    if (props.prodId && props.orderId) {
      axios.post(
        `${api}/review/add/${props.prodId}/${props.orderId}`,
        {
          rating: rating, // Pass the rating value in the request body
          comment: comment, // Assuming you want to include the review comment
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      )
        .then((res) => {
          toast.success("Thanks for your rating", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
          });
  
          // You might want to close the modal here using a callback from props.onHide
          if (props.onHide) {
            props.onHide();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Rate & Review
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="form-label me-3">Rating :</label>
        {[...Array(5)].map((star, index) => (
          <label>
            <input
              type="radio"
              name="rating"
              value={index + 1}
              onClick={() => setRating(index + 1)}
              style={{ display: "none" }}
            />
            <FaStar
              size={30}
              style={{ cursor: "pointer" }}
              color={index + 1 <= (rating || hover) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(index + 1)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        ))}
        <div class="form-floating mt-3">
          <textarea
            style={{ height: "100px" }}
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            onChange={(e)=>setComment(e.target.value)}
          ></textarea>
          <label for="floatingTextarea">Comments</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
        <Button className="btn btn-success" onClick={handleRate}>Rate</Button>
      </Modal.Footer>
    </Modal>
  );
}
