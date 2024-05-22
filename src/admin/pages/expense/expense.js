import React, { useEffect, useMemo, useState, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import ExpenseModal from "./expenseForm";
import axios from "axios";
import { api, adminConfig } from "../.../../../../api/api";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenses } from "../../../services/admin/adminSlice";
import { useReactToPrint } from "react-to-print";
import Paginations from "../../components/Pagination";

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
  const [itemsPerPage] = useState(20);
  const [pageLength, setPageLength] = useState();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  // const[ getAllExpense,setGetAllExpense] = useState(useSelector((state) => state?.admin?.expense?.expenses));
  const getAllExpense = useSelector((state) => state?.admin?.expense?.expenses);
  const expense = useSelector((state) => state?.admin?.expense);
  const componentPdf = useRef();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
    dispatch(getAllExpenses({ itemsPerPage, currentPage, search,startDate,endDate }));
  }, [search, currentPage, lgShow,startDate,endDate]);

  useEffect(() => {
    if (expense) {
      setPageLength(expense?.totalPages);
      setTotal(expense?.totalAmount);
      setUnpaid(expense?.totalUnpaid);
      setPaid(expense?.totalPaid);
    }
  }, [expense]);

 

  const handleEdit = (id) => {
    setId(id);
    setLgShow(true);
  };

  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.slice(0, maxLength) + ".....";
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: "Expense",
  });

  console.log(startDate);
  console.log(endDate);

  return (
    <div className="m-3 p-3">
      <div className="p-3 bg-white">
        <div className="d-flex justify-content-between flex-wrap">
          <div className="mb-2">
            <h5>Expense</h5>
          </div>

          <div className="mb-2">
            <div className="border rounded-2 p-1 px-2">Date: {currentDate}</div>
          </div>

          <div className="mb-2">
            <div className="border rounded-2 p-1 px-2">
              From:{" "}
              <input
                type="date"
                name="startDate"
                onChange={(e) => setStartDate(e.target.value)}
                className="border-0"
              />
            </div>
          </div>

          <div className="mb-2">
            <div className="border rounded-2 p-1 px-2">
              To:{" "}
              <input
                type="date"
                name="endDate"
                onChange={(e) => setEndDate(e.target.value)}
                className="border-0"
              />
            </div>
          </div>

          <div className="mb-2">
            <div className="border rounded-2 p-1 px-1 d-flex gap-2 align-items-center">
              <CiSearch />
              <input
                placeholder="Search..."
                type="search"
                className="border-0"
                onChange={(e) => setSearch(e.target.value)}
                style={{ outline: "none" }}
              />
            </div>
          </div>

          <div className="mb-2">
            <div
              className="border p-1 px-3 bg-success text-white rounded-1"
              onClick={() => setLgShow(true)}
              style={{ cursor: "pointer" }}
            >
              <FaPlus /> Expense
            </div>
          </div>
        </div>
        <ExpenseModal lgShow={lgShow} setLgShow={setLgShow} id={id} />

        {/* Table */}
        <div ref={componentPdf} className="p-3">
          <div className="table-responsive">
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
                  <tr
                    className="border-top"
                    key={exp._id}
                    onClick={() => handleEdit(exp._id)}
                  >
                    <th scope="row">{exp.slno}</th>
                    <td>{new Date(exp.date).toLocaleDateString()}</td>
                    <td>{exp.category}</td>
                    <td>{exp.subCategory}</td>
                    <td className="text-nowrap" style={{ maxWidth: "10px" }}>
                      {truncateString(exp.description, 10)}
                    </td>
                    <td>{exp.amount}</td>
                    {exp.status === "unpaid" && (
                      <td className="text-danger text-center text-capitalize fw-medium">
                        {exp.status}
                      </td>
                    )}
                    {exp.status === "paid" && (
                      <td className="text-success text-center text-capitalize fw-medium">
                        {exp.status}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Paginations setCurrentPage={setCurrentPage} pageLength={pageLength} currentPage={currentPage} />

      <div className="row bg-white my-3 text-center p-3">
        <div className="col-md-4 mb-2 mb-md-0">
          <h3>
            Paid Amount:{" "}
            <span className="text-warning">₹{paid?.toLocaleString()}</span>
          </h3>
        </div>

        <div className="col-md-4 mb-2 mb-md-0">
          <h3>
            Unpaid Amount:{" "}
            <span className="text-danger">₹{unpaid?.toLocaleString()}</span>
          </h3>
        </div>

        <div className="col-md-4">
          <h3>
            Total Amount:{" "}
            <span className="text-success">₹{total?.toLocaleString()}</span>
          </h3>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-4 mt-5">
        <button
          className="btn border border-success col-12 col-md-2"
          onClick={handlePrint}
        >
          Print
        </button>
        <button className="btn btn-success col-12 col-md-2">Save</button>
      </div>
    </div>
  );
}

// <div className="m-3 p-3 ">
//   <div
//     className="p-3 bg-white border"
//     // style={{height:"550px"}}
//   >
//     <div className="d-flex justify-content-between">
//       <div className="">
//         <h5>Expense</h5>
//       </div>

//       <div className="border rounded-2 p-1 px-2">Date: {currentDate}</div>

//       <div className="border rounded-2 p-1 px-2">
//         From: <input type="date" className="border-0" />
//       </div>

//       <div className="border border rounded-2 p-1 px-2">
//         To: <input type="date" className="border-0" />
//       </div>

//       <div className="border border d-flex justify-content-center align-items-center gap-2 rounded-2 p-1 px-1">
//         <CiSearch />
//         <input
//           placeholder="....search"
//           type="search"
//           className="border-0"
//           onChange={(e) => setSearch(e.target.value)}
//           style={{ outline: "none" }}
//         />
//       </div>

//       <div
//         className="border p-1 px-3 bg-success text-white rounded-1"
//         onClick={() => setLgShow(true)}
//         style={{ cursor: "pointer" }}
//       >
//         <FaPlus /> Expense
//       </div>
//     </div>
//     <ExpenseModal lgShow={lgShow} setLgShow={setLgShow} id={id} />

//     {/* Table */}
//     <div
//       ref={componentPdf}
//       style={{ height: "100%", width: "100%" }}
//       className="p-3"
//     >
//       <table className="table mt-3">
//         <thead>
//           <tr>
//             {heading.map((head, i) => (
//               <th scope="col" key={i}>
//                 {head}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {getAllExpense?.map((exp, index) => (
//             <tr
//               className="border-top"
//               key={exp._id}
//               onClick={() => handleEdit(exp._id)}
//             >
//               <th scope="row">{exp.slno}</th>
//               <td>{new Date(exp.date).toLocaleDateString()}</td>
//               <td>{exp.category}</td>
//               <td>{exp.subCategory}</td>
//               <td
//                 className="text-nowrap"
//                 style={{ overflow: "hidden", maxWidth: "10px" }}
//               >
//                 {truncateString(exp.description, 18)}
//               </td>
//               <td className="">{exp.amount}</td>
//               {exp.status === "unpaid" && (
//                 <td className="text-danger text-capitalize fw-medium">
//                   {exp.status}
//                 </td>
//               )}
//               {exp.status === "paid" && (
//                 <td className="text-success text-capitalize fw-medium">
//                   {exp.status}
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>

//   <Pagination setCurrentPage={setCurrentPage} pageLength={pageLength} />

//   <div className="row bg-white my-3 text-center p-3">
//     <div className="col-4">
//       <h3>
//         Paid Amount:{" "}
//         <span className="text-warning">₹{paid?.toLocaleString()}</span>
//       </h3>
//     </div>

//     <div className="col-4">
//       <h3>
//         Unpaid Amount:{" "}
//         <span className="text-danger">₹{unpaid?.toLocaleString()}</span>
//       </h3>
//     </div>

//     <div className="col-4">
//       <h3>
//         Total Amount:{" "}
//         <span className="text-success">₹{total?.toLocaleString()}</span>
//       </h3>
//     </div>
//   </div>

//   <div className="d-flex justify-content-end gap-4 mt-5">
//     <button
//       className="btn border border-success col-2"
//       onClick={handlePrint}
//     >
//       Print
//     </button>
//     <button className="btn btn-success col-2">Save</button>
//   </div>
// </div>
