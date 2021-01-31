import React, {useEffect, useState} from 'react';
import CallApi from "../../api/api_v2";
import {useParams} from "react-router-dom";
import {Nav, NavItem} from "reactstrap";
import {NavLink, Route,} from "react-router-dom";
import Details from "../../components/Details";
import Videos from "../../components/Videos";
import Credits from "../../components/Credits";


const MoviePage = () => {
    const [movieData, setMovieData] = useState({});

    const {id} = useParams();

    const imagePathPoster = movieData.poster_path
    const imagePathBackground = movieData.backdrop_path

    useEffect(() => {
        CallApi.get(`/movie/${id}`, {params: {language: 'ru-RU'}})
            .then((res) => setMovieData(res))
    }, [])

    return (
        <>
            <section className='movie-overview'
                     style={{backgroundImage: `url("https://image.tmdb.org/t/p/w500${imagePathBackground}")`}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <img src={imagePathPoster ? `https://image.tmdb.org/t/p/w500${imagePathPoster}` : ''}
                                 alt=""/>
                        </div>
                        <div className="col-6">
                            <h1>{movieData.title}</h1>
                            <div className="movie-overwiew__mark">
                                Рейтинг: {movieData.vote_average}
                            </div>
                            <p>{movieData.overview}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='movie-details'>
                <div className="container">
                    <div className="row justify-content-center mt-4">
                        <div className="col-10">
                            <Nav tabs>
                                <NavItem>
                                    <NavLink className='nav-link' to={`/movie/${id}/details`}
                                             activeClassName='active-link'>Детали</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to={`/movie/${id}/videos`}
                                             activeClassName='active-link'>Видео</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to={`/movie/${id}/credits`}
                                             activeClassName='active-link'>
                                        Актеры
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Route path='/movie/:id/details'><Details movieData={movieData}/></Route>
                            <Route path='/movie/:id/videos' component={Videos}/>
                            <Route path='/movie/:id/credits' component={Credits}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MoviePage;
