import React from 'react'

export default function ExpenseTable() {
  return (
    <div className='expense-containor border border-success'>
            <div className="d-flex justify-content-between p-4">
          <h6>Expense</h6>
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
  )
}
