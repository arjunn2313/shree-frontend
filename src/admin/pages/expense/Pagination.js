import React from "react";

export default function Pagination({ pageLength, setCurrentPage }) {
    const pageNumbers = [];

    for(let i =1; i <= pageLength; i++ ){
        pageNumbers.push(i);
    }
 ;
  return (
    <div className="d-flex justify-content-center align-items-center py-2">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          {pageNumbers?.map((page,index) => (
            <li class="page-item" key={index} >
              <a class="page-link" href="#" onClick={()=>setCurrentPage(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
