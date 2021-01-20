import React, {useState} from "react";
import Filters from "./Filters";
import MoviesList from "./MovieList";

const App = () => {
  const [filters, setFilters] = useState({
    sort_by: 'popularity.desc',
    primary_release_year: '2020',
  })
  const [currentPage, setCurrentPage] = useState(1);

  const onChangeSelectorHandler = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });

    setCurrentPage(1)
  }

  const onChangeCurrentPage = newPageNumber => {
    console.log(newPageNumber)
    setCurrentPage(newPageNumber)
  }

  return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters onChangeSelectorHandler={onChangeSelectorHandler} filters={filters} currentPage={currentPage} onChangeCurrentPage={onChangeCurrentPage}/>
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList filters={filters} currentPage={currentPage} />
          </div>
        </div>
      </div>
  );
};

export default App;