// src/components/Pagination.js
import React, { useState } from "react";

const ITEMS_PER_PAGE = 10;

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const renderItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = data.slice(startIndex, endIndex);

    return currentItems.map((item) => (
      <div key={item.id} className="item">
        {item.name}
      </div>
    ));
  };

  return (
    <div className="pagination">
      <div className="items">{renderItems()}</div>
      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, index) => (
          <span
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Pagination;
