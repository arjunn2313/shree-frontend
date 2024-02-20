import React from "react";
import { IoFilterOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";

export default function AdminStock() {
  const heading = [
    "Sl. no.",
    "Product code",
    "Category",
    "Sub Category",
    "Product",
    "Updated On",
    "Available Qty.",
  ];
  return (
    <div className="mx-auto bg-white mt-2" style={{ width: "98%" }}>
      {/* header */}
      <div className=" d-flex  w-100 justify-content-between bg-white p-3">
        <div className="d-flex w-50 gap-4">
          <h5>Stocks</h5>
          <span className="d-flex align-items-center gap-3 border px-2 rounded-3">
            <IoFilterOutline />
            <span>Filters</span>
          </span>

          <div className="border px-3 d-flex gap-1 align-items-center rounded-3">
            Product
            <select className="border-0">
              <option>All</option>
              <option>2</option>
            </select>
          </div>
        </div>

        <div className="d-flex w-50  gap-3  align-items-end justify-content-end">
          <div className="border rounded-1 px-1 d-flex  justify-content-center gap-2">
            <span className="d-flex align-items-center">
              <CiSearch className="fs-5" />
            </span>
            <input
              type="text"
              className="border-0 p-1"
              placeholder="search..."
              style={{ outline: "none" }}
            />
          </div>
          <button className="btn btn-success d-flex justify-content-center align-items-center gap-2">
            <FaPlus />
            New Product
          </button>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            {heading.map((heading) => (
              <th>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}
