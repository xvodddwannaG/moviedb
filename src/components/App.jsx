import React, {useState} from "react";
import Filters from "./Filters";
import MoviesList from "./MovieList";
import {API_KEY_3, API_URL, PASS} from "../api/api";
import {useData} from "../api/useData";
import Header from "./Header";

const initialFiltersState = {
    sort_by: 'popularity.desc',
    primary_release_year: '2020',
    with_genres: []
}

const App = () => {
    const [filters, setFilters] = useState(initialFiltersState)
    const [currentPage, setCurrentPage] = useState(1);
    const [sessionId, setSessionId] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const queryStringParams = {
        api_key: API_KEY_3,
        language: 'ru-RU',
        sort_by: filters.sort_by,
        page: currentPage,
        primary_release_year: filters.primary_release_year,
        with_genres: filters.with_genres.join(),
    }

    const {data, isLoading, isError} = useData(queryStringParams)

    const onChangeSelectorHandler = (name, value) => {
        setFilters({
            ...filters,
            [name]: value,
        });

        setCurrentPage(1)
    }

    const onChangeCurrentPage = newPageNumber => {
        setCurrentPage(newPageNumber)
    }

    const resetFiltersHandler = () => setFilters(initialFiltersState);

    const getSession = async () => {
        try {
            const {request_token} = await fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`).then((res) => res.json());
            const result = await fetch(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    username: 'xvoddd',
                    password: PASS,
                    request_token: request_token,
                })
            }).then((res) => res.json());
            const {session_id} = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY_3}`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    request_token: result.request_token
                })
            }).then((res) => res.json())
            await setSessionId(session_id);
            await setIsSuccess(true)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Header getSession={getSession}/>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="card" style={{width: "100%"}}>
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
                    <div className="col-8">
                        <MoviesList moviesData={data} isLoading={isLoading}/>
                    </div>
                </div>
            </div>
        </>
    );
};


export default App;