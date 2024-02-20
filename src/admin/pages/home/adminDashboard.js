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

export default function AdminDashboard() {
  const [catCount, setCatCount] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:6060/product/categories/sum").then((res) =>{
      setCatCount(res.data);
    }).catch((error)=>{
      console.log(catCount);
    });
  },[]);
  const data = [
    {
      name: "Mon",
      uv: 300,

      amt: 2400,
    },
    {
      name: "Tue",
      uv: 2000,

      amt: 2210,
    },
    {
      name: "Wed",
      uv: 2000,

      amt: 2290,
    },
    {
      name: "Thurs",
      uv: 2780,

      amt: 2000,
    },
    {
      name: "Fri",
      uv: 1890,

      amt: 2181,
    },
    {
      name: "Sat",
      uv: 2390,

      amt: 2500,
    },
    {
      name: "Sun",
      uv: 3490,

      amt: 2100,
    },
  ];

  const revenue = [
    {
      id: 1,
      cat: "Mens",
      price: "Rs.30,000",
      color: "#005226",
    },
    {
      id: 2,
      cat: "Womens",
      price: "Rs.30,000",
      color: "#003927",
    },
    {
      id: 3,
      cat: "Kids",
      price: "Rs.30,000",
      color: "#80FFD6",
    },
    {
      id: 4,
      cat: "Accessories",
      price: "Rs.30,000",
      color: "#BFFFEA",
    },
  ];

  const productCount = [
    "assets/Mask group.png",
    
    "assets/Mask group (1).png",

    "assets/Mask group (2).png",
 
  
    // "assets/Group 2557.png",
    
  ];
  return (
    <div className="pb-5">
      <div className="dash-home pt-4">
        {catCount.map((count,i) => (
          <div className="border bg-white border-success product-details" key={i}>
            <img src={productCount[i]} alt="shirt" />
            <span className="d-flex flex-column gap-1">
              <span className="count">{count.totalProducts}</span>
              <span className="cat">{count._id}</span>
            </span>
          </div>
        ))}

        {/* <div className="border bg-white border-success product-details">
          <img src="assets\Mask group (1).png" alt="shirt" />
          <span className="d-flex flex-column gap-1">
            <span className="count">500</span>
            <span className="cat">Womens</span>
          </span>
        </div> */}
        {/* <div className="border  bg-white border-success product-details">
          <img src="assets\Mask group (2).png" alt="shirt" />
          <span className="d-flex flex-column gap-1">
            <span className="count">500</span>
            <span className="cat">Kids</span>
          </span>
        </div> */}
        {/* <div className="border bg-white border-success product-details">
          <img src="assets\Group 2557.png" alt="shirt" />
          <span className="d-flex flex-column gap-1">
            <span className="count">500</span>
            <span className="cat">Accessories</span>
          </span>
        </div> */}
      </div>

      <div className="d-flex align-items-center justify-content-around ">
        <div
          className="border border-success rounded-4 mt-3 d-flex flex-column  gap-4  p-2"
          style={{ width: "45%" }}
        >
          <div className="d-flex justify-content-around align-items-center">
            <span className="count text-success">Sales's Graph</span>

            <select>
              <option>Today</option>
              <option>week</option>
            </select>
          </div>
          <div className=" ">
            <LineChart
              width={550}
              height={250}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </div>
        </div>

        <div
          className="border border-success rounded-4 mt-3 d-flex flex-column  gap-4  p-2"
          style={{ width: "45%" }}
        >
          <div className="d-flex justify-content-around align-items-center">
            <span className="count text-success">Revenue Graph</span>

            <select>
              <option>Today</option>
              <option>week</option>
            </select>
          </div>
          <div className="d-flex ">
            <PieChartss />
            <div className="d-flex align-items-center gap-2 flex-column ">
              {revenue.map((itm) => (
                <div className="d-flex align-items-center gap-4" key={itm.id}>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      background: itm.color,
                    }}
                    className="rounded-2"
                  ></div>
                  <span className="d-flex flex-column">
                    <span>{itm.cat}</span>
                    <span>{itm.price}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <OrderAndStock />
      <ExpenseTable />
    </div>
  );
}
