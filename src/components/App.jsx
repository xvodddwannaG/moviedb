import React, {useState, useEffect} from "react";
import Filters from "./Filters";
import MoviesList from "./MovieList";
import Cookies from 'universal-cookie';
import {API_KEY_3, API_URL, PASS} from "../api/api";
import {useData} from "../api/useData";
import Header from "./Header";

const initialFiltersState = {
    sort_by: 'popularity.desc',
    primary_release_year: '2020',
    with_genres: []
}

const cookies = new Cookies();

const ONE_WEEK_COOKIES_TIME = 604800;

const App = () => {
    const [filters, setFilters] = useState(initialFiltersState)
    const [currentPage, setCurrentPage] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);
    const [userData, setUserData] = useState(null);
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        // вынести в отдельную функцию
        const session_id = cookies.get("session_id")
        if (session_id) {
            fetch(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`)
                .then((res) => res.json()).then((res) => setUserData(res));
        }
    }, [])

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

    const updateUserData = (user, session_id) => {
        setUserData(user)
        setSessionId(session_id)
        cookies.set("session_id", session_id, {path: '/', maxAge: ONE_WEEK_COOKIES_TIME})
    };

    return (
        <>
            <Header userData={userData} updateUserData={updateUserData}/>
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