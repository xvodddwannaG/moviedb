import React from "react";

const Pagination = ({ currentPage, onChangeCurrentPage, totalPage }) => {
  return (
    <>
      <div className="btn-group btn-pagination">
        <button
          type="button"
          className="btn btn-primary mr-2"
          disabled={currentPage === 1}
          onClick={onChangeCurrentPage.bind(null, currentPage - 1)}
        >
          Назад
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={currentPage === totalPage}
          onClick={onChangeCurrentPage.bind(null, currentPage + 1)}
        >
          Вперед
        </button>
      </div>
      <div className="page-pagination">
        {currentPage} of {totalPage}
      </div>
    </>
  );
};

export default Pagination;
