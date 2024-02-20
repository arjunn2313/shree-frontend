import React from "react";

export default function OrderAddress({ address, setAddress }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <label className="form-label">
          Address<span className="text-danger fw-bold">*</span>
        </label>
        <textarea
          className="form-control text-area-like mb-3"
          placeholder="Address"
          rows="3"
          name="address"
          value={address.address}
          onChange={handleChange}
        ></textarea>
      </div>

      <div>
        <label className="form-label">
          Pincode<span className="text-danger fw-bold">*</span>
        </label>
        <input
          value={address.pincode}
          type="text"
          className="form-control mb-3"
          placeholder="dummy content"
          name="pincode"
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="form-label">
          City/District/Town<span className="text-danger fw-bold">*</span>
        </label>
        <input
          value={address.city}
          type="text"
          className="form-control mb-3"
          placeholder="dummy content"
          name="city"
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="form-label">
          State<span className="text-danger fw-bold">*</span>
        </label>
        <select
          value={address.state}
          className="form-select mb-3"
          aria-label="Default select example"
          name="state"
          onChange={handleChange}
        >
          <option selected>---select state</option>
          <option value="Tamilnadu">Tamilnadu</option>
          <option value="kerala">kerala</option>
          <option value="karanataka">karanataka</option>
        </select>
      </div>

      <div>
        <label className="form-label">Landmark (optional)</label>
        <input
          value={address.landmark}
          type="text"
          className="form-control mb-3"
          placeholder="dummy content"
          name="landmark"
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="form-label">
          Country<span className="text-danger fw-bold">*</span>
        </label>
        <select
          value={address.country}
          className="form-select mb-3"
          aria-label="Default select example"
          name="country"
          onChange={handleChange}
        >
          <option selected>Open this select menu</option>
          <option value="India">India</option>
          <option value="China">China</option>
          <option value="Canada">Canada</option>
        </select>
      </div>
    </>
  );
}
