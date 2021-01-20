import React from 'react';

const Pagination = ({currentPage, onChangeCurrentPage, totalPage}) => {
    return (
        <div className="btn-group">
            <button
                type="button"
                className="btn btn-primary"
                disabled={currentPage === 1}
                onClick={onChangeCurrentPage.bind(null, currentPage - 1)}
            >Назад</button>
            <button
                type="button"
                className="btn btn-primary"
                onClick={onChangeCurrentPage.bind(null, currentPage + 1)}
            >Вперед</button>
            <div>{currentPage} of {totalPage}</div>
        </div>
    );
};

export default Pagination;