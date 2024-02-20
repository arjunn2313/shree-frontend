import React, { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import ExpenseModal from "./expenseForm";
import axios from "axios";
import { api, adminConfig } from "../.../../../../api/api";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenses } from "../../../services/admin/adminSlice";

export default function AdminExpense() {
  const [lgShow, setLgShow] = useState(false);
  const heading = [
    "Sl.no.",
    "Date",
    "Category",
    "Sub Category",
    "Description",
    "Amount",
    "Status",
  ];
  // const [getAllExpense, setGetAllExpense] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [total, setTotal] = useState();
  const [unpaid, setUnpaid] = useState();
  const [paid, setPaid] = useState();
  const [id, setId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [pageLength, setPageLength] = useState();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const getAllExpense = useSelector((state) => state?.admin?.expense?.expenses);
  const expense = useSelector((state) => state?.admin?.expense);

  useEffect(() => {
    const getFormattedDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${day}/${month}/${year}`;
    };
    setCurrentDate(getFormattedDate());
  }, []);

  useEffect(() => {
    dispatch(getAllExpenses({ itemsPerPage, currentPage, search }));
  }, [search, currentPage,lgShow]);

  useEffect(() => {
    if (expense) {
      setPageLength(expense?.totalPages);
      setTotal(expense?.totalAmount);
      setUnpaid(expense?.totalUnpaid);
      setPaid(expense?.totalPaid);
    }
  }, [expense]);


  console.log(expense);

  const handleEdit = (id) => {
    setId(id);
    setLgShow(true);
  };

  const calculateSerialNumber = (index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };

  return (
    <div className="m-3 p-3">
      <div className="p-3 bg-white">
        <div className="d-flex justify-content-between">
          <div className="">
            <h5>Expense</h5>
          </div>

          <div className="border rounded-2 p-1 px-2">Date: {currentDate}</div>

          <div className="border rounded-2 p-1 px-2">
            From: <input type="date" className="border-0" />
          </div>

          <div className="border border rounded-2 p-1 px-2">
            To: <input type="date" className="border-0" />
          </div>

          <div className="border border d-flex justify-content-center align-items-center gap-2 rounded-2 p-1 px-1">
            <CiSearch />
            <input
              placeholder="....search"
              type="search"
              className="border-0"
              onChange={(e) => setSearch(e.target.value)}
              style={{ outline: "none" }}
            />
          </div>

          <div
            className="border p-1 px-3 bg-success text-white rounded-1"
            onClick={() => setLgShow(true)}
            style={{ cursor: "pointer" }}
          >
            <FaPlus /> Expense
          </div>
        </div>
        <ExpenseModal lgShow={lgShow} setLgShow={setLgShow} id={id} />

        {/* Table */}

        <table className="table mt-3">
          <thead>
            <tr>
              {heading.map((head, i) => (
                <th scope="col" key={i}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getAllExpense?.map((exp, index) => (
              <tr onClick={() => handleEdit(exp._id)}>
                <th scope="row">{calculateSerialNumber(index)}</th>
                <td>{new Date(exp.date).toLocaleDateString()}</td>
                <td>{exp.category}</td>
                <td>{exp.subCategory}</td>
                <td
                  className="text-nowrap"
                  style={{ overflow: "hidden", maxWidth: "10px" }}
                >
                  {exp.description}
                </td>
                <td className="">{exp.amount}</td>
                {exp.status === "unpaid" && (
                  <td className="text-danger text-capitalize fw-medium">
                    {exp.status}
                  </td>
                )}
                {exp.status === "paid" && (
                  <td className="text-success text-capitalize fw-medium">
                    {exp.status}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination setCurrentPage={setCurrentPage} pageLength={pageLength} />

      <div className="row bg-white my-3 text-center p-3">
        <div className="col-4">
          <h3>
            Paid Amount:{" "}
            <span className="text-warning">₹{paid?.toLocaleString()}</span>
          </h3>
        </div>

        <div className="col-4">
          <h3>
            Unpaid Amount:{" "}
            <span className="text-danger">₹{unpaid?.toLocaleString()}</span>
          </h3>
        </div>

        <div className="col-4">
          <h3>
            Total Amount:{" "}
            <span className="text-success">₹{total?.toLocaleString()}</span>
          </h3>
        </div>
      </div>
    </div>
  );
}
