import React, {useEffect, useState} from 'react';
import CallApi from "../../api/api_v2";

const Genres = ({onChangeSelectorHandler, name, filters: {with_genres}}) => {
    const [genresList, setGenresList] = useState([])

    useEffect(() => {
        CallApi.get('/genre/movie/list', {params: {language: 'ru-RU'}})
            .then((res) => setGenresList(res.genres));
    }, [])


    const onChangeHandler = (e) => {
        const newWithGenres = e.target.checked
            ? [...with_genres, e.target.value]
            : with_genres.filter(genre => genre !== e.target.value)

        onChangeSelectorHandler(e.target.name, newWithGenres)
    }


    return (
        <>
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