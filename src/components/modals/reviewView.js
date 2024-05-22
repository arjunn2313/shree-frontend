import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaStar } from "react-icons/fa";
export default function ReviewView(props) {
  const [rating, setRating] = useState(3);

  return (
    <Modal
      {...props}
      size="lg"
      fullscreen
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ratings & Reviews
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {props.reviews.map((review,index) => (
        <div className="row p-2" key={index}>
          <div
            className="col-2"
            style={{
              backgroundColor: "#4285f4",
              color: "#ffffff",
              width: 30,
              height: 30,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
            }}
          >
            {/* {props.initial || "A"} */}
           { review.username.charAt(0).toUpperCase()}
          </div>
          <div className="col-10">
            <h6>{review.username}</h6>
            {[...Array(5)].map((star, index) => (
              <label className="mb-2">
                <input
                  type="radio"
                  name="rating"
                  value={index + 1}
                  style={{ display: "none" }}
                />
                <FaStar
                  size={20}
                  style={{ cursor: "pointer" }}
                  color={index + 1 <= review.rating ? "#ffc107" : "#e4e5e9"}
                />
              </label>
            ))}
            <p>
              {review.comment}
            </p>
          </div>
        </div>
      ))}
     </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

// function App() {

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }
