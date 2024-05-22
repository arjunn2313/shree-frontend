import axios from "axios";
import React, { useEffect, useState } from "react";
import { adminConfig, api } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function ExpenseTable() {
  const navigate = useNavigate();
  const heading = [
    "Sl.no.",
    "Date",
    "Category",
    "Sub Category",
    "Amount",
    "Status",
  ];
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    axios
      .get(`${api}/expense/getAllExpenses/?limit=5`, adminConfig)
      .then((res) => {
        setExpense(res.data.expenses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(expense);
  return (
    <div className="expense-containor border border-success">
      <div className="d-flex justify-content-between p-3">
        <h6 className="textColor fw-medium fs-5">Expense</h6>
        <button
          className="btn border border-success textColor fw-medium"
          onClick={() => navigate("expense")}
        >
          View All
        </button>
      </div>

      <div className="table-responsive p-2">
        <table className="table">
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
            {expense?.map((expense, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.category}</td>
                <td>{expense.subCategory}</td>
                <td>{expense.amount}</td>
                <td
                  className={
                    expense.status === "paid"
                      ? "text-success fw-medium"
                      : "text-danger fw-medium"
                  }
                >
                  {expense.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
