import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { api } from "../../../api/api";

function TrackIdMoadal({ lgShow, setLgShow, id }) {
  const [product, setProduct] = useState({});

  const handleChange = (e) =>{
   setProduct({...product,[e.target.name] : e.target.value})
  }
 console.log(product);
  return (
    <>
      <Modal
        centered
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        {/* <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Enter track Id
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div className="row py-3 fw-bold">
            <div className="col-6">Invoice Number: 62786457345</div>
            <div className="col-6">Customer Name: {id}</div>
          </div>

          <form className="row">
            <div className="col-6 mb-3">
              <label className="form-label fw-semibold">Track Number</label>
              <input type="text" className="form-control" value={product.trackNumber} name="trackNumber" onChange={handleChange} />
            </div>

            <div className="col-6">
              <label className="form-label fw-semibold">Delivery Partner</label>
              <input type="text" className="form-control" value={product.deliveryPartner} name="deliveryPartner" onChange={handleChange} />
            </div>

            <div className="col-6 mb-3">
              <label className="form-label fw-semibold">Track link</label>
              <input type="text" className="form-control" value={product.trackLink} name="trackLink" onChange={handleChange}/>
            </div>
            <div className="col-12 d-flex justify-content-end gap-5">
              <button
                className="btn text-success border-0"
                type="button"
                onClick={() => setLgShow(false)}
              >
                Discard
              </button>
              <button className="btn btn-success col-3">Save</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TrackIdMoadal;
