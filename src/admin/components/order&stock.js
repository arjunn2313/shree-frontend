import React from "react";

export default function OrderAndStock() {
  return (
    <div className="order-stock ">
      <div className="orderss bg-white border border-success rounded-3 ">
        <div className="d-flex justify-content-between p-4">
          <h6>Orders</h6>
          <button className="bg-white px-2 text-success border-success">View All</button>
        </div>

        <table class="table ">
          <thead>
            <tr>
              <th scope="col">Sl. no.</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Products</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>@mdo</td>
              <td>@twitter</td>
              <td>@mdo</td>
             
            </tr>
          </tbody>
        </table>

      </div>

      <div className="stockss border border-success">
        <h6 className="p-4">Low Stock</h6>

        <table class="table ">
          <thead>
            <tr>
              <th scope="col">Sl. no.</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
           
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
             
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
