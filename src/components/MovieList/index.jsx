import React from "react";
import MovieItem from "../MoviesItem";
import { ClipLoader } from "react-spinners";

const MovieList = ({ moviesData, isLoading }) => {
  if (isLoading) {
    return <ClipLoader />;
  } else {
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
  }
};

export default MovieList;
