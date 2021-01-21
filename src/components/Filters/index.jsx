import React from 'react';
import Select from "../Select";
import Pagination from "../Pagination";
import Genres from "../Genres/index.jsx";

const optionsSortBy = [
    {
        label: 'Популярные по убыванию',
        value: 'popularity.desc'
    },
    {
        label: 'Популярные по возростанию',
        value: 'popularity.asc'
    },
    {
        label: 'Рейтинг по убыванию',
        value: 'vote_average.desc'
    },
    {
        label: 'Рейтинг по возростанию',
        value: 'vote_average.asc'
    },
];
const optionsPrimaryReleaseYear = [
    {
        label: '2017',
        value: '2017',
    },
    {
        label: '2018',
        value: '2018',
    },
    {
        label: '2019',
        value: '2019',
    },
    {
        label: '2020',
        value: '2020',
    },
]

const Filters = ({onChangeSelectorHandler, filters, currentPage, onChangeCurrentPage, totalPages, resetFiltersHandler}) => {
    console.log('render')
    return (
        <form className="mb-3">
            <div className="form-group">
                <label htmlFor="sort_by">Сортировать по:</label>
                <Select name='sort_by' onChangeSelectorHandler={onChangeSelectorHandler} filter={filters.sort_by} options={optionsSortBy}/>
                <label htmlFor="primary_release_year">Год релиза:</label>
                <Select
                    name='primary_release_year'
                    onChangeSelectorHandler={onChangeSelectorHandler}
                    filter={filters.primary_release_year}
                    options={optionsPrimaryReleaseYear} />
                <Pagination currentPage={currentPage} onChangeCurrentPage={onChangeCurrentPage} totalPage={totalPages}/>
                <Genres name='with_genres' onChangeSelectorHandler={onChangeSelectorHandler} resetFiltersHandler={resetFiltersHandler} filters={filters}/>
            </div>
        </form>
    );
};

export default Filters;