import AdminNav from "../../components/adminNav";
import "./admin.css";
import SideBar from "../../components/sideBar";
import AdminHome from "./adminHome";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
} from "recharts";
import PieChartss from "../../components/PieChart";
import OrderAndStock from "../../components/order&stock";
import ExpenseTable from "../../components/expenseTable";
import { useEffect, useState } from "react";
import axios from "axios";
import Linechart from "../../components/LineChart";
import { api } from "../../../api/api";

export default function AdminDashboard() {
  const [catCount, setCatCount] = useState([]);
  useEffect(() => {
    axios
      .get(`${api}/product/categories/sum`)
      .then((res) => {
        setCatCount(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(catCount);
  return (
    <div className="container">
      <div className="dash-home py-4">
        {catCount.map((cat, i) => (
          <div className="border bg-white border-success product-details">
            {cat._id == "men" && (
              <img src="assets\Mask group.png" alt="shirt" />
            )}
            {cat._id == "women" && (
              <img src="assets\Mask group (1).png" alt="wom" />
            )}
            {cat._id == "kids" && (
              <img src="assets\Mask group (2).png" alt="kid" />
            )}
            {cat._id == "Others" && (
              <img src="assets\Group 2557.png" alt="acc" />
            )}
            <span className="d-flex flex-column gap-1">
              <span className="count">{cat.totalProducts}</span>

              <span className="cat">{cat._id}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="row   ">
        <div className="col-lg-6">
          <Linechart />
        </div>

        <div className="col-lg-6">
          <PieChartss />
        </div>
      </div>
      <div className=" ">
        <OrderAndStock />
      </div>
      <div className=" ">
        <ExpenseTable />
      </div>
    </div>
  );
}
