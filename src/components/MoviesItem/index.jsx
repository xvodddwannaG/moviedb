import React from 'react';

const MoviesItem = ({item}) => {
    const imagePath = item.backdrop_path || item.poster_path
    return (
        <div className="card" style={{ width: "100%" }}>
            <img
                className="card-img-top card-img--height"
                src={imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : ''}
                alt=""
            />
            <div className="card-body">
                <h6 className="card-title">{item.title}</h6>
                <div className="card-text">Рейтинг: {item.vote_average}</div>
            </div>
        </div>
    );
};

export default MoviesItem;