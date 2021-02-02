import React from "react";
import MovieItem from "../MoviesItem";

const MovieList = ({ moviesData, isLoading }) => {
  return (
    <div className="row">
      {!isLoading &&
        moviesData &&
        moviesData.results.map((movie) => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
    </div>
  );
};

export default MovieList;
