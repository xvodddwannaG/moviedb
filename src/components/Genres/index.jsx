import React, {useEffect, useState} from 'react';
import {API_KEY_3, API_URL} from "../../api/api";

const Genres = ({onChangeSelectorHandler, name, resetFiltersHandler, filters:{with_genres}}) => {
    const [genresList, setGenresList] = useState([])

    useEffect(() => {
        const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`
        fetch(link)
            .then((res) => res.json())
            .then((data) => {setGenresList(data.genres)})
    }, [])


    const onChangeHandler = (e) => {
        const newWithGenres = e.target.checked
            ? [...with_genres, e.target.value]
            : with_genres.filter(genre => genre !== e.target.value)

        onChangeSelectorHandler(e.target.name, newWithGenres)
    }


    return (
        <>
            <div>
                <button
                    type="button"
                    className="btn btn-outline-dark mb-2"
                    onClick={resetFiltersHandler}
                >
                    Сбросить все фильтры
                </button>
            </div>
            {genresList.map(genre => (
                <div key={genre.id} className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={genre.id}
                        name={name}
                        id={`genre${genre.id}`}
                        onChange={onChangeHandler}
                        checked={with_genres.includes(String(genre.id))}
                    />
                    <label className="form-check-label" htmlFor={`genre${genre.id}`}>
                        {genre.name}
                    </label>
                </div>
            ))}
        </>
    );
};

export default Genres;