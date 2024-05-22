import axios from "axios";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { adminConfig, api } from "../../api/api";
import Form from 'react-bootstrap/Form';

export default function PieChartss() {
  // const data = [
  //   { name: "Mon", uv: 0, amt: 2400 },
  //   { name: "Tue", uv: 0,   amt: 200 },
  //   { name: "Wed", uv: 10,   amt: 2500 },
  //   { name: "Thu", uv: 100,  amt: 2500 },
  //   { name: "Fri", uv: 200,  amt: 2500 },
  //   { name: "Sat", uv: 80,   amt: 2500 },
  //   { name: "Sun", uv: 300,   amt: 2500 },
  // ];
  const [range,setRange] = useState("")

  const [data, setData] = useState([]);

  useEffect(() => {
    axios(`${api}/order/get-revenue-by-category/?range=${range}`,adminConfig)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[range]);

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
      // color:"#86B3AA"
    },
  ];

  console.log(data);
  const COLORS = ["#005226", "#003927", "#80FFD6", "#BFFFEA"];

  return (
    <div
      className="bg-white p-3 rounded-4 border border-success"
      style={{ height: "350px"}}
    >
      <div className="d-flex justify-content-between  align-items-center">
        <span className="count  TColor fw-medium ">Revenue</span>
        <span>
        <Form.Select aria-label="Default select example" className="border border-success textColor fw-medium" style={{boxShadow:"none"}}
        onChange={(e)=>setRange(e.target.value)}
        >
          <option>All</option>
          <option value="today">Today</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </Form.Select>
        </span>
       
      </div>
      <div className=" d-flex  align-items-center justify-content-between">
        <div style={{width:'50%'}} >
        {data?.length > 0 ?  <PieChart width={400} height={305}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data &&
                data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
            </Pie>
          </PieChart> : <h6 className="text-danger text-center">Nothing to show</h6>}
        </div>

        <div style={{width:'50%'}}   >
          {data.map((itm, index) => (
            <div className="d-flex align-items-center justify-content-center gap-4 " gap-1 key={itm.id}>
              <div
                style={{
                  backgroundColor: COLORS[index],
                }}
                className="rounded-2 pie-color"
              ></div>
              <span className="d-flex flex-column">
                <span
                  className="fw-medium text-capitalize"
                  style={{ color: COLORS[index] }}
                >
                  {itm.name}
                </span>
                <span className="text-secondary fw-medium">
                  RS {itm.value.toLocaleString()}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
