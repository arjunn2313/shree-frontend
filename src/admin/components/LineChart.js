import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { adminConfig, api } from "../../api/api";

export default function Linechart() {
  const [data, setData] = useState([]);
  const [range, setRange] = useState("week");

  useEffect(() => {
    axios
      .get(
        `${api}/order/get-revenue-by-time-range/?range=${range}`,
        adminConfig
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [range]);
  console.log(data);
  return (
    <div
      className="bg-white p-3 rounded-4 border border-success"
      style={{ height: "350px" }}
    >
      <div className="d-flex justify-content-between gap-5 align-items-center">
        <span className="count text-success">Sales's Graph</span>
        <span>
          <Form.Select
            aria-label="Default select example"
            className="border border-success textColor fw-medium"
            style={{ boxShadow: "none" }}
            onChange={(e) => setRange(e.target.value)}
          >
            <option value="week">Week</option>
            <option value="lastWeek">Last Week</option>
            {/* <option value="thisMonth">Month</option> */}
          </Form.Select>
        </span>
      </div>
      <div className="d-flex align-items-center py-2 justify-content-center">
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="sales" stroke="rgba(0, 82, 38, 1)" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5 " />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
}
