import React, {useState, useEffect} from 'react';
import { API_URL, API_KEY_3 } from "../../api/api";
import MovieItem from "../MoviesItem";
import * as queryString from "querystring";


const MovieList = ({filters, currentPage}) => {
    const [movies, setMovies] = useState([]);
    const queryStringParams = {
        api_key: API_KEY_3,
        language: 'ru-RU',
        sort_by: filters.sort_by,
        page: currentPage,
        primary_release_year: filters.primary_release_year
    }
    const link = `${API_URL}/discover/movie?${queryString.stringify(queryStringParams)}`;

    useEffect(() => {
        fetch(link)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setMovies(data.results)
            });
    }, [filters.sort_by, currentPage, filters.primary_release_year])

    return (
        <div className="row">
            {movies.map(movie => {
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


