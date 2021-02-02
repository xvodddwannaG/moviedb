import React, { useState } from "react";
import { API_KEY_3 } from "../../api/api";
import Filters from "../../components/Filters";
import MovieList from "../../components/MovieList";
import { useData } from "../../api/useData";

const initialFiltersState = {
  sort_by: "popularity.desc",
  primary_release_year: "2020",
  with_genres: [],
};

const MoviesPage = () => {
  const [filters, setFilters] = useState(initialFiltersState);
  const [currentPage, setCurrentPage] = useState(1);

  const queryStringParams = {
    api_key: API_KEY_3,
    language: "ru-RU",
    sort_by: filters.sort_by,
    page: currentPage,
    primary_release_year: filters.primary_release_year,
    with_genres: filters.with_genres.join(),
  };

  const { data, isLoading } = useData(queryStringParams);

  const onChangeSelectorHandler = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });

    setCurrentPage(1);
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrentPage(newPageNumber);
  };

  const resetFiltersHandler = () => setFilters(initialFiltersState);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-3">
          <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
              <h3>Фильтры:</h3>
              <Filters
                onChangeSelectorHandler={onChangeSelectorHandler}
                filters={filters}
                currentPage={currentPage}
                onChangeCurrentPage={onChangeCurrentPage}
                totalPages={data.total_pages}
                resetFiltersHandler={resetFiltersHandler}
              />
            </div>
          </div>
        </div>
        <div className="col-9">
          <MovieList moviesData={data} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
