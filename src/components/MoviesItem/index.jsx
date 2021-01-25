import React from 'react';
import { Star, StarBorder, Bookmark, BookmarkBorder } from '@material-ui/icons';
import {Link} from "react-router-dom";

const MoviesItem = ({item}) => {
    const imagePath = item.poster_path || item.backdrop_path
    return (
        <div className="card">
            <div className="card-body card-movie">
                <div className="card-movie__img">
                    <a href='#'>
                        <img
                            className="card-img-top card-img--height"
                            src={imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : ''}
                            alt=""
                        />
                    </a>
                </div>
                <div className="card-movie__description">
                    <div className="card-movie__icons">
                        <div className="card-text">Рейтинг: {item.vote_average}</div>
                        <div>
                            <Star className='icons'/>
                            <Bookmark/>
                        </div>
                    </div>
                    <a className='card-title card-movie__name' href='#'>{item.title}</a>
                    <div className="card-movie__details">
                        <Link to={`/movie/${item.id}/details`}>Подробнее</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviesItem;


