import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="nav-pagination">
      <ul className="pagination justify-content-center mt-5 pagi-style">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item ">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
            <span class="sr-only">(current)</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
