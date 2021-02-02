import React from "react";
import { Link } from "react-router-dom";
import FavoriteButtons from "../FavoriteButtons";

const MoviesItem = ({ item }) => {
  const imagePath = item.poster_path || item.backdrop_path;
  return (
    <div className="card">
      <div className="card-body card-movie">
        <div className="card-movie__img">
          <Link to={`/movie/${item.id}/details`}>
            <img
              className="card-img-top card-img--height"
              src={
                imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : ""
              }
              alt=""
            />
          </Link>
        </div>
        <div className="card-movie__description">
          <div className="card-movie__icons">
            <div className="card-average">Рейтинг: {item.vote_average}</div>
            <div className="card-button">
              <FavoriteButtons id={item.id} />
            </div>
          </div>
          <Link
            className="card-title card-movie__name"
            to={`/movie/${item.id}/details`}
          >
            {item.title}
          </Link>
          <div className="card-movie__details">
            <Link to={`/movie/${item.id}/details`}>Подробнее</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesItem;
