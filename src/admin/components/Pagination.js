import React from "react";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

export default function Paginations({
  pageLength,
  currentPage,
  setCurrentPage,
}) {
  const totalPagesToShow = 5;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const midPoint = Math.ceil(totalPagesToShow / 2);

    if (currentPage <= midPoint) {
      // Display the first totalPagesToShow pages
      for (let i = 1; i <= totalPagesToShow && i <= pageLength; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage > pageLength - midPoint) {
      // Display the last totalPagesToShow pages
      for (let i = pageLength - totalPagesToShow + 1; i <= pageLength; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Display pages around the current page
      const startPage = currentPage - midPoint + 1;
      const endPage = currentPage + midPoint - 1;

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="d-flex justify-content-center align-items-center py-2">
      <div className="d-flex gap-2">
        <button
          onClick={() => {
            if (currentPage !== 1) setCurrentPage(currentPage - 1);
          }}
          className="btn border-0"
          style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
        >
          <MdArrowBackIos size={25} />
        </button>
        {pageNumbers.map((page, index) => (
          <button
            className={`rounded-circle px-3 border-0 btn ${
              page === currentPage && "bg-success text-white"
            }`}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="btn border-0"
          onClick={() => {
            if (currentPage !== pageLength) setCurrentPage(currentPage + 1);
          }}
        >
          <MdArrowForwardIos size={25} />
        </button>
      </div>
    </div>
  );
}
