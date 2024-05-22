import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { adminConfig, api } from "../../../api/api";

function TrackIdModal({ lgShow, setLgShow, id }) {
  const [product, setProduct] = useState({
    trackNumber: "",
    deliveryPartner: "",
    trackLink: ""
  });

 

  const [errors, setErrors] = useState({});

  
  const handleChange = (e) =>{
    setProduct({...product,[e.target.name] : e.target.value});
    // Clear validation errors when input changes
    setErrors({...errors, [e.target.name]: ""});
  };

  const handleSave = async (e) => {
  e.preventDefault()
    const errors = {};
    if (!product.trackNumber) {
      errors.trackNumber = "Track number is required";
    }
    if (!product.deliveryPartner) {
      errors.deliveryPartner = "Delivery partner is required";
    }
    if (!product.trackLink) {
      errors.trackLink = "Track link is required";
    }
  
    // If there are validation errors, set them and return early
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
  
    try {
      const response = await axios.put(`${api}/order/update-dispatched-order/${id}`, product,adminConfig);
      console.log(response.data);
      // Close the modal
      setLgShow(false);
    } catch (error) {
      // Handle other errors
      console.error("Error updating product:", error);
    }
  };
  

  return (
    <>
      <Modal
        centered
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body>
          <div className="row py-3 fw-bold">
            <div className="col-6">Invoice Number:{id}</div>
            <div className="col-6">Customer Name: Arjun</div>
          </div>

          <form className="row">
            <div className="col-6 mb-3">
              <label className="form-label fw-semibold">Track Number</label>
              <input
                type="text"
                className={`form-control ${errors.trackNumber && "is-invalid"}`}
                value={product.trackNumber}
                name="trackNumber"
                onChange={handleChange}
              />
              {errors.trackNumber && <div className="invalid-feedback">{errors.trackNumber}</div>}
            </div>

            <div className="col-6">
              <label className="form-label fw-semibold">Delivery Partner</label>
              <input
                type="text"
                className={`form-control ${errors.deliveryPartner && "is-invalid"}`}
                value={product.deliveryPartner}
                name="deliveryPartner"
                onChange={handleChange}
              />
              {errors.deliveryPartner && <div className="invalid-feedback">{errors.deliveryPartner}</div>}
            </div>

            <div className="col-6 mb-3">
              <label className="form-label fw-semibold">Track link</label>
              <input
                type="text"
                className={`form-control ${errors.trackLink && "is-invalid"}`}
                value={product.trackLink}
                name="trackLink"
                onChange={handleChange}
              />
              {errors.trackLink && <div className="invalid-feedback">{errors.trackLink}</div>}
            </div>
            <div className="col-12 d-flex justify-content-end gap-5">
              <button
                className="btn text-success border-0"
                type="button"
                onClick={() => setLgShow(false)}
              >
                Discard
              </button>
              <button className="btn btn-success col-3" onClick={handleSave}>Save</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TrackIdModal;
